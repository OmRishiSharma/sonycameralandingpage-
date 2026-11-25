"use client";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AlphaEmblem } from "./BrandLogo";
import { CINEMATIC_EASE } from "./Reveal";

/**
 * Lightweight, non-blocking first-load brand introduction.
 * Runs cleanly with pointer-events: none so it never delays frame loading,
 * covers scroll interaction, or affects the protected #camera-track layout.
 */
export default function IntroCurtain() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduce) {
      setDone(true);
      return;
    }
    const timer = window.setTimeout(() => setDone(true), 1250);
    return () => window.clearTimeout(timer);
  }, [reduce]);

  if (reduce || done) return null;

  return (
    <motion.div
      className="intro-curtain"
      aria-hidden="true"
      initial={{ opacity: 0.92 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.0, delay: 0.15, ease: CINEMATIC_EASE }}
      onAnimationComplete={() => setDone(true)}
    >
      <motion.div
        className="intro-curtain__beam"
        initial={{ scaleX: 0.25, opacity: 0 }}
        animate={{ scaleX: 1, opacity: [0, 0.85, 0] }}
        transition={{ duration: 0.9, ease: CINEMATIC_EASE }}
      />
      <motion.div
        className="intro-curtain__emblem"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: [0, 1, 0], scale: 1 }}
        transition={{ duration: 0.95, ease: CINEMATIC_EASE }}
      >
        <AlphaEmblem size={38} />
      </motion.div>
      <motion.div
        className="intro-curtain__mark"
        initial={{ opacity: 0, letterSpacing: "0.34em", y: 6 }}
        animate={{ opacity: [0, 1, 0], letterSpacing: "0.24em", y: 0 }}
        transition={{ duration: 0.95, ease: CINEMATIC_EASE }}
      >
        <span className="intro-curtain__sony">SONY</span>
        <span className="intro-curtain__divider" />
        <span className="intro-curtain__alpha">α7 · ILCE-7</span>
      </motion.div>
    </motion.div>
  );
}
