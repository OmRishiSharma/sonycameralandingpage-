export const OFFICIAL_SUPPORT_URL =
  "https://www.sony.co.in/electronics/support/e-mount-body-ilce-7-series/ilce-7";

export const OFFICIAL_SPECS_URL =
  "https://www.sony.co.in/electronics/support/e-mount-body-ilce-7-series/ilce-7/specifications";

export const DISCLAIMER_TEXT =
  "Independent product showcase concept. Not affiliated with or endorsed by Sony.";

export const STATEMENT_HIGHLIGHTS = [
  { label: "Full-Frame Sensor", value: "35.8 × 23.9 mm Exmor CMOS" },
  { label: "Image Engine", value: "BIONZ X Detail Reproduction" },
  { label: "Lens System", value: "Sony E-mount Full-Frame" },
] as const;

export type GalleryCategory = "All" | "Portrait" | "Landscape" | "Street" | "Motion";

export interface GalleryItem {
  id: string;
  category: Exclude<GalleryCategory, "All">;
  title: string;
  caption: string;
  meta: string;
  exif: string;
  license: string;
  sourceUrl: string;
  src: string;
  alt: string;
  featured?: boolean;
  credit: string;
}

export const IMAGING_PILLARS = [
  {
    eyebrow: "35mm Full-Frame Sensor",
    title: "24.3 megapixels of pure light capture.",
    body: "The 35mm full-frame Exmor CMOS sensor captures expansive tonal gradations and shallow depth of field across 35.8 × 23.9 mm of active imaging area.",
    stats: [
      { label: "Sensor", value: "35mm Full-Frame Exmor CMOS" },
      { label: "Resolution", value: "Approx. 24.3 effective MP" },
      { label: "Processor", value: "BIONZ X image engine" },
    ],
    image: "/images/imaging-sensor.webp",
    alt: "Macro detail of the Sony Alpha 7 35mm full-frame CMOS image sensor and internal electronics",
  },
  {
    eyebrow: "Low-Light Dynamic Range",
    title: "Clean detail, long after dusk.",
    body: "Paired with BIONZ X noise reduction, native ISO 100–25,600 sensitivity preserves subtle shadow texture and smooth highlight rolloff when available light fades.",
    stats: [
      { label: "ISO Range", value: "100 – 25,600 (exp. ISO 50)" },
      { label: "RAW Format", value: "Sony ARW 2.3 (6000 × 4000)" },
      { label: "Metering", value: "1200-zone evaluative" },
    ],
    image: "/images/imaging-dynamic-range.webp",
    alt: "Night lightning storm over dark ocean waves captured on Sony Alpha 7 (ILCE-7)",
    credit: "Photo: bigwavephoto (CC BY-SA 4.0, shot on Sony ILCE-7)",
  },
] as const;

export const OPTICS_LAYERS = [
  {
    id: "aspherical",
    tag: "3 Aspherical Elements",
    title: "Curved precision, compact barrel.",
    body: "Three aspherical lens elements suppress spherical aberration and field curvature across 28–70mm focal lengths while keeping the kit zoom balanced in front of the compact E-mount body.",
    badge: "SEL2870 Lens",
  },
  {
    id: "ed",
    tag: "1 ED Glass Element",
    title: "True-to-life color rendition.",
    body: "Extra-low Dispersion (ED) glass minimizes chromatic aberration and color fringing toward high-contrast edges from wide 28mm landscapes to 70mm portraits.",
    badge: "SEL2870 Lens",
  },
  {
    id: "oss",
    tag: "Optical SteadyShot",
    title: "In-lens stabilization where it counts.",
    body: "Built directly into the FE 28–70mm F3.5–5.6 OSS lens, Optical SteadyShot compensates for handheld camera shake without adding in-body stabilization weight to the ILCE-7 chassis.",
    badge: "Lens Stabilization",
  },
  {
    id: "emount",
    tag: "Sony E-mount",
    title: "Full-frame short flange architecture.",
    body: "Engineered for 35mm full-frame FE lenses while accepting APS-C E-mount optics in crop mode and A-mount lenses via optional Mount Adaptors.",
    badge: "ILCE-7 Body",
  },
] as const;

