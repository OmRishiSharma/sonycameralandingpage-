# Sony Alpha 7 — Interactive 3D Scroll Experience

A cinematic, scroll-controlled product engineering showcase and landing page for the **Sony Alpha 7 ($\alpha7$) Full-Frame Mirrorless Camera** paired with the **Sony FE 28–70mm f/3.5–5.6 OSS** lens.

The experience presents an Apple-grade, high-performance visual journey: as the user scrolls, the camera fluidly transitions from a fully assembled hero presentation into a high-precision exploded technical view, revealing its internal optical elements, magnesium chassis, 35mm full-frame sensor, shutter mechanism, mainboard, and electronic viewfinder.

---

## 1. Project Overview

- **Purpose**: Deliver an interactive product storytelling experience showcasing the mechanical and optical engineering of the Sony $\alpha7$ camera system.
- **Product Showcased**: Sony Alpha 7 ($\alpha7$) interchangeable-lens mirrorless camera with the Sony FE 28–70mm f/3.5–5.6 OSS kit lens.
- **Current Development Status**: Fully functional, production-ready implementation with a 238-frame windowed canvas rendering pipeline, sticky scroll storytelling, responsive mobile layout, and hardware specifications.

---

## 2. Technology Stack

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | `15.5.29` | React server components, asset optimization, static rendering |
| **UI Library** | React | `19.3.1` | Component lifecycle, hooks, and DOM mounting |
| **Language** | TypeScript | `5.9.3` | Type safety and strict compile-time validation |
| **Animation Engine** | Framer Motion | `11.18.2` | Declarative scroll monitoring (`useScroll`), transforms, and sheet animations |
| **Rendering** | HTML5 Canvas 2D API | Native | High-DPI hardware-accelerated image sequence rendering |
| **Image Decoder** | `createImageBitmap` API | Native | Asynchronous off-thread image bitmap decoding |
| **Styling** | Plain Modular CSS | CSS3 | Custom variables, clamp typography, backdrop filters, responsive layout |
| **Frame Processing**| Sharp | `0.35.5` | Automated 1080p source frame optimization and WebP conversion |

---

## 3. Project Structure

```
sample/
├── Camera_exploding_animation_sequence_0cbbea89_1080p-ezgif-split/  # Source 1080p frames (238 JPEGs)
└── sony-alpha7/                                                    # Next.js web application
    ├── app/
    │   ├── globals.css          # Design system, layout rules, animations, and responsive media queries
    │   ├── icon.svg             # Custom SVG favicon (white Greek α on dark rounded tile)
    │   ├── layout.tsx           # Root HTML layout, Inter font configuration, SEO metadata
    │   └── page.tsx             # Root page composing Navigation, CameraScroll, and Specifications
    ├── components/
    │   ├── CameraCanvas.tsx     # High-DPI HTML5 canvas renderer driven by requestAnimationFrame
    │   ├── CameraScroll.tsx     # Pinned 760vh container coordinating 5 narrative scroll blocks
    │   ├── Navigation.tsx       # Fixed glassmorphic header, anchor navigation, mobile menu drawer
    │   └── Specifications.tsx   # Verified hardware specifications table, external link, and footer
    ├── lib/
    │   ├── content.ts           # Copy, navigation links, scroll anchor positions, and frame ranges
    │   ├── frameLoader.ts       # Windowed image-sequence cache using createImageBitmap & eviction
    │   └── scroll.ts            # Programmatic smooth-scrolling utility with reduced-motion support
    ├── public/
    │   └── frames/
    │       ├── frame-0001.webp  # Optimized production WebP frames (238 total, 1440x810)
    │       ├── ...
    │       ├── frame-0238.webp
    │       └── manifest.json    # Frame count (238) and native aspect dimensions (1440x810)
    ├── scripts/
    │   └── prepare-frames.mjs   # Sharp build script: processes source frames into production WebP
    ├── next.config.mjs          # Next.js configuration (alias paths, cache headers, tracing root)
    ├── package.json             # NPM dependencies and run scripts
    ├── tsconfig.json            # TypeScript compiler configuration
    └── README.md
```

### Component Breakdown

- **`app/page.tsx`**: Lightweight composition root pulling in `Navigation`, `CameraScroll`, and `Specifications`.
- **`components/Navigation.tsx`**: Fixed top navbar. Listens to scroll position (`window.scrollY > 40`) to transition to a frosted solid background (`.nav--solid`). Features a mobile hamburger toggle animating with Framer Motion `AnimatePresence`.
- **`components/CameraScroll.tsx`**: The core storyteller. Creates a pinned `760vh` track enclosing a `sticky top: 0` full-viewport stage. Synchronizes scroll progression with the Canvas and cross-fades 5 narrative text blocks.
- **`components/CameraCanvas.tsx`**: Instantiates a DPR-aware (up to 2x) Canvas element. Binds to `progress` (a Framer Motion `MotionValue`), eliminating React re-renders while scrolling. Coordinates with `FrameLoader` to draw the nearest loaded frame while fetching the exact target.
- **`lib/frameLoader.ts`**: High-performance windowed cache. Fetches frames as Blobs and decodes them via `createImageBitmap` with responsive scaling (960px width on mobile, 1440px on desktop). Evicts frames outside an active window ($\pm 28$ frames on desktop, $\pm 20$ on mobile) to maintain a strict memory budget.
- **`components/Specifications.tsx`**: Grounded tabular presentation of verified hardware details visible directly on the physical camera and lens, concluding with a link to Sony's official documentation.

