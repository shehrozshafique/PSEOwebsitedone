"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";

/** Thin green progress bar at the very top of the page. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.3 });
  return <motion.div aria-hidden="true" style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-green" />;
}

/** Card that tilts toward the mouse in 3D, with a soft light glare. */
export function Tilt({ children, className, max = 10 }: { children: ReactNode; className?: string; max?: number }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rx = useSpring(useTransform(y, [0, 1], [max, -max]), { stiffness: 160, damping: 18 });
  const ry = useSpring(useTransform(x, [0, 1], [-max, max]), { stiffness: 160, damping: 18 });

  return (
    <motion.div
      className={`relative [transform-style:preserve-3d] ${className ?? ""}`}
      style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onMouseMove={(e) => {
        if (reduce) return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width);
        y.set((e.clientY - r.top) / r.height);
      }}
      onMouseLeave={() => {
        x.set(0.5);
        y.set(0.5);
      }}
    >
      {children}
    </motion.div>
  );
}

/** Wrapper that rises from a tilted 3D angle as it scrolls into view (scrubbed with scroll). */
export function ScrollTilt({ children, className, from = 24 }: { children: ReactNode; className?: string; from?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 30%"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : from, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0.88, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [reduce ? 1 : 0.3, 1]);
  return (
    <motion.div ref={ref} className={className} style={{ rotateX, scale, opacity, transformPerspective: 1200, transformOrigin: "50% 100%" }}>
      {children}
    </motion.div>
  );
}