export const OPTICS_SPECS = [
  { label: "Kit Lens", value: "FE 28–70mm F3.5–5.6 OSS (SEL2870)" },
  { label: "Optical Formula", value: "9 elements in 8 groups (3 asph., 1 ED)" },
  { label: "Stabilization", value: "In-lens Optical SteadyShot (OSS)" },
  { label: "Aperture & Filter", value: "7-blade circular · F22–36 min · Ø55 mm" },
  { label: "Lens Weight", value: "Approx. 295 g (SEL2870)" },
  { label: "Body Weight", value: "Approx. 474 g w/ battery & media (416 g body)" },
] as const;

export const AF_MODES = [
  {
    id: "hybrid",
    label: "Fast Hybrid AF (117 + 25)",
    title: "Phase speed paired with contrast precision.",
    summary:
      "Fast Hybrid AF combines 117 central focal-plane phase-detection points for rapid subject tracking with 25 contrast-detection points for decisive final focus lock.",
    coverage: "EV 0 – EV 20 (ISO 100, F2.8 lens)",
  },
  {
    id: "phase",
    label: "Phase-Detection (117 pt)",
    title: "117-point focal-plane distance analysis.",
    summary:
      "Dense 117 phase-detection AF points clustered across the central frame calculate lens drive direction and distance immediately for moving subjects.",
    coverage: "117 central phase-detection points",
  },
  {
    id: "contrast",
    label: "Contrast-Detection (25 pt)",
    title: "Wide-frame fine contrast verification.",
    summary:
      "Twenty-five contrast-detection points span the broader frame to verify crisp sharpness at wide apertures and refine static subject accuracy.",
    coverage: "25 contrast-detection zones",
  },
] as const;

export const PERFORMANCE_METRICS = [
  { value: "117 + 25", label: "Phase & contrast-detection AF points" },
  { value: "1/8000s", label: "Top focal-plane shutter speed (to 30s)" },
  { value: "5 fps", label: "Speed Priority Continuous (2.5 fps std.)" },
  { value: "2.36M", label: "Dot 0.5-type XGA OLED Tru-Finder EVF" },
] as const;

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  "All",
  "Portrait",
  "Landscape",
  "Street",
  "Motion",
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "landscape",
    category: "Landscape",
    title: "Alpine Reflection",
    caption: "Wide-angle dynamic range from highlight mist to deep shadow peaks.",
    meta: "Sony α7 (ILCE-7) · 33mm",
    exif: "33mm · f/9 · 30s · ISO 400",
    license: "CC0 1.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Beautiful_mountain_reflection_(Unsplash).jpg",
    src: "/images/gallery-landscape.webp",
    alt: "Mountain ridge reflected in calm water at twilight, EXIF verified Sony ILCE-7",
    featured: true,
    credit: "Photo: Johannes Plenio (CC0 1.0 · Wikimedia Commons EXIF: SONY ILCE-7)",
  },
  {
    id: "portrait",
    category: "Portrait",
    title: "Natural Rim Light",
    caption: "Crisp plane of focus and smooth full-frame background separation.",
    meta: "Sony α7 (ILCE-7) · 85mm",
    exif: "85mm · f/2.4 · 1/800s · ISO 100",
    license: "CC BY 2.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Zeiss_Loxia_85mm_F2.4_sample_portrait_image_(38967319835).jpg",
    src: "/images/gallery-portrait.webp",
    alt: "Outdoor editorial portrait in natural light with shallow depth of field, EXIF verified Sony ILCE-7",
    credit: "Photo: Aaron Stidwell (CC BY 2.0 · Wikimedia Commons EXIF: SONY ILCE-7)",
  },
  {
    id: "street",
    category: "Street",
    title: "Shinjuku After Hours",
    caption: "Night street clarity holding color and contrast under city signage.",
    meta: "Sony α7 (ILCE-7) · 1/60s",
    exif: "1/60s · ISO 100",
    license: "CC0 1.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Shinjuku,_Japan_(Unsplash_LrBQ3SBGkhA).jpg",
    src: "/images/gallery-street.webp",
    alt: "Nocturnal Shinjuku street scene in Tokyo with glowing signage and taxi, EXIF verified Sony ILCE-7",
    credit: "Photo: Josh Wilburne (CC0 1.0 · Wikimedia Commons EXIF: SONY ILCE-7)",
  },
  {
    id: "motion",
    category: "Motion",
    title: "Orbital Recovery",
    caption: "Tonal control and crisp structural detail under dawn light.",
    meta: "Sony α7 (ILCE-7) · 28mm",
    exif: "28mm · f/8 · 1/20s · ISO 100",
    license: "CC0 1.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Falcon_9_first_stage_at_LZ-1_(23827554109).jpg",
    src: "/images/gallery-motion.webp",
    alt: "Falcon 9 first stage booster at Landing Zone 1 under twilight sky, EXIF verified Sony ILCE-7",
    featured: true,
    credit: "Photo: SpaceX Photos (CC0 1.0 · Wikimedia Commons EXIF: SONY ILCE-7)",
  },
];

