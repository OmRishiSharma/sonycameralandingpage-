/**
 * Windowed image-sequence cache.
 * - Frames are fetched once as blobs and decoded to ImageBitmaps (with HTMLImageElement fallback).
 * - Only frames near the playhead (plus sparse keyframes and the final frame) stay decoded, bounding memory.
 * - Fetch order is nearest-to-playhead first, then final frame and keyframes, so scroll jumps load fast.
 */
export type Manifest = { count: number; width: number; height: number };
export type FrameAsset = ImageBitmap | HTMLImageElement;

const pad = (n: number) => String(n).padStart(4, "0");
export const frameUrl = (i: number) => `/frames/frame-${pad(i + 1)}.webp`;

function decodeWithImage(blob: Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Image decode failed"));
    };
    img.src = url;
  });
}

export class FrameLoader {
  private frames = new Map<number, FrameAsset>();
  private inflight = new Set<number>();
  private failed = new Set<number>();
  private center = 0;
  private disposed = false;
  private readonly concurrency = 6;
  private readonly window: number;
  private readonly keyStep = 8;
  private readonly resizeWidth: number;
  onFrame?: (index: number) => void;

  constructor(public readonly count: number, opts: { mobile: boolean }) {
    this.window = opts.mobile ? 20 : 28;
    this.resizeWidth = opts.mobile ? 960 : 1440;
  }

  private wanted(i: number) {
    return Math.abs(i - this.center) <= this.window || i % this.keyStep === 0 || i === this.count - 1;
  }

  private canFetch(i: number) {
    return i >= 0 && i < this.count && !this.frames.has(i) && !this.inflight.has(i) && !this.failed.has(i);
  }

  private release(asset: FrameAsset) {
    if (typeof ImageBitmap !== "undefined" && asset instanceof ImageBitmap) {
      asset.close();
    }
  }

  setCenter(i: number) {
    if (Math.abs(i - this.center) < 1) return;
    this.center = i;
    this.evict();
    this.pump();
  }

  private evict() {
    for (const [i, asset] of this.frames) {
      if (!this.wanted(i)) { this.release(asset); this.frames.delete(i); }
    }
  }

  private nextMissing(): number | null {
    // Nearest-first within the active window, then final frame, then sparse keyframes
    for (let d = 0; d <= this.window; d++) {
      for (const i of d === 0 ? [this.center] : [this.center + d, this.center - d]) {
        if (this.canFetch(i)) return i;
      }
    }
    const last = this.count - 1;
    if (this.canFetch(last)) return last;
    for (let i = 0; i < this.count; i += this.keyStep) {
      if (this.canFetch(i)) return i;
    }
    return null;
  }

  pump() {
    while (!this.disposed && this.inflight.size < this.concurrency) {
      const i = this.nextMissing();
      if (i === null) return;
      this.inflight.add(i);
      this.load(i);
    }
  }

  private async decodeBlob(blob: Blob): Promise<FrameAsset> {
    if (typeof createImageBitmap === "function") {
      try {
        return await createImageBitmap(blob, { resizeWidth: this.resizeWidth, resizeQuality: "high" });
      } catch {
        // Fallback when createImageBitmap resize options are rejected by the browser
      }
    }
    return decodeWithImage(blob);
  }

  private async load(i: number) {
    try {
      const res = await fetch(frameUrl(i));
      if (!res.ok) throw new Error(String(res.status));
      const blob = await res.blob();
      const asset = await this.decodeBlob(blob);
      if (this.disposed || !this.wanted(i)) { this.release(asset); }
      else { this.frames.set(i, asset); this.onFrame?.(i); }
    } catch {
      this.failed.add(i); // missing frame: renderer falls back to nearest available
      this.onFrame?.(i);
    } finally {
      this.inflight.delete(i);
      this.pump();
    }
  }

  has(i: number) { return this.frames.has(i); }
  isFailed(i: number) { return this.failed.has(i); }

  /** Exact frame if decoded, otherwise the closest decoded neighbour. */
  nearest(i: number): FrameAsset | null {
    const exact = this.frames.get(i);
    if (exact) return exact;
    for (let d = 1; d < this.count; d++) {
      const a = this.frames.get(i - d) ?? this.frames.get(i + d);
      if (a) return a;
    }
    return null;
  }

  /** Counts decoded frames within a clamped window of size `n` centered around `i`. */
  loadedAround(i: number, n: number) {
    if (this.count <= 0 || n <= 0) return 0;
    const span = Math.min(this.count, n);
    const start = Math.max(0, Math.min(this.count - span, i - Math.floor(span / 2)));
    const end = start + span;
    let c = 0;
    for (let k = start; k < end; k++) if (this.frames.has(k)) c++;
    return c;
  }

  dispose() {
    this.disposed = true;
    this.frames.forEach((asset) => this.release(asset));
    this.frames.clear();
  }
}
