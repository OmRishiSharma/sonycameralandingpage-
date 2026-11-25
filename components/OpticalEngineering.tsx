"use client";
import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Reveal, { CINEMATIC_EASE } from "./Reveal";
import ParallaxFrame from "./ParallaxFrame";
import { OPTICS_LAYERS, OPTICS_SPECS } from "@/lib/sections";

export default function OpticalEngineering() {
  const [selected, setSelected] = useState<(typeof OPTICS_LAYERS)[number]["id"]>("aspherical");
  const reduce = useReducedMotion();
  const activeLayer = OPTICS_LAYERS.find((l) => l.id === selected) ?? OPTICS_LAYERS[0];

  return (
    <section id="optical-engineering" className="sec sec--optics" aria-labelledby="optics-title">
      <div className="sec__inner">
        <Reveal className="sec__head">
          <div className="sec__eyebrow-row">
            <p className="eyebrow">Optical Engineering</p>
            <span className="tech-pill">FE 28–70mm F3.5–5.6 OSS · E-Mount</span>
          </div>
          <h2 id="optics-title" className="h-section">
            Glass, alloy, and tactile precision.
          </h2>
          <p className="body">
            Engineered around the short flange focal distance of the Sony E-mount, the FE 28–70mm F3.5–5.6 OSS (SEL2870) kit zoom pairs nine glass elements in eight groups with a compact, durable magnesium-alloy body.
          </p>
        </Reveal>

        <div className="optics-grid">
          <div className="optics-lead">
            <ParallaxFrame aspectClass="media-frame--tall">
              <Image
                src="/images/optics-elements.webp"
                alt="Separated optical glass elements and metal mount of the Sony FE 28-70mm lens"
                width={1440}
                height={960}
                loading="lazy"
                sizes="(max-width: 900px) 100vw, 58vw"
                className="media-img"
              />
            </ParallaxFrame>

            <Reveal delay={0.06} className="optics-explorer">
              <div className="optics-tabs" role="group" aria-label="Inspect optical and mount architecture">
                {OPTICS_LAYERS.map((layer) => (
                  <button
                    key={layer.id}
                    type="button"
                    className={`tab-btn tab-btn--sm ${selected === layer.id ? "is-active" : ""}`}
                    aria-pressed={selected === layer.id}
                    onClick={() => setSelected(layer.id)}
                  >
                    {layer.tag}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLayer.id}
                  className="optics-detail"
                  initial={reduce ? { opacity: 1 } : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -4 }}
                  transition={reduce ? { duration: 0 } : { duration: 0.24, ease: CINEMATIC_EASE }}
                >
                  <div className="optics-detail__head">
                    <span className="tech-tag">{activeLayer.badge}</span>
                    <h3>{activeLayer.title}</h3>
                  </div>
                  <p className="body">{activeLayer.body}</p>
                </motion.div>
              </AnimatePresence>
            </Reveal>
          </div>

          <div className="optics-side">
            <Reveal delay={0.08} className="optics-card">
              <ParallaxFrame aspectClass="media-frame--tall">
                <Image
                  src="/images/optics-controls.webp"
                  alt="Macro view of Sony Alpha 7 textured grip, control dials, and FE 28-70mm barrel"
                  width={1440}
                  height={960}
                  loading="lazy"
                  sizes="(max-width: 900px) 100vw, 38vw"
                  className="media-img"
                />
              </ParallaxFrame>
              <div className="optics-card__meta">
                <span className="tech-tag">Ergonomics &amp; Controls</span>
                <p className="body">
                  Dedicated front and rear dials, exposure compensation wheel, and a sculpted grip place manual exposure adjustments within natural fingertip reach.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.14} className="tech-table-wrap">
              <p className="tech-table-caption">Verified Lens &amp; Body Separation</p>
              <dl className="tech-table">
                {OPTICS_SPECS.map((row) => (
                  <div key={row.label}>
                    <dt>{row.label}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
