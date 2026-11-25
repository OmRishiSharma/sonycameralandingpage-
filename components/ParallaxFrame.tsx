"use client";
import { useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { CINEMATIC_EASE } from "./Reveal";

type Props = {
  children: React.ReactNode;
  className?: string;
  aspectClass?: string;
  enableTilt?: boolean;
};

/**
 * Scroll-parallax + subtle futuristic CSS 3D depth container confined strictly to
 * independent editorial media frames (never applied to hero or sticky ancestors).
 */
export default function ParallaxFrame({
  children,
  className = "",
  aspectClass = "media-frame--tall",
  enableTilt = true,
}: Props) {
  const frameRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"],
  });
  const scrollY = useTransform(scrollYProgress, [0, 1], [-14, 14]);

  const rawRx = useMotionValue(0);
  const rawRy = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const rotateX = useSpring(rawRx, { stiffness: 180, damping: 24, mass: 0.6 });
  const rotateY = useSpring(rawRy, { stiffness: 180, damping: 24, mass: 0.6 });
  const sheenBg = useTransform(
    [glowX, glowY],
    ([x, y]) =>
      `radial-gradient(360px circle at ${x}% ${y}%, rgba(0, 214, 255, 0.12), rgba(0, 80, 255, 0.05) 40%, transparent 72%)`
  );

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || !enableTilt || e.pointerType !== "mouse") return;
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0 || rect.height === 0) return;
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    rawRy.set((nx - 0.5) * 3.2);
    rawRx.set((0.5 - ny) * 3.2);
    glowX.set(nx * 100);
    glowY.set(ny * 100);
  };

  const resetTilt = () => {
    setHovered(false);
    rawRx.set(0);
    rawRy.set(0);
  };

  return (
    <motion.div
      ref={frameRef}
      className={`media-frame ${aspectClass} ${className}`.trim()}
      style={
        reduce || !enableTilt
          ? undefined
          : {
              transformPerspective: 1200,
              rotateX,
              rotateY,
            }
      }
      initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.985 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={reduce ? { duration: 0 } : { duration: 0.78, ease: CINEMATIC_EASE }}
      onPointerEnter={() => setHovered(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
    >
      <motion.div className="media-parallax" style={{ y: reduce ? 0 : scrollY }}>
        {children}
      </motion.div>
      {!reduce && enableTilt && (
        <motion.div
          className="media-sheen"
          aria-hidden="true"
          style={{
            opacity: hovered ? 1 : 0,
            background: sheenBg,
          }}
        />
      )}
    </motion.div>
  );
}
