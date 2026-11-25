"use client";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Reveal, { CINEMATIC_EASE } from "./Reveal";
import {
  BODY_SPECS,
  LENS_SPECS,
  OFFICIAL_SPECS_URL,
  OFFICIAL_SUPPORT_URL,
} from "@/lib/sections";

type SpecScope = "all" | "body" | "lens";

const SCOPE_OPTIONS: { id: SpecScope; label: string }[] = [
  { id: "all", label: "All Specifications" },
  { id: "body", label: "Camera Body (ILCE-7)" },
  { id: "lens", label: "FE 28–70mm Lens" },
];

export default function Specifications() {
  const [scope, setScope] = useState<SpecScope>("all");
  const reduce = useReducedMotion();

  const showBody = scope === "all" || scope === "body";
  const showLens = scope === "all" || scope === "lens";

  return (
    <section id="specifications" className="specs" aria-labelledby="specs-title">
      <div className="specs__inner">
        <div className="specs__head">
          <Reveal>
            <div className="sec__eyebrow-row">
              <p className="eyebrow">Specifications</p>
              <span className="tech-pill">ILCE-7 Body · SEL2870 Kit Lens</span>
            </div>
            <h2 id="specs-title" className="h-section">
              Every detail, documented.
            </h2>
            <p className="body">
              Camera-body architecture and kit lens optics separated clearly, reflecting official Sony ILCE-7 and SEL2870 specifications.
            </p>
          </Reveal>

          <div className="specs__tabs" role="group" aria-label="Filter technical specifications by hardware component">
            {SCOPE_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                className={`tab-btn tab-btn--sm ${scope === opt.id ? "is-active" : ""}`}
                aria-pressed={scope === opt.id}
                onClick={() => setScope(opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={scope}
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={reduce ? { duration: 0 } : { duration: 0.24, ease: CINEMATIC_EASE }}
            className={`specs__grid ${scope !== "all" ? "specs__grid--single" : ""}`}
          >
            {showBody && (
              <div className="specs__panel" aria-labelledby="specs-body-title">
                <div className="specs__panel-head">
                  <span className="tech-tag">Camera Body</span>
                  <h3 id="specs-body-title">Sony Alpha 7 (ILCE-7)</h3>
                </div>
                <dl className="specs__list">
                  {BODY_SPECS.map((row) => (
                    <div key={row.label}>
                      <dt>{row.label}</dt>
                      <dd>{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {showLens && (
              <div className="specs__panel" aria-labelledby="specs-lens-title">
                <div className="specs__panel-head">
                  <span className="tech-tag">Kit Lens Optics</span>
                  <h3 id="specs-lens-title">FE 28–70mm F3.5–5.6 OSS</h3>
                </div>
                <dl className="specs__list">
                  {LENS_SPECS.map((row) => (
                    <div key={row.label}>
                      <dt>{row.label}</dt>
                      <dd>{row.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="specs__note">
                  Optical SteadyShot stabilization is built into the SEL2870 lens barrel; the original 2013 ILCE-7 body does not include in-body image stabilization or internal 4K video recording.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <Reveal delay={0.08} className="specs__cta-bar">
          <p className="body">Consult complete official Sony support manuals and full factory specification sheets.</p>
          <div className="specs__cta-actions">
            <a
              className="btn btn--primary"
              href={OFFICIAL_SPECS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Official Specifications <span aria-hidden="true">↗</span>
            </a>
            <a
              className="btn btn--ghost"
              href={OFFICIAL_SUPPORT_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore on Sony <span aria-hidden="true">↗</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
