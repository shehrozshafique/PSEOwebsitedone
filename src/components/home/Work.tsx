"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cases } from "@/lib/site";
import type { CaseStudy } from "@/lib/cases";
import { Reveal } from "@/components/motion";

/** One case card: tilts up from a 3D angle as it scrolls in, then sticks and stacks. */
function CaseCard({ c, i }: { c: CaseStudy; i: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 35%"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 18, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0.9, 1]);
  const imgY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 40, 0]);

  return (
    <motion.article
      ref={ref}
      style={{ background: c.bg, top: `${110 + i * 28}px`, rotateX, scale, transformPerspective: 1200, transformOrigin: "50% 0%" }}
      className="grid overflow-hidden rounded-2xl md:sticky md:rounded-[20px] shadow-[0_-20px_50px_-30px_rgba(0,0,0,.35)] md:grid-cols-[1fr_1.05fr]"
    >
      <div className="flex flex-col justify-between gap-7 p-6 sm:p-8 md:p-12">
        <div>
          <h3 className="font-display text-2xl font-bold">{c.client}</h3>
          <p className="mt-5 font-display text-[clamp(40px,5.6vw,72px)] leading-none font-black tracking-[-0.01em]">{c.metric}</p>
          <p className="mt-2 text-lg font-medium">{c.sub}</p>
          <p className="mt-4 max-w-[46ch] text-[15px] text-ink/70 sm:text-base">{c.text}</p>
        </div>
        <Link href={`/work/${c.slug}`} className="btn w-full text-white sm:w-auto sm:self-start" style={{ background: c.accent }}>View case study →</Link>
      </div>
      {/* Example mockup (Higgsfield). Replace with the real client's site when case studies are added. */}
      <div className="relative m-2.5 aspect-[4/3] overflow-hidden rounded-[20px] sm:m-3 sm:rounded-2xl md:m-4 md:aspect-auto md:min-h-[280px]">
        <motion.div style={{ y: imgY }} className="absolute inset-[-40px_0_0_0]">
          <Image src={c.image} alt={`${c.industry} website shown on a laptop and phone`} fill sizes="(min-width: 768px) 600px, 100vw" className="object-cover" />
        </motion.div>
      </div>
    </motion.article>
  );
}

/** Paper section: case study cards that stick and stack. */
export function CaseStudies() {
  return (
    <section id="work" className="section bg-paper">
      <div className="container-x">
        <Reveal className="max-w-4xl">
          <h2 className="h-display text-[clamp(38px,5.4vw,68px)]">
            Real businesses. <span className="font-normal text-slate">Real numbers</span>
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:gap-6 md:mt-14">
          {cases.map((c, i) => (
            <CaseCard key={c.slug} c={c} i={i} />
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-slate">Example case studies until real client work is added.</p>
          <Link href="/work" className="btn-outline">See all case studies →</Link>
        </div>
      </div>
    </section>
  );
}
