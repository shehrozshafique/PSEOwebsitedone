"use client";

import { motion, useInView, useReducedMotion, animate } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/** Fade + rise when scrolled into view. Use as="li" inside lists to keep valid HTML. */
export function Reveal({
  children,
  delay = 0,
  className,
  style,
  y = 24,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  y?: number;
  as?: "div" | "li";
}) {
  const reduce = useReducedMotion();
  const Tag = as === "li" ? motion.li : motion.div;
  return (
    <Tag
      className={className}
      style={style}
      initial={reduce ? false : { opacity: 0, y, rotateX: 12, transformPerspective: 900 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </Tag>
  );
}

/** Word stagger: each word rises in after the last. */
export function Words({ text, className, delay = 0, immediate = false }: { text: string; className?: string; delay?: number; immediate?: boolean }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            initial={reduce ? false : { y: "105%" }}
            {...(immediate ? { animate: { y: "0%" } } : { whileInView: { y: "0%" }, viewport: { once: true } })}
            transition={{ duration: 0.7, ease, delay: delay + i * 0.08 }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Number count-up when visible. */
export function CountUp({ to, decimals = 0, suffix = "", prefix = "" }: { to: number; decimals?: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(reduce ? to : 0);
  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, to, { duration: 1.4, ease, onUpdate: setVal });
    return () => c.stop();
  }, [inView, to, reduce]);
  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/** Lime marker sweep under a phrase when visible. */
export function Marker({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  return (
    <span
      ref={ref}
      className="marker"
      style={{
        ["--mk" as string]: inView || reduce ? "100%" : "0%",
        transition: "background-size 0.9s cubic-bezier(0.22,1,0.36,1) 0.2s",
      }}
    >
      {children}
    </span>
  );
}
