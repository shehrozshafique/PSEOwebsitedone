"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "motion/react";

/*
 * Peel sticker (lime circle with the top-right corner folded back) and round "promise" seals.
 * Only true claims go on these. Never certification or award logos you don't hold.
 */

// Circle r=96 at (100,100), cut by a chord 66 from the centre toward the top-right.
const BODY = "M195.96 102.62A96 96 0 1 1 97.38 4.04Z"; // circle without the peeled corner
const FLAP = "M97.38 4.04A96 96 0 0 0 195.96 102.62Z"; // the corner, folded back over the sticker

export function PeelSticker({ title, sub, className = "", delay = 1.1 }: { title: string; sub: string; className?: string; delay?: number }) {
  const id = useId().replace(/:/g, "");
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`pointer-events-auto select-none ${className}`}
      initial={reduce ? false : { opacity: 0, scale: 1.5, rotate: -30 }}
      animate={{ opacity: 1, scale: 1, rotate: -12 }}
      whileHover={reduce ? undefined : { rotate: -4, scale: 1.04 }}
      transition={{ type: "spring", stiffness: 260, damping: 16, delay }}
      role="img"
      aria-label={`${title} ${sub}`}
    >
      <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible drop-shadow-[0_18px_24px_rgba(0,0,0,.35)]">
        <defs>
          <linearGradient id={`${id}f`} x1="0.85" y1="0.15" x2="0.3" y2="0.7">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.55" stopColor="#eef2ea" />
            <stop offset="1" stopColor="#c9d1c2" />
          </linearGradient>
          <filter id={`${id}s`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="-3" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.22" />
          </filter>
        </defs>
        <path d={BODY} fill="#d2f99a" />
        <g transform="rotate(-8 92 122)" fill="#0a0b0a" style={{ fontFamily: "var(--font-display)" }}>
          <text x="90" y="124" textAnchor="middle" fontSize="29" fontWeight="900">{title}</text>
          <text x="90" y="148" textAnchor="middle" fontSize="15" fontWeight="500">{sub}</text>
        </g>
        <path d={FLAP} fill={`url(#${id}f)`} filter={`url(#${id}s)`} />
      </svg>
    </motion.div>
  );
}

/** Scalloped seal outline (like a rosette badge). */
function scallop(n = 28, r = 58, a = 2.6) {
  let d = "";
  for (let i = 0; i <= n * 8; i++) {
    const t = (i / (n * 8)) * Math.PI * 2;
    const rr = r + a * Math.cos(t * n);
    d += `${i ? "L" : "M"}${(60 + rr * Math.cos(t)).toFixed(2)} ${(60 + rr * Math.sin(t)).toFixed(2)}`;
  }
  return d + "Z";
}
const EDGE = scallop();

export type Seal = { big: string; small?: string; ring: string; color: string };

export function PromiseSeal({ seal, index = 0 }: { seal: Seal; index?: number }) {
  const id = useId().replace(/:/g, "");
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="aspect-square w-full max-w-[112px]"
      initial={reduce ? false : { opacity: 0, scale: 0.7, rotate: -25 }}
      whileInView={{ opacity: 1, scale: 1, rotate: index % 2 ? 6 : -6 }}
      whileHover={reduce ? undefined : { rotate: 0, scale: 1.06 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 220, damping: 15, delay: index * 0.08 }}
      role="img"
      aria-label={`${seal.big} ${seal.small ?? ""}: ${seal.ring}`}
    >
      <svg viewBox="0 0 120 120" className="h-full w-full overflow-visible" style={{ fontFamily: "var(--font-display)" }}>
        <defs>
          <path id={`${id}r`} d="M60 60m-43 0a43 43 0 1 1 86 0a43 43 0 1 1 -86 0" />
        </defs>
        <path d={EDGE} fill={seal.color} />
        <circle cx="60" cy="60" r="34" fill="none" stroke="#0a0b0a" strokeOpacity="0.18" strokeWidth="1" />
        <text fontSize="9" fontWeight="600" fill="#0a0b0a">
          <textPath href={`#${id}r`} startOffset="0" textLength="266" lengthAdjust="spacing">{seal.ring}</textPath>
        </text>
        <text x="60" y={seal.small ? 62 : 68} textAnchor="middle" fontSize={seal.big.length > 4 ? 18 : 24} fontWeight="900" fill="#0a0b0a">{seal.big}</text>
        {seal.small && <text x="60" y="76" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#0a0b0a">{seal.small}</text>}
      </svg>
    </motion.div>
  );
}

export const promiseSeals: Seal[] = [
  { big: "48h", small: "free audit", ring: "Free audit · video report · delivered fast · ", color: "#d2f99a" },
  { big: "0", small: "lock-in", ring: "Month to month · cancel anytime · ", color: "#ffffff" },
  { big: "100%", small: "yours", ring: "You own your site, domain and data · ", color: "#3ddc6e" },
  { big: "<1 min", small: "replies", ring: "Instant reply to every new lead · ", color: "#cfe6ff" },
];