---

## 4. Implemented Features

### 1. Scroll-Driven 3D Product Scrubbing
- Scrubbing down advances the sequence from an assembled camera to an exploded internal matrix; scrolling up reverses the sequence back to the assembled product.
- Decoupled from React state: scrolling adjusts a native `MotionValue`, triggering direct canvas draws via `requestAnimationFrame`.

### 2. Five Narrative Story Stages
The 760vh pinned container exposes five distinct sections:
1. **Hero (`0.00 – 0.15`)**: Fully assembled camera with primary headlines and animated scroll indicator.
2. **Camera Engineering (`0.15 – 0.40`)**: Outer chassis begins separating to reveal internal mechanics.
3. **Imaging Technology (`0.40 – 0.65`)**: Exploded view isolating the 35mm full-frame image sensor and electronics.
4. **Optical Engineering (`0.65 – 0.85`)**: Complete disassembly of the FE 28–70mm multi-element glass group.
5. **Finale (`0.86 – 1.00`)**: Camera remains held in full exploded view while final CTAs are presented.

### 3. Responsive Navigation & Anchor Snapping
- Interactive navigation links: `Overview`, `Imaging`, `Engineering`, `Technology`, and `Specifications`.
- Clicking any link smoothly animates the viewport to the exact calculated progress percentage inside the 760vh scroll track.
- Collapsible mobile sheet menu with staggered entry animations.

### 4. Accessibility & Motion Preferences
- Automatically detects `prefers-reduced-motion: reduce`.
- Disables momentum lerp smoothing and switches programmatic scrolling from `smooth` to `auto`.
- Disables decorative CSS drip animations on the scroll hint.

---

## 5. Hero Animation & Canvas Pipeline Details

### Architecture & Mechanics

- **Rendering Approach**: High-DPI HTML5 Canvas 2D (`CanvasRenderingContext2D`). WebGL or Three.js is intentionally avoided because the source material is a photographic 238-frame pre-rendered CGI explosion sequence. Canvas 2D combined with `createImageBitmap` yields lower power consumption, faster startup, and superior image reproduction.
- **Aspect Ratio Containment**: Uses a strict contain-fit algorithm:
  $$\text{scale} = \min\left(\frac{\text{canvasWidth}}{\text{manifestWidth}}, \frac{\text{canvasHeight}}{\text{manifestHeight}}\right)$$
  The camera is rendered at exact 16:9 native proportions without cropping, pixel stretching, or distortion on any screen orientation.
- **Scroll Mapping**:
  $$\text{progress} \in [0.02, 0.90] \implies \text{targetFrame} \in [0, 237]$$
  Progress below `0.02` holds Frame `0` (assembled); progress above `0.90` holds Frame `237` (exploded).
- **Sub-Frame Smoothing**:
  $$\text{current} = \text{current} + (\text{target} - \text{current}) \times 0.2$$
  This creates smooth, cinematic easing during rapid scrolling or touch flicks.
- **Loading Strategy**:
  - The loader requires at least 8 frames around index 0 before fading out.
  - A bidirectional `nextMissing()` queue prioritizes frames closest to the user's current playhead. Sparse keyframes (every 8th frame) are fetched in parallel to provide instant scrub previews.

---

## 6. Assets and Media

| Asset Type | Location | Specifications |
| :--- | :--- | :--- |
| **Source Camera Frames** | `Camera_exploding_animation_sequence_0cbbea89_1080p-ezgif-split/` | 238 JPEG files (`ezgif-frame-001.jpg` to `238.jpg`), 1920×1080 resolution |
| **Production WebP Frames**| `sony-alpha7/public/frames/` | 238 WebP files (`frame-0001.webp` to `frame-0238.webp`), 1440×810 resolution, Quality 82 |
| **Frame Manifest** | `sony-alpha7/public/frames/manifest.json` | JSON metadata: `{"count": 238, "width": 1440, "height": 810}` |
| **Favicon** | `sony-alpha7/app/icon.svg` | SVG vector icon with Greek Alpha ($\alpha$) glyph |
| **Typography** | Google Fonts (Inter) | Loaded via `next/font/google` (`--font-inter`) with Apple SF Pro fallbacks |
| **3D Models / Video** | None | The animation relies entirely on the pre-rendered 238-frame image sequence |

---

## 7. Design System & Visual Aesthetics

