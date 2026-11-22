"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "motion/react";

// Same artwork as BrandMark / brand-kit (1280-px artboard units).
const BAR1 = "M237 940V833A141 141 0 0 1 378 692V940Z";
const BAR2 = "M419 940V650A140 140 0 0 1 559 510V940Z";
const P = "M610 940V401A60 60 0 0 1 670 341H825A215.5 215.5 0 0 1 825 772H748L612 940Z";
const SHAFT = "M566 780 657 668H740L887 487";
const HEAD = "M744 443H914A16 16 0 0 1 930 459V616A16 16 0 0 1 914 632H886A16 16 0 0 1 870 616V503H760A16 16 0 0 1 744 487V459A16 16 0 0 1 760 443Z";

const back = [0.34, 1.45, 0.64, 1] as const; // slight overshoot, like the Loom intro
const out = [0.22, 1, 0.36, 1] as const;

/**
 * The logo building itself: bars rise, the P lands, the growth arrow draws through it.
 * Same sequence as brand-kit/video/loom-intro. Plays once on load; static for reduced motion.
 */
export function AnimatedMark({ className, delay = 0 }: { className?: string; delay?: number }) {
  const id = useId().replace(/:/g, "");
  const reduce = useReducedMotion();
  const rise = (from: number, at: number, dur = 0.6) =>
    reduce ? {} : { initial: { y: from }, animate: { y: 0 }, transition: { duration: dur, ease: back, delay: delay + at } };

  return (
    <svg viewBox="237 341 804 599" className={className} role="img" aria-label="Permanent SEO logo">
      <defs>
        <clipPath id={`${id}c`}>
          <rect x="0" y="0" width="1400" height="940.5" />
        </clipPath>
        <mask id={`${id}m`} maskUnits="userSpaceOnUse" x="0" y="0" width="1400" height="1400">
          <rect width="1400" height="1400" fill="#fff" />
          <motion.path
            d={SHAFT}
            fill="none"
            stroke="#000"
            strokeWidth="62"
            strokeLinejoin="round"
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, ease: out, delay: delay + 0.85 }}
          />
          <motion.path
            d={HEAD}
            style={{ transformOrigin: "900px 473px", transformBox: "view-box" }}
            initial={reduce ? false : { scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.35, ease: back, delay: delay + 1.25 }}
          />
        </mask>
      </defs>
      <g clipPath={`url(#${id}c)`}>
        <motion.path d={BAR1} fill="#ffffff" {...rise(260, 0)} />
        <motion.path d={BAR2} fill="#ffffff" {...rise(440, 0.1)} />
        <g mask={`url(#${id}m)`}>
          <motion.path d={P} fill="#3ddc6e" {...rise(610, 0.25, 0.65)} />
        </g>
      </g>
    </svg>
  );
}
