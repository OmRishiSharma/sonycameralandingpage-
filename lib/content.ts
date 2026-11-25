export const SONY_URL = "https://electronics.sony.com/imaging/interchangeable-lens-cameras/c/all-interchangeable-lens-cameras";

export const NAV = [
  { label: "Overview", target: "overview" },
  { label: "Engineering", target: "engineering" },
  { label: "Imaging", target: "imaging" },
  { label: "Technology", target: "technology" },
  { label: "Specifications", target: "specifications" },
];

/** Scroll-progress anchors (0–1) inside the pinned camera track, aligned to full-opacity plateaus. */
export const ANCHORS: Record<string, number> = {
  overview: 0,
  engineering: 0.2,
  imaging: 0.45,
  technology: 0.7,
  final: 0.92,
};

/** Frame progression: frames advance between these progress values, holding at either end. */
export const FRAME_RANGE: [number, number] = [0.02, 0.9];
