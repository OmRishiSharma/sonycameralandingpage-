"use client";
import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Reveal, { CINEMATIC_EASE } from "./Reveal";
import ParallaxFrame from "./ParallaxFrame";
import { AF_MODES, PERFORMANCE_METRICS } from "@/lib/sections";

const CONTRAST_ROWS = 5;
const CONTRAST_COLS = 5;
const PHASE_ROWS = 9;
const PHASE_COLS = 13;

export default function AutofocusPerformance() {
  const [mode, setMode] = useState<(typeof AF_MODES)[number]["id"]>("hybrid");
  const [focusTarget, setFocusTarget] = useState<{ x: number; y: number }>({ x: 50, y: 46 });
  const reduce = useReducedMotion();

  const activeMode = AF_MODES.find((m) => m.id === mode) ?? AF_MODES[0];
  const showPhase = mode === "hybrid" || mode === "phase";
  const showContrast = mode === "hybrid" || mode === "contrast";

  const handleStageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const x = Math.max(20, Math.min(80, Math.round(((e.clientX - rect.left) / rect.width) * 100)));
    const y = Math.max(22, Math.min(78, Math.round(((e.clientY - rect.top) / rect.height) * 100)));
    setFocusTarget({ x, y });
  };

  return (
    <section id="autofocus-performance" className="sec sec--perf" aria-labelledby="perf-title">
      <div className="sec__inner">
        <div className="perf-top">
          <Reveal className="perf-copy">
            <div className="sec__eyebrow-row">
              <p className="eyebrow">Autofocus &amp; Performance</p>
              <span className="tech-pill">Fast Hybrid AF · 117 + 25</span>
            </div>
            <h2 id="perf-title" className="h-section">
              Decisive focus at the speed of the moment.
            </h2>
            <p className="body">
              Fast Hybrid AF unites 117 central phase-detection points with 25 wider contrast-detection points across EV 0 to EV 20, pairing subject tracking speed with a 1/8000s focal-plane shutter.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="perf-metrics">
            {PERFORMANCE_METRICS.map((m) => (
              <div key={m.label} className="metric">
                <span className="metric__val">{m.value}</span>
                <span className="metric__lbl">{m.label}</span>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal delay={0.08} className="af-panel">
          <div className="af-panel__info">
            <div className="af-tabs" role="group" aria-label="Select autofocus visualization mode">
              {AF_MODES.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  className={`tab-btn tab-btn--sm ${mode === m.id ? "is-active" : ""}`}
                  aria-pressed={mode === m.id}
                  onClick={() => setMode(m.id)}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeMode.id}
                className="af-copy"
                initial={reduce ? { opacity: 1 } : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -4 }}
                transition={reduce ? { duration: 0 } : { duration: 0.22, ease: CINEMATIC_EASE }}
              >
                <span className="tech-tag">{activeMode.coverage}</span>
                <h3 className="h-sub af-copy__title">{activeMode.title}</h3>
                <p className="body">{activeMode.summary}</p>
              </motion.div>
            </AnimatePresence>

            <p className="af-hint">Click anywhere inside the sensor frame to reposition the focus cluster.</p>
          </div>

          <div
            className="af-sensor-box"
            onClick={handleStageClick}
            role="presentation"
            aria-label="Schematic representation of 117 phase-detection and 25 contrast-detection AF points"
          >
            <div className="af-sensor-header" aria-hidden="true">
              <span>35.8 × 23.9 mm Exmor CMOS</span>
              <span>{mode === "hybrid" ? "117P + 25C" : mode === "phase" ? "117 PHASE" : "25 CONTRAST"}</span>
            </div>

            <div className="af-reticle" aria-hidden="true">
              {showContrast && (
                <div className="af-grid af-grid--contrast">
                  {Array.from({ length: CONTRAST_ROWS * CONTRAST_COLS }, (_, idx) => {
                    const r = Math.floor(idx / CONTRAST_COLS);
                    const c = idx % CONTRAST_COLS;
                    const px = 16 + c * 17;
                    const py = 18 + r * 16;
                    const near = Math.hypot(px - focusTarget.x, py - focusTarget.y) < 22;
                    return (
                      <span
                        key={`c-${idx}`}
                        className={`af-pt af-pt--contrast ${near ? "is-locked" : ""}`}
                        style={{ left: `${px}%`, top: `${py}%` }}
                      />
                    );
                  })}
                </div>
              )}

              {showPhase && (
                <div className="af-grid af-grid--phase">
                  {Array.from({ length: PHASE_ROWS * PHASE_COLS }, (_, idx) => {
                    const r = Math.floor(idx / PHASE_COLS);
                    const c = idx % PHASE_COLS;
                    const px = 27.5 + c * 3.75;
                    const py = 26 + r * 6;
                    const near = Math.hypot(px - focusTarget.x, py - focusTarget.y) < 12;
                    return (
                      <span
                        key={`p-${idx}`}
                        className={`af-pt af-pt--phase ${near ? "is-locked" : ""}`}
                        style={{ left: `${px}%`, top: `${py}%` }}
                      />
                    );
                  })}
                </div>
              )}

              <motion.div
                className="af-lock-box"
                animate={{ left: `${focusTarget.x}%`, top: `${focusTarget.y}%` }}
                transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 24 }}
              />
            </div>

            <div className="af-legend" aria-hidden="true">
              <span><i className="af-dot af-dot--phase" />117 Phase-Detection</span>
              <span><i className="af-dot af-dot--contrast" />25 Contrast-Detection</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="perf-visual">
          <ParallaxFrame aspectClass="media-frame--wide">
            <Image
              src="/images/performance-motion.webp"
              alt="Surfer running toward breaking ocean waves captured at fast shutter speed"
              width={1600}
              height={913}
              loading="lazy"
              sizes="(max-width: 900px) 100vw, 88vw"
              className="media-img"
            />
          </ParallaxFrame>
          <div className="perf-tags" aria-hidden="true">
            <span>Fast Hybrid AF</span>
            <span>1/8000s Shutter</span>
            <span>EV 0 – EV 20</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
