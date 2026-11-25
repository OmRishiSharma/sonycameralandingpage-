"use client";
import { useEffect, useRef, useState } from "react";
import { MotionValue } from "framer-motion";
import { FrameLoader, Manifest } from "@/lib/frameLoader";
import { FRAME_RANGE } from "@/lib/content";

type Props = { progress: MotionValue<number>; manifest: Manifest };

/** DPR-aware canvas renderer. Scroll progress is read from a MotionValue — no React re-renders while scrolling. */
export default function CameraCanvas({ progress, manifest }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const [loadPct, setLoadPct] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: false })!;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = motionQuery.matches;
    const onMotionChange = (e: MediaQueryListEvent) => { reduced = e.matches; };
    motionQuery.addEventListener("change", onMotionChange);
    const mobile = window.matchMedia("(max-width: 820px)").matches;
    const loader = new FrameLoader(manifest.count, { mobile });
    const aspect = manifest.width / manifest.height;
    const last = manifest.count - 1;
    const readyTarget = Math.min(8, manifest.count);

    let raf = 0;
    let target = 0, current = 0, lastDrawn = -1, drawnExact = false, markedReady = false;

    const frameForProgress = (p: number) => {
      const [a, b] = FRAME_RANGE;
      const t = Math.min(1, Math.max(0, (p - a) / (b - a)));
      return t * last;
    };

    const draw = () => {
      const idx = Math.round(current);
      const bmp = loader.nearest(idx);
      if (!bmp) return;
      drawnExact = loader.has(idx);
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // contain: never crop or stretch
      const cw = canvas.width, ch = canvas.height;
      let dw = cw, dh = cw / aspect;
      if (dh > ch) { dh = ch; dw = ch * aspect; }
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(bmp, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
      lastDrawn = idx;
    };

    const schedule = () => { if (!raf) raf = requestAnimationFrame(tick); };

    function tick() {
      raf = 0;
      const diff = target - current;
      current = reduced || Math.abs(diff) < 0.02 ? target : current + diff * 0.2;
      const playhead = Math.round(current);
      loader.setCenter(playhead);
      if (playhead !== lastDrawn || !drawnExact) draw();
      if (!markedReady) {
        const playheadReady = loader.has(playhead) || (loader.isFailed(playhead) && loader.nearest(playhead) !== null);
        if (playheadReady && loader.loadedAround(playhead, 12) >= readyTarget) {
          markedReady = true;
          setReady(true);
        }
      }
      if (Math.abs(target - current) > 0.02 || (!drawnExact && lastDrawn >= 0)) schedule();
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      lastDrawn = -1;
      schedule();
    };

    loader.onFrame = (i) => {
      const playhead = Math.round(current);
      if (i === playhead || lastDrawn < 0 || !drawnExact) schedule();
      if (!markedReady) setLoadPct(Math.min(1, loader.loadedAround(playhead, 12) / readyTarget));
    };

    const unsub = progress.on("change", (p) => { target = frameForProgress(p); schedule(); });
    target = current = frameForProgress(progress.get());
    loader.setCenter(Math.round(current));
    loader.pump();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    return () => { unsub(); ro.disconnect(); motionQuery.removeEventListener("change", onMotionChange); if (raf) cancelAnimationFrame(raf); loader.dispose(); };
  }, [progress, manifest]);

  return (
    <>
      <canvas ref={canvasRef} className="camera-canvas" aria-label="Sony Alpha 7 camera, assembled and exploded views" role="img" />
      <div className={`loader ${ready ? "loader--done" : ""}`} aria-hidden={ready}>
        <span style={{ transform: `scaleX(${Math.max(0.08, loadPct)})` }} />
      </div>
    </>
  );
}
