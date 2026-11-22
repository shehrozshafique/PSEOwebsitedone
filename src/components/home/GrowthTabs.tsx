"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { stages } from "@/lib/site";
import { Marker, Reveal } from "@/components/motion";
import { ScrollTilt } from "@/components/effects";

const STEP_MS = 6000;
// 3D icon that hops onto each stage's bar
const ICON: Record<string, string> = { found: "seo", leads: "website", close: "ai", automate: "shop", scale: "ads" };
const HEIGHTS = [26, 39, 52, 65, 78]; // % — the bars rise like the logo
const ease = [0.22, 1, 0.36, 1] as const;

/** Five rising bars (the logo's bar shape). Past stages ink, current stage in its colour, next ones light. */
function StageBars({ active }: { active: number }) {
  const reduce = useReducedMotion();
  return (
    <div className="relative flex h-full flex-col justify-end" aria-hidden="true">
      <div className="flex h-52 items-end justify-between gap-2 sm:h-64 md:h-80">
        {stages.map((st, idx) => {
          const on = idx === active;
          const color = idx < active ? "#0a0b0a" : on ? st.color : "#dfe2dc";
          return (
            <div key={st.key} className="relative flex h-full flex-1 flex-col justify-end" style={{ containerType: "inline-size" }}>
              <motion.div
                className="relative w-full"
                style={{ height: `${HEIGHTS[idx]}%`, transformOrigin: "50% 100%", borderTopLeftRadius: "100cqw" }}
                initial={reduce ? false : { scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease, delay: 0.1 + idx * 0.08 }}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{ borderTopLeftRadius: "inherit" }}
                  animate={{ backgroundColor: color }}
                  transition={{ duration: 0.45 }}
                />
                {on && (
                  <motion.div
                    layoutId="stage-icon"
                    className="absolute bottom-full left-1/2 mb-1 w-[120%] max-w-[92px] -translate-x-1/2"
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  >
                    <motion.div key={st.key} initial={reduce ? false : { y: -26, rotate: -10 }} animate={{ y: 0, rotate: 0 }} transition={{ type: "spring", stiffness: 300, damping: 12 }}>
                      <Image src={`/graphics/icons/${ICON[st.key] ?? "seo"}.webp`} alt="" width={120} height={120} className="w-full drop-shadow-[0_14px_16px_rgba(0,0,0,.18)]" />
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex justify-between gap-2">
        {stages.map((st, idx) => (
          <p key={st.key} className={`flex-1 text-center text-[11px] leading-tight transition-colors sm:text-xs ${idx === active ? "font-semibold text-ink" : "text-slate"}`}>
            {st.label}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function GrowthTabs() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const [playing, setPlaying] = useState(false); // auto-advance only on larger screens without reduced motion
  const s = stages[i];
  const rail = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const ok = () => setPlaying(auto && !window.matchMedia("(prefers-reduced-motion: reduce)").matches && !window.matchMedia("(max-width: 767px)").matches);
    ok();
    window.addEventListener("resize", ok);
    return () => window.removeEventListener("resize", ok);
  }, [auto]);

  // phones: keep the active tab in view inside the swipe rail (without moving the page)
  useEffect(() => {
    const r = rail.current;
    const btn = r?.children[i] as HTMLElement | undefined;
    if (r && btn && r.scrollWidth > r.clientWidth) r.scrollTo({ left: btn.offsetLeft - 20, behavior: "smooth" });
  }, [i]);

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => setI((x) => (x + 1) % stages.length), STEP_MS);
    return () => clearTimeout(t);
  }, [i, playing]);

  return (
    <section id="growth" className="section bg-white">
      <div className="container-x">
        <Reveal className="mx-auto max-w-5xl text-center">
          <h2 className="h-display text-[clamp(38px,5.4vw,68px)]">
            One system that takes you from <Marker>searched to sold</Marker>
          </h2>
          <p className="mx-auto mt-5 max-w-[58ch] text-lg text-slate">
            Most agencies fix one piece. We connect all five, so every customer who finds you ends up on your calendar or in your checkout.
          </p>
        </Reveal>

        <div ref={rail} role="tablist" aria-label="Growth stages" className="no-scrollbar relative -mx-5 mt-10 flex snap-x gap-2 overflow-x-auto px-5 sm:mx-0 sm:mt-12 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0">
          {stages.map((st, idx) => {
            const active = idx === i;
            return (
              <button
                key={st.key}
                role="tab"
                aria-selected={active}
                aria-controls="growth-panel"
                onClick={() => {
                  setI(idx);
                  setAuto(false);
                }}
                className="relative flex-none snap-start overflow-hidden rounded-xl border border-line px-5 py-3 text-sm font-semibold whitespace-nowrap transition-colors"
                style={{ color: active ? "#fff" : undefined }}
              >
                {active && (
                  <motion.span layoutId="tab-bg" className="absolute inset-0 rounded-xl" style={{ background: st.color }} transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                )}
                {/* countdown to the next stage while it auto-plays */}
                {active && playing && (
                  <motion.span
                    key={`p${i}`}
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-white/70"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: STEP_MS / 1000, ease: "linear" }}
                  />
                )}
                <span className="relative">{st.label}</span>
              </button>
            );
          })}
        </div>

        <ScrollTilt className="mt-8">
          <div id="growth-panel" role="tabpanel" className="relative overflow-hidden rounded-2xl bg-paper shadow-[0_40px_80px_-50px_rgba(0,0,0,.45)]">
            <div className="grid gap-10 p-6 sm:p-8 md:grid-cols-[1.1fr_.9fr] md:items-end md:gap-12 md:p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={s.key}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                >
                  <h3 className="font-display text-3xl font-extrabold md:text-4xl">{s.title}</h3>
                  <p className="mt-3 max-w-[48ch] text-slate">{s.text}</p>
                  <ul className="mt-6 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                    {s.items.map((it, n) => (
                      <motion.li
                        key={it}
                        className="flex items-center gap-2.5 text-[15px]"
                        initial={reduce ? false : { opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, ease, delay: 0.15 + n * 0.06 }}
                      >
                        <svg viewBox="0 0 20 20" className="size-4 flex-none" style={{ color: s.color }} fill="currentColor" aria-hidden="true"><path d="M10 0a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-1.3 14.3-4-4 1.4-1.4 2.6 2.6 5.6-5.6 1.4 1.4-7 7Z" /></svg>
                        {it}
                      </motion.li>
                    ))}
                  </ul>
                  <a href="#audit" className="btn-ink mt-8 w-full sm:w-auto">Start with a free audit →</a>
                </motion.div>
              </AnimatePresence>

              <StageBars active={i} />
            </div>
          </div>
        </ScrollTilt>
      </div>
    </section>
  );
}
