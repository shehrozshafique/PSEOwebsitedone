"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { stages } from "@/lib/site";
import { Marker, Reveal } from "@/components/motion";
import { ScrollTilt } from "@/components/effects";

export default function GrowthTabs() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const s = stages[i];
  const rail = useRef<HTMLDivElement>(null);

  // phones: keep the active tab in view inside the swipe rail (without moving the page)
  useEffect(() => {
    const r = rail.current;
    const btn = r?.children[i] as HTMLElement | undefined;
    if (r && btn && r.scrollWidth > r.clientWidth) r.scrollTo({ left: btn.offsetLeft - 20, behavior: "smooth" });
  }, [i]);

  useEffect(() => {
    if (!auto || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // phones: don't swap content (and change its height) while someone is reading
    if (window.matchMedia("(max-width: 767px)").matches) return;
    const t = setTimeout(() => setI((x) => (x + 1) % stages.length), 6000);
    return () => clearTimeout(t);
  }, [i, auto]);

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
                className="relative flex-none snap-start rounded-xl border border-line px-5 py-3 text-sm font-semibold whitespace-nowrap transition-colors"
                style={{ color: active ? "#fff" : undefined }}
              >
                {active && (
                  <motion.span
                    layoutId="tab-bg"
                    className="absolute inset-0 rounded-xl"
                    style={{ background: st.color, boxShadow: `0 12px 30px -10px ${st.color}` }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative">{st.label}</span>
              </button>
            );
          })}
        </div>

        <ScrollTilt className="mt-8">
        <div id="growth-panel" role="tabpanel" className="relative overflow-hidden rounded-2xl bg-paper shadow-[0_40px_80px_-50px_rgba(0,0,0,.45)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="relative grid gap-8 p-6 sm:p-8 md:grid-cols-[1fr_auto] md:items-center md:gap-10 md:p-12"
            >
              <div>
                <span className="grid size-12 place-items-center rounded-full text-white" style={{ background: s.color }} aria-hidden="true">
                  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </span>
                <h3 className="mt-6 font-display text-3xl font-extrabold md:text-4xl">{s.title}</h3>
                <p className="mt-3 max-w-[48ch] text-slate">{s.text}</p>
                <ul className="mt-6 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                  {s.items.map((it) => (
                    <li key={it} className="flex items-center gap-2.5 text-[15px]">
                      <svg viewBox="0 0 20 20" className="size-4 flex-none" style={{ color: s.color }} fill="currentColor" aria-hidden="true"><path d="M10 0a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-1.3 14.3-4-4 1.4-1.4 2.6 2.6 5.6-5.6 1.4 1.4-7 7Z" /></svg>
                      {it}
                    </li>
                  ))}
                </ul>
                <a href="#audit" className="btn-ink mt-8 w-full sm:w-auto">Start with a free audit →</a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        </ScrollTilt>
      </div>
    </section>
  );
}
