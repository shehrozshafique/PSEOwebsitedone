"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { money, plans, yearlyDiscount } from "@/lib/pricing";

export default function Plans() {
  const [yearly, setYearly] = useState(false);

  return (
    <div>
      {/* billing switch */}
      <div className="flex justify-center">
        <div role="radiogroup" aria-label="Billing period" className="glass-light relative flex rounded-full p-1.5">
          {[
            { v: false, label: "Monthly" },
            { v: true, label: "Yearly", note: "2 months free" },
          ].map((o) => {
            const on = yearly === o.v;
            return (
              <button
                key={o.label}
                role="radio"
                aria-checked={on}
                onClick={() => setYearly(o.v)}
                className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${on ? "text-white" : "text-slate hover:text-ink"}`}
              >
                {on && <motion.span layoutId="bill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 350, damping: 30 }} />}
                <span className="relative flex items-center gap-2">
                  {o.label}
                  {o.note && <span className={`rounded-full px-2 py-0.5 text-[11px] ${on ? "bg-green text-[#03150a]" : "bg-green/15 text-green-ink"}`}>{o.note}</span>}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-3">
        {plans.map((p) => {
          const price = Math.round(yearly ? p.monthly * (1 - yearlyDiscount) : p.monthly);
          const dark = !!p.popular;
          return (
            <article
              key={p.key}
              className={`relative flex flex-col overflow-hidden rounded-[20px] p-8 ${
                dark ? "bg-ink text-white shadow-[0_40px_80px_-40px_rgba(31,174,85,.55)] lg:-my-4 lg:py-12" : "glass-light"
              }`}
            >
              {dark && (
                <>
                  <span className="absolute top-7 right-7 text-sm font-semibold text-green-soft">Most popular</span>
                </>
              )}
              <div className="relative">
                                <h3 className="font-display text-3xl font-extrabold">{p.name}</h3>
                <p className={`mt-1 ${dark ? "text-mist" : "text-slate"}`}>{p.tagline}</p>

                <div className="mt-7 flex items-end gap-1.5">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={price}
                      initial={{ y: 16, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -16, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="font-display text-6xl leading-none font-black tracking-[-0.01em] tabular-nums"
                    >
                      {money(price)}
                    </motion.span>
                  </AnimatePresence>
                  <span className={`pb-1.5 ${dark ? "text-mist" : "text-slate"}`}>/mo</span>
                </div>
                <p className={`mt-2 text-sm ${dark ? "text-white/50" : "text-slate"}`}>
                  {yearly ? `Billed ${money(price * 12)} yearly` : "Billed monthly · cancel anytime"}
                  {p.setup ? ` · ${money(p.setup)} setup` : " · no setup fee"}
                </p>

                <p className={`mt-6 font-semibold text-[13px] ${dark ?"text-white/50":"text-slate"}`}>
                  Covers: {p.stages.join(" · ")}
                </p>
                <ul className="mt-4 grid gap-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[15px]">
                      <span className="mt-0.5 grid size-5 flex-none place-items-center rounded-full text-[11px] text-white" style={{ background: p.color }} aria-hidden="true">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <Link href="/free-audit" className="relative mt-auto block pt-8">
                <span className={`${dark ? "btn-green" : "btn-ink"} w-full`}>{p.cta} →</span>
              </Link>
            </article>
          );
        })}
      </div>
      <p className="mt-8 text-center text-sm text-slate">
        Every plan starts with a free audit, so we can confirm the right plan before you pay anything.
      </p>
    </div>
  );
}
