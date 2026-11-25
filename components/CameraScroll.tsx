"use client";
import { useRef } from "react";
import { MotionValue, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import CameraCanvas from "./CameraCanvas";
import { SONY_URL } from "@/lib/content";
import { scrollToTarget } from "@/lib/scroll";
import manifest from "@/public/frames/manifest.json";

/** Fades/slides a block in and out across a [start, end] scroll-progress window. */
function Block({ p, start, end, hold = false, className, children }: {
  p: MotionValue<number>; start: number; end: number; hold?: boolean; className: string; children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const f = 0.035;
  const opacity = useTransform(p, hold ? [start, start + f * 1.5, 1] : [start, start + f, end - f, end], hold ? [0, 1, 1] : [0, 1, 1, 0]);
  const y = useTransform(p, hold ? [start, start + f * 1.5] : [start, start + f, end - f, end], hold ? [28, 0] : [28, 0, 0, -20]);
  const pe = useTransform(opacity, (o) => (o > 0.5 ? "auto" : "none"));
  return (
    <motion.div className={className} style={{ opacity, y: reduce ? 0 : y, pointerEvents: pe }}>
      {children}
    </motion.div>
  );
}

export default function CameraScroll() {
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: track, offset: ["start start", "end end"] });
  const heroOpacity = useTransform(p, [0, 0.11, 0.15], [1, 1, 0]);
  const heroY = useTransform(p, [0, 0.15], [0, -30]);
  const scrimOpacity = useTransform(p, [0.82, 0.92], [0, 1]);
  const hintOpacity = useTransform(p, [0, 0.04], [1, 0]);

  return (
    <section id="camera-track" ref={track} className="track" aria-label="Sony Alpha 7 engineering story">
      <div className="stage">
        <CameraCanvas progress={p} manifest={manifest} />
        <div className="stage__glow" />
        <div className="stage__vignette" />
        <motion.div className="stage__scrim" style={{ opacity: scrimOpacity }} />

        {/* 1 — Hero */}
        <motion.div className="copy copy--hero" style={{ opacity: heroOpacity, y: reduce ? 0 : heroY }}>
          <p className="eyebrow">Sony α7 · FE 28–70mm</p>
          <h1 className="h-display">Sony Alpha 7</h1>
          <p className="sub">Beyond the moment.</p>
          <p className="body">Precision imaging. Intelligent performance. Creativity without limits.</p>
        </motion.div>
        <motion.div className="scroll-hint" style={{ opacity: hintOpacity }} aria-hidden>
          <span>Scroll</span><i />
        </motion.div>

        {/* 2 — Engineering */}
        <Block p={p} start={0.15} end={0.4} className="copy copy--left">
          <p className="eyebrow">Camera engineering</p>
          <h2 className="h-section">Precision in every detail.</h2>
          <p className="body">Every element is engineered to work in harmony, bringing precision, reliability, and control to every frame.</p>
        </Block>

        {/* 3 — Imaging */}
        <Block p={p} start={0.4} end={0.65} className="copy copy--left">
          <p className="eyebrow">Imaging technology</p>
          <h2 className="h-section">Where every pixel begins.</h2>
          <p className="body">Discover the imaging technology and sophisticated engineering behind every captured moment.</p>
          <ul className="points">
            <li>Image sensor architecture</li>
            <li>Image processing</li>
            <li>Autofocus technology</li>
            <li>Exposure and shutter control</li>
          </ul>
        </Block>

        {/* 4 — Optics */}
        <Block p={p} start={0.65} end={0.85} className="copy copy--left">
          <p className="eyebrow">Optical engineering · FE 28–70mm</p>
          <h2 className="h-section">Clarity, crafted through optics.</h2>
          <p className="body">Explore the precision of optical engineering, where every element contributes to the art of capturing light.</p>
          <ul className="points">
            <li>Optical glass elements</li>
            <li>Lens barrel</li>
            <li>Focus and zoom mechanisms</li>
          </ul>
        </Block>

        {/* 5 — Final */}
        <Block p={p} start={0.86} end={1} hold className="copy copy--final">
          <h2 className="h-display h-display--md">Create beyond imagination.</h2>
          <p className="sub">Sony Alpha 7. Built to capture what matters.</p>
          <div className="cta-row">
            <a className="btn btn--primary" href={SONY_URL} target="_blank" rel="noopener noreferrer">Explore Sony Alpha 7</a>
            <a className="btn btn--ghost" href="#specifications" onClick={(e) => { e.preventDefault(); scrollToTarget("specifications"); }}>View Specifications</a>
          </div>
        </Block>
      </div>
    </section>
  );
}
