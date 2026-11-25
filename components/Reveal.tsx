"use client";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  amount?: number;
};

export const CINEMATIC_EASE = [0.22, 1, 0.36, 1] as const;

/** Restrained scroll-triggered reveal wrapper respecting prefers-reduced-motion. */
export default function Reveal({ children, className, delay = 0, y = 24, amount = 0.16 }: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={
        reduce
          ? { duration: 0 }
          : { duration: 0.72, delay, ease: CINEMATIC_EASE }
      }
    >
      {children}
    </motion.div>
  );
}