- **Color Palette**:
  - Deep Pitch Black: `--bg: #050505` (matches camera frame background)
  - Surface Elevation: `--bg-2: #0a0a0c`
  - High-Contrast Text: `--text: #ffffff`
  - Muted Copy: `--text-2: rgba(255, 255, 255, 0.65)`
  - Primary Cobalt Accent: `--accent: #0050ff`
  - Secondary Cyan Accent: `--accent-2: #00d6ff`
- **Atmospheric Studio Lighting**:
  - Radial center glow behind the camera: `radial-gradient(60% 55% at 50% 52%, rgba(0, 80, 255, 0.10), transparent 70%)`.
  - Seamless edge vignettes (`stage__vignette`) blend the 1440x810 image borders into the dark background.
  - Gradient scrim (`stage__scrim`) rises during the finale to guarantee text legibility over exploded parts.
- **Typography**:
  - Display Headings: Fluid clamp (`clamp(48px, 8vw, 112px)`) with vertical linear gradient (`#fff 35%` to `#9cb8ff 140%`).
  - Body Text: Maximum line length bounded to `42ch` for optimal reading comfort.

---

## 8. Feature Status Matrix

| Feature / Section | Status | Notes |
| :--- | :--- | :--- |
| **Navigation Header** | Implemented | Sticky, background blur on scroll, anchor links, mobile drawer |
| **Hero Sticky Animation** | Implemented | 238-frame HTML5 canvas scrubbing, contain-fit, DPR scaling |
| **Windowed Frame Cache** | Implemented | `createImageBitmap` decoding, memory bounded by window eviction |
| **Scroll Story Blocks** | Implemented | 5 narrative sections fading and sliding with scroll progress |
| **Specifications Section** | Implemented | Documented visible hardware facts + external link |
| **Asset Optimization Script**| Implemented | Sharp script converting raw source JPEGs to 1440px WebP |
| **Interactive 3D Hotspots** | Planned / Not Implemented | Floating 3D annotations to click individual exploded components |
| **E-Commerce Cart / Checkout**| Planned / Not Implemented | Product purchase flows and cart drawers |
| **Interactive 3D WebGL Mesh** | Planned / Not Implemented | Real-time 3D orbit controls (uses pre-rendered sequence instead) |

---

## 9. Dependencies

From `sony-alpha7/package.json`:

### Production Dependencies
- **`next` (`^15.5.29`)**: Core web framework handling SSR, App Router, bundle splitting, and static file serving.
- **`react` (`^19.3.1`) & `react-dom` (`^19.3.1`)**: Modern React 19 runtime with concurrent features.
- **`framer-motion` (`^11.18.2`)**: Powers scroll-linked animation primitives (`useScroll`, `useTransform`, `MotionValue`).

### Development Dependencies
- **`typescript` (`^5.9.3`)**: Type checker and compiler.
- **`@types/node` (`^26.6.8`)**, **`@types/react` (`^19.3.1`)**, **`@types/react-dom` (`^19.3.0`)**: Type definitions.
- **`sharp` (`^0.35.5`)**: High-performance image processing engine used by `prepare-frames.mjs`.

---

## 10. Development & Deployment

### Prerequisites
- Node.js `18.18.0` or higher (Node 20+ recommended)
- npm, pnpm, or yarn

### Installation
Navigate to the Next.js application directory and install dependencies:
```bash
cd sony-alpha7
npm install
```

### Running Locally
Start the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Regenerating Frame Assets
If source frames are updated in `Camera_exploding_animation_sequence_0cbbea89_1080p-ezgif-split/`, re-run the optimization script:
```bash
npm run frames
```

### Building for Production
Create an optimized production build:
```bash
npm run build
```

Start the production server:
```bash
npm run start
```

---

## 11. Known Limitations & Technical Considerations

1. **Total Asset Transfer Size**: The 238 WebP frames total approximately 18–22 MB. While the windowed loader preloads on demand, initial fast scrolling on high-latency mobile networks can experience brief fallback to neighboring keyframes.
2. **`createImageBitmap` Browser Support**: Supported in all modern browsers (Chrome, Edge, Firefox, Safari 15+). Very old browsers fallback to standard image decoding.
3. **Scroll Height on Mobile**: The 760vh track provides fine scrub control on desktop wheel mice, but requires multiple finger swipes on touch devices.

---

## 12. Recommended Next Steps

1. **AVIF Dual-Encoding**: Update `scripts/prepare-frames.mjs` to generate AVIF alternatives for supported browsers, reducing sequence payload by an additional 25–35%.
2. **Interactive 3D Hotspot Overlays**: Add clickable SVG or Canvas coordinate markers pointing to specific components (e.g. "Exmor R CMOS Sensor", "BIONZ X Engine") during exploded scroll phases.
3. **Haptic & Audio Feedback**: Integrate subtle Web Audio clicks or haptic pulses when crossing major mechanical explosion milestones.
4. **Offline PWA Caching**: Implement a Service Worker caching strategy for `/frames/*` so repeat visits scrub with zero network requests.
