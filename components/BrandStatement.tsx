"use client";
import { motion, useReducedMotion } from "framer-motion";
import Reveal, { CINEMATIC_EASE } from "./Reveal";
import { STATEMENT_HIGHLIGHTS } from "@/lib/sections";

export default function BrandStatement() {
  const reduce = useReducedMotion();

  return (
    <section id="brand-statement" className="sec sec--statement" aria-labelledby="statement-title">
      <div className="sec__inner sec__inner--narrow">
        <motion.div
          className="statement-beam"
          aria-hidden="true"
          initial={reduce ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={reduce ? { duration: 0 } : { duration: 0.9, ease: CINEMATIC_EASE }}
        />

        <Reveal>
          <p className="eyebrow">Philosophy</p>
          <h2 id="statement-title" className="h-statement">
            Beyond the frame. Into the moment.
          </h2>
          <p className="lead">
            Full-frame imaging distilled into a compact, tactile instrument. Every dial, lens element, and electronic pathway exists to keep you connected to the light in front of you.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <dl className="statement-strip">
            {STATEMENT_HIGHLIGHTS.map((item) => (
              <div key={item.label} className="statement-strip__item">
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
