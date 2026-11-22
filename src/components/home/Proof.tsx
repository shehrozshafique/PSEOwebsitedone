"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { CountUp, Reveal } from "@/components/motion";
import { Tilt } from "@/components/effects";
import { stats } from "@/lib/site";

/** Dark band: sticky title + tilted stat cards that stack. */
export function Numbers() {
  const reduce = useReducedMotion();
  return (
    <section className="bg-white px-2 sm:px-4">
      <div className="relative overflow-clip rounded-[20px] bg-ink py-16 text-white sm:py-24 md:rounded-[20px] md:py-36">
      <div className="container-x relative grid gap-10 md:grid-cols-2 md:gap-14">
        <div className="md:sticky md:top-32 md:self-start">
          <h2 className="h-display text-[clamp(40px,5.6vw,72px)]">
            There’s a reason clients stay with us
          </h2>
          <p className="mt-5 max-w-[44ch] text-[17px] text-mist sm:text-lg">
            We measure what matters to your business: calls, orders and revenue. Not likes or “impressions”.
          </p>
          <a href="#work" className="btn-outline-light mt-8">See client results</a>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-1 md:gap-6 md:pt-24">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={reduce ? false : { opacity: 0, y: 60, rotate: i % 2 ? 4 : -4 }}
              whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 2 : -2 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl p-5 text-ink shadow-[0_30px_60px_-30px_rgba(0,0,0,.9)] sm:p-8 md:sticky md:rounded-2xl"
              style={{ background: s.bg, top: `${130 + i * 24}px` }}
            >
              <p className="font-display text-[clamp(40px,7vw,88px)] leading-none font-black tracking-[-0.01em]">
                <CountUp to={s.value} decimals={s.decimals ?? 0} suffix={s.suffix} />
              </p>
              <p className="mt-4 text-sm leading-snug sm:text-base md:mt-10 md:text-lg">{s.label}</p>
            </motion.div>
          ))}
          <p className="col-span-2 text-xs text-white/40 md:col-span-1">Example figures until client results are added.</p>
        </div>
      </div>
      </div>
    </section>
  );
}

/** Light bento grid of services. */
export function Services({ items }: { items: { slug: string; title: string; text: string; color: string; size: string; icon: string }[] }) {
  return (
    <section id="services" className="section bg-white">
      <div className="container-x">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-4xl">
            <h2 className="h-display text-[clamp(38px,5.4vw,68px)]">
              Everything you need to grow, <span className="font-normal text-slate">online or on the map</span>
            </h2>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-3 sm:gap-4 md:mt-12 md:grid-cols-3">
          {items.map((s, i) => {
            const dark = s.color === "#0a0b0a";
            return (
              <Reveal key={s.title} delay={i * 0.05} className={s.size === "lg" ? "md:col-span-2" : ""}>
                <Tilt className="group h-full rounded-2xl" max={7}>
                <a
                  href={`/services/${s.slug}`}
                  className={`group relative flex h-full items-center gap-4 overflow-hidden rounded-2xl border p-4 pr-5 transition-all duration-300 hover:-translate-y-1 md:min-h-[240px] md:flex-col md:items-stretch md:justify-between md:gap-0 md:rounded-2xl md:p-8 ${
                    dark ? "border-transparent bg-ink text-white" : "border-transparent bg-paper hover:bg-white"
                  }`}
                  style={{ ["--c" as string]: s.color }}
                >
                  <Image
                    src={`/graphics/icons/${s.icon}.webp`}
                    alt=""
                    width={96}
                    height={96}
                    className="relative size-14 flex-none drop-shadow-[0_14px_20px_rgba(0,0,0,.18)] md:size-20 transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-6"
                  />
                  <div className="relative min-w-0 flex-1 md:mt-10 md:flex-none">
                    <h3 className="font-display text-lg font-bold md:text-2xl">{s.title}</h3>
                    <p className={`mt-1 max-w-[42ch] text-sm leading-snug md:mt-2 md:text-base md:leading-normal ${dark ? "text-mist" : "text-slate"}`}>{s.text}</p>
                  </div>
                  <span aria-hidden="true" className={`relative grid size-9 flex-none place-items-center rounded-full border transition-all group-hover:translate-x-1 md:absolute md:right-7 md:bottom-7 md:size-10 ${dark ? "border-white/20" : "border-line bg-white"}`}>→</span>
                </a>
                </Tilt>
              </Reveal>
            );
          })}
          <Reveal delay={0.3}>
            <a href="#audit" className="group flex h-full flex-col justify-between gap-6 rounded-2xl bg-green p-6 text-[#03150a] md:min-h-[240px] md:rounded-2xl md:p-8 transition-transform duration-300 hover:-translate-y-1">
                            <div>
                <h3 className="font-display text-2xl font-bold">Get a free audit and we’ll tell you what to fix first</h3>
                <span className="mt-4 inline-block font-semibold underline underline-offset-4 group-hover:no-underline">Get my free audit →</span>
              </div>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