export const CREATOR_SPECS = [
  { label: "Viewfinder", value: "0.71× XGA OLED Tru-Finder" },
  { label: "Monitor", value: "Tilting 3.0\" 921.6k-dot LCD" },
  { label: "Chassis Weight", value: "Approx. 416 g (body only)" },
  { label: "Wireless", value: "Built-in Wi-Fi & NFC" },
] as const;

export const BODY_SPECS = [
  { label: "Model", value: "Sony Alpha 7 (ILCE-7, 2013)" },
  { label: "Lens Mount", value: "Sony E-mount (Full-Frame / APS-C crop)" },
  { label: "Image Sensor", value: "35mm full-frame (35.8 × 23.9 mm) Exmor CMOS" },
  { label: "Effective Resolution", value: "Approx. 24.3 megapixels (6000 × 4000)" },
  { label: "Image Processor", value: "BIONZ X image processing engine" },
  { label: "Autofocus System", value: "Fast Hybrid AF (117 phase + 25 contrast pts)" },
  { label: "AF Sensitivity Range", value: "EV 0 to EV 20 (ISO 100 equiv., F2.8 lens)" },
  { label: "ISO Sensitivity", value: "ISO 100 – 25,600 (expandable down to ISO 50)" },
  { label: "Shutter Speed", value: "1/8000 to 30 sec., Bulb" },
  { label: "Continuous Shooting", value: "Up to 5 fps (Speed Priority) / 2.5 fps (std.)" },
  { label: "Viewfinder", value: "0.5-type color XGA OLED Tru-Finder (2,359,296 dots)" },
  { label: "LCD Monitor", value: "3.0-type TFT (921,600 dots), up approx. 90° / down approx. 45°" },
  { label: "Movie Recording", value: "Full HD 1920 × 1080 (AVCHD / MP4); no internal 4K" },
  { label: "In-Body Stabilization", value: "None (relies on optical OSS in compatible lenses)" },
  { label: "Storage Media", value: "Memory Stick PRO Duo / PRO-HG Duo / SD, SDHC, SDXC" },
  { label: "Battery & Endurance", value: "NP-FW50 · Approx. 270 shots (EVF) / 340 shots (LCD)" },
  { label: "Connectivity", value: "Built-in Wi-Fi, NFC One-touch, HDMI micro (Type-D)" },
  { label: "Dimensions & Weight", value: "Approx. 126.9 × 94.4 × 54.8 mm · 416 g body (474 g w/ battery & media)" },
] as const;

export const LENS_SPECS = [
  { label: "Model", value: "Sony FE 28–70mm F3.5–5.6 OSS (SEL2870)" },
  { label: "Mount & Format", value: "Sony E-mount · 35mm Full-Frame" },
  { label: "Focal Length", value: "28–70 mm (42–105 mm 35mm equiv. on APS-C)" },
  { label: "Aperture Range", value: "Max F3.5–5.6 · Min F22–36" },
  { label: "Aperture Blades", value: "7-blade circular aperture" },
  { label: "Optical Construction", value: "9 elements in 8 groups" },
  { label: "Special Elements", value: "3 aspherical elements, 1 ED glass element" },
  { label: "Image Stabilization", value: "Built-in Optical SteadyShot (OSS)" },
  { label: "Minimum Focus Distance", value: "0.3 – 0.45 m (0.99 – 1.48 ft)" },
  { label: "Maximum Magnification", value: "0.19×" },
  { label: "Filter Diameter", value: "55 mm" },
  { label: "Dimensions & Weight", value: "Approx. 72.5 × 83 mm · Approx. 295 g" },
] as const;

export const FOOTER_LINKS = [
  { label: "Overview", target: "overview" },
  { label: "Imaging", target: "imaging-showcase" },
  { label: "Optics", target: "optical-engineering" },
  { label: "Gallery", target: "photography-showcase" },
  { label: "Specifications", target: "specifications" },
] as const;
