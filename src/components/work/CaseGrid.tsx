"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import type { CaseStudy } from "@/lib/cases";

export default function CaseGrid({ items }: { items: CaseStudy[] }) {
  const filters = ["All", ...Array.from(new Set(items.map((c) => c.industry)))];
  const [f, setF] = useState("All");
  const shown = f === "All" ? items : items.filter((c) => c.industry === f);

  return (
    <div>
      <div role="group" aria-label="Filter by industry" className="flex flex-wrap gap-2">
        {filters.map((x) => (
          <button
            key={x}
            onClick={() => setF(x)}
            aria-pressed={f === x}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${f === x ? "border-ink bg-ink text-white" : "border-line bg-white hover:border-ink/30"}`}
          >
            {x}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {shown.map((c, i) => (
            <motion.article
              key={c.slug}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={i === 0 && f === "All" ? "md:col-span-2" : ""}
            >
              <Link
                href={`/work/${c.slug}`}
                className={`group grid h-full overflow-hidden rounded-[20px] transition-shadow hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,.35)] ${i === 0 && f === "All" ? "md:grid-cols-[1fr_1.1fr]" : ""}`}
                style={{ background: c.bg }}
              >
                <div className="flex flex-col justify-between gap-6 p-8 md:p-10">
                  <div>
                    <p className="font-semibold text-xs" style={{ color: c.accent }}>
                      {c.industry} · {c.location}
                    </p>
                    <h2 className="mt-3 font-display text-xl font-bold">{c.client}</h2>
                    <p className="mt-5 font-display text-[clamp(40px,4.6vw,64px)] leading-none font-black tracking-[-0.01em]">{c.metric}</p>
                    <p className="mt-2 text-lg font-medium">{c.sub}</p>
                    <p className="mt-4 max-w-[46ch] text-ink/70">{c.text}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {c.services.map((s) => (
                      <span key={s.slug} className="text-sm text-ink/70 after:ml-2 after:text-ink/30 after:content-['·'] last-of-type:after:content-none">{s.name}</span>
                    ))}
                    <span className="ml-auto grid size-11 place-items-center rounded-full text-white transition-transform group-hover:translate-x-1" style={{ background: c.accent }} aria-hidden="true">→</span>
                  </div>
                </div>
                <div className="relative m-3 min-h-[260px] overflow-hidden rounded-2xl md:m-4">
                  <Image
                    src={c.image}
                    alt={`${c.industry} website shown on a laptop and phone`}
                    fill
                    sizes="(min-width: 768px) 600px, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
              </Link>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
