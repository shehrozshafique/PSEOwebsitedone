"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Words } from "@/components/motion";
import { site } from "@/lib/site";
import { PeelSticker } from "@/components/brand/Stickers";

const ease = [0.22, 1, 0.36, 1] as const;


export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();


  // scroll: the hero tips back into 3D space as you scroll away
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const headY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -120]);
  const tilt = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 14]);
  const shrink = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.9]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0.2]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative -mt-[88px] overflow-hidden bg-ink pt-[128px] pb-32 text-white sm:pt-[150px] sm:pb-20 md:pb-36"
    >
      <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0" />
      <motion.div style={{ y: headY, rotateX: tilt, scale: shrink, opacity: fade, transformPerspective: 1400, transformOrigin: "50% 0%" }} className="container-x relative">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="text-center text-[15px] text-white/70"
        >
          <span className="text-amber" aria-hidden="true">{"\u2605\u2605\u2605\u2605\u2605"}</span>{" "}
          <b className="font-semibold text-white">{site.rating}</b> on Google · for local businesses and online stores
        </motion.p>

        {/* Wide, centered headline: two long lines */}
        <h1 className="h-display relative z-10 mt-7 text-center text-[clamp(42px,6.7vw,104px)] sm:mt-8 leading-[0.95] font-black whitespace-normal lg:whitespace-nowrap">
          <Words text="Get found, get leads" immediate delay={0.1} />
          <span className="block font-normal text-white/90">
            <Words text="and close them fast" immediate delay={0.4} />
          </span>
        </h1>

        <div className="mt-6 flex flex-col items-center sm:mt-8">
          <div className="flex flex-col items-center text-center">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.75 }}
              className="max-w-[46ch] text-[17px] leading-relaxed text-mist sm:text-lg md:text-xl"
            >
              Websites, ads and automation that bring local businesses more calls and online stores more orders.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.9 }}
              className="mt-7 flex w-full flex-col items-stretch gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-center"
            >
              <Link href="/free-audit" className="btn-green group relative overflow-hidden">
                Get my free audit <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link href="/work" className="btn-outline-light">See our work</Link>
            </motion.div>
            <p className="mt-4 text-[13px] text-white/45">Free · No obligation · <span className="whitespace-nowrap">Results in 48 hours</span></p>
          </div>
          {/* lime peel sticker: under the buttons on phones, beside them on larger screens */}
          <PeelSticker title="48 hours" sub="is all it takes" className="absolute right-1 -bottom-[104px] size-[92px] sm:right-[2%] sm:bottom-0 md:size-[150px] lg:right-[6%]" />
        </div>
      </motion.div>
    </section>
  );
}
