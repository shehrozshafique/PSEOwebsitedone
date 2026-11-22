"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { faqs, footerCompany, footerServices, process, site, testimonials } from "@/lib/site";
import { Marker, Reveal } from "@/components/motion";
import { Tilt } from "@/components/effects";
import { Logo } from "./Header";
import { submitLead } from "@/lib/attribution";
import { areas } from "@/lib/areas";
import FormConsent from "@/components/FormConsent";
import { telHref } from "@/components/MobileCta";

/** Paper: 4 step cards; a green line draws across and each step lights up as you scroll. */
export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 55%"] });
  const scaleX = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0, 1]);
  const [active, setActive] = useState(reduce ? 3 : -1);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!reduce) setActive(Math.min(3, Math.floor(v * 3.999)));
  });
  return (
    <section className="section bg-paper">
      <div className="container-x">
        <Reveal className="max-w-4xl">
          <h2 className="h-display text-[clamp(38px,5.4vw,68px)]">
            From first call to <Marker>full calendar</Marker>
          </h2>
        </Reveal>
        <div ref={ref} className="relative mt-10 md:mt-16">
          <div className="absolute top-[34px] right-[12%] left-[12%] hidden h-[2px] rounded bg-line md:block" aria-hidden="true" />
          <motion.div style={{ scaleX }} className="absolute top-[34px] right-[12%] left-[12%] hidden h-[2px] origin-left rounded bg-green md:block" aria-hidden="true" />
          <ol className="relative grid gap-3 sm:gap-5 md:grid-cols-4">
            {process.map((p, i) => {
              const on = i <= active;
              return (
                <li
                  key={p.step}
                  className={`relative grid grid-cols-[auto_1fr] gap-x-4 rounded-2xl border bg-white p-5 transition-all duration-500 md:block md:rounded-2xl md:p-6 ${
                    on ? "border-green/50 shadow-[0_24px_50px_-28px_rgba(31,174,85,.55)]" : "border-line"
                  }`}
                >
                  <span
                    className={`relative z-10 grid size-11 place-items-center rounded-full text-sm font-semibold transition-all duration-500 ${
 on ?"scale-110 bg-green text-[#03150a] shadow-[0_0_0_6px_rgba(61,220,110,.18)]":"bg-paper"
 }`}
                  >
                    {on && i < active ? "\u2713" : i + 1}
                  </span>
                  <div>
                  <h3 className="font-display text-xl font-bold md:mt-6 md:text-2xl">{p.step}</h3>
                  <p className="mt-1.5 text-[15px] text-slate md:mt-2">{p.text}</p>
                  <p className="mt-3 text-sm font-medium text-green-ink">{p.time}</p></div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

/** White: testimonial cards (video-ready), with 3D tilt. */
export function Testimonials() {
  return (
    <section className="section bg-white">
      <div className="container-x">
        <Reveal className="mx-auto max-w-5xl text-center">
          <h2 className="h-display text-[clamp(38px,5.4vw,68px)]">Trusted by owners who were tired of guessing</h2>
        </Reveal>
        <div className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-6 sm:-mx-8 sm:px-8 md:mx-0 md:mt-14 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 0.08} className="h-full w-[84%] flex-none snap-center sm:w-[60%] md:w-auto">
              <Tilt className="group h-full rounded-2xl" max={6}>
                <figure className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_30px_60px_-40px_rgba(0,0,0,.35)]">
                  {/* TODO: replace with a real client video thumbnail */}
                  <div className="relative grid aspect-[16/10] place-items-center overflow-hidden md:aspect-[4/3]" style={{ background: t.bg }}>
                    <span className="relative grid size-16 place-items-center rounded-full bg-white/90 shadow-lg ring-8 ring-white/30 transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
                      <svg viewBox="0 0 24 24" className="ml-1 size-6" fill="currentColor"><path d="M7 4v16l13-8z" /></svg>
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5 md:p-7">
                    <p className="text-amber" aria-label="5 out of 5 stars">{"\u2605\u2605\u2605\u2605\u2605"}</p>
                    <blockquote className="mt-3 flex-1 font-display text-lg leading-snug md:text-xl">{"\u201c"}{t.quote}{"\u201d"}</blockquote>
                  </div>
                  <figcaption className="flex items-center gap-3 border-t border-line px-5 py-4 text-sm md:px-7 md:py-5">
                    <span className="grid size-9 place-items-center rounded-full font-display text-xs font-bold" style={{ background: t.bg }} aria-hidden="true">
                      {t.role.split(",")[0].slice(0, 2).toUpperCase()}
                    </span>
                    <span>
                      <b className="block font-semibold">{t.name}</b>
                      <span className="text-slate">{t.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** White: two-column FAQ. */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="section bg-paper">
      <div className="container-x">
        <div className="grid gap-8 md:grid-cols-[.8fr_1.2fr] md:gap-12">
          <div className="md:sticky md:top-32 md:self-start">
            <h2 className="h-display text-[clamp(38px,5vw,60px)]">Questions we hear every week</h2>
            <div className="mt-8 hidden overflow-hidden rounded-2xl bg-ink p-7 text-white md:block">
              <p className="relative font-display text-xl font-bold">Still have a question?</p>
              <p className="relative mt-1 text-sm text-mist">Talk to a real person. We reply within one business day.</p>
              <a href={telHref} className="relative mt-4 block font-display text-lg hover:text-green-soft">{site.phone}</a>
              <Link href="/contact" className="btn-green relative mt-5 !px-5 !py-2.5 text-sm">Send us a message {"\u2192"}</Link>
            </div>
          </div>
          <div className="divide-y divide-line border-y border-line">
            {faqs.map((f, i) => {
              const on = open === i;
              return (
                <div key={f.q}>
                  <button
                    className="flex w-full items-center justify-between gap-4 py-5 text-left font-display text-lg leading-snug font-semibold md:gap-6 md:py-6 md:text-xl"
                    aria-expanded={on}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpen(on ? null : i)}
                  >
                    {f.q}
                    <span className={`grid size-8 flex-none place-items-center rounded-full border border-line transition-transform duration-300 ${on ? "rotate-45 bg-ink text-white" : ""}`} aria-hidden="true">+</span>
                  </button>
                  <motion.div
                    id={`faq-${i}`}
                    initial={false}
                    animate={{ height: on ? "auto" : 0, opacity: on ? 1 : 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-[60ch] pb-5 text-[15px] text-slate md:pb-6 md:text-base">{f.a}</p>
                  </motion.div>
                </div>
              );
            })}
          </div>
          {/* phones: the contact card comes after the questions */}
          <div className="overflow-hidden rounded-2xl bg-ink p-6 text-white md:hidden">
            <p className="relative font-display text-xl font-bold">Still have a question?</p>
            <p className="relative mt-1 text-sm text-mist">Talk to a real person. We reply within one business day.</p>
            <div className="relative mt-5 grid grid-cols-2 gap-2">
              <a href={telHref} className="btn-outline-light !px-3">Call us</a>
              <Link href="/contact" className="btn-green !px-3">Message us</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Dark green band (the only green-led section) + audit form. */
export function FinalCta() {
  const router = useRouter();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [honey, setHoney] = useState("");
  return (
    <section id="audit" className="bg-paper px-2 pb-2 sm:px-4 sm:pb-4">
      <div className="relative overflow-hidden rounded-[20px] bg-ink py-16 text-white sm:py-24 md:rounded-[20px] md:py-32">
      <div className="container-x relative grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-14">
        <div>
          <h2 className="h-display text-[clamp(44px,6.4vw,84px)]">
            Let’s grow your business <span className="block font-normal text-green-soft">Starting with a free audit</span>
          </h2>
          <p className="mt-6 max-w-[50ch] text-[17px] text-mist sm:text-lg">
            In 48 hours you get a short video and report: how your website or store, Google ranking, ads and follow-up compare to your top
            competitors, and the 5 fixes that will bring the most calls and sales.
          </p>
          <div className="mt-8 flex items-center gap-4">
            {/* TODO: real founder photo */}
            <span className="grid size-14 place-items-center rounded-full bg-white/10 font-display font-bold ring-2 ring-green" aria-hidden="true">You</span>
            <p className="text-sm text-white/70">
              Reviewed personally by our founder,
              <br />
              not an automated tool.
            </p>
          </div>
        </div>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const f = new FormData(e.currentTarget);
            setSent(true);
            setError(null);
            const err = await submitLead({
              form: "homepage-cta",
              name: String(f.get("name") ?? ""),
              phone: String(f.get("phone") ?? ""),
              website: String(f.get("website") ?? ""),
              company: honey,
            });
            if (err) {
              setError(err);
              setSent(false);
              return;
            }
            router.push("/thank-you");
          }}
          className="glass-dark rounded-2xl p-5 sm:p-7 md:rounded-2xl md:p-9"
        >
          {sent ? (
            <div className="py-10 text-center">
              <p className="font-display text-3xl font-bold">Sending…</p>
            </div>
          ) : (
            <>
<input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] size-px opacity-0" value={honey} onChange={(e) => setHoney(e.target.value)} />
              <p className="font-display text-2xl font-bold">Get my free audit</p>
              <p className="mt-1 text-sm text-white/55">Takes 30 seconds. No spam, ever.</p>
              <div className="mt-6 grid gap-3">
                {[
                  ["name", "Your name", "text", "name"],
                  ["phone", "Phone number", "tel", "tel"],
                  ["website", "Website (or business name)", "text", "url"],
                ].map(([id, label, type, ac]) => (
                  <label key={id} className="grid gap-1.5 text-sm">
                    <span className="text-white/70">{label}</span>
                    <input id={id} name={id} type={type} autoComplete={ac} required {...(id === "website" ? { inputMode: "url" as const, autoCapitalize: "none", autoCorrect: "off", spellCheck: false } : {})} className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-green" />
                  </label>
                ))}
              </div>
              {error && <p role="alert" className="mt-4 rounded-xl bg-coral/15 px-4 py-3 text-sm text-[#ffb3a1]">{error}</p>}
              <button type="submit" className="btn-green relative mt-6 w-full overflow-hidden">
                Send me my free audit →
              </button>
              <FormConsent dark />
            </>
          )}
        </form>
      </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="overflow-hidden bg-ink pt-14 text-white md:pt-20">
      <div className="container-x grid grid-cols-2 gap-x-6 gap-y-10 border-t border-white/10 pt-12 sm:gap-12 sm:pt-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
        <div className="col-span-2 lg:col-span-1">
          <Logo light />
          <p className="mt-5 max-w-[36ch] text-mist">
            Websites, stores, Google rankings, ads and automation for {site.audience}. One team, one platform, one monthly plan.
          </p>
          <a href={telHref} className="mt-5 block py-1 text-sm hover:text-green-soft">{site.phone}</a>
          <a href={`mailto:${site.email}`} className="block py-1 text-sm hover:text-green-soft">{site.email}</a>
        </div>
        <FooterCol title="Services" items={footerServices} />
        <FooterCol title="Company" items={footerCompany} />
        <FooterCol title="Areas we serve" items={[...areas.map((a) => ({ label: `${a.city}, ${a.state}`, href: `/areas/${a.slug}` })), { label: "View all areas →", href: "/areas" }]} />
        <FooterCol title="Get started" items={[{ label: "Free audit", href: "/free-audit" }, { label: "Book a call", href: "/contact#book" }, { label: "Client login", href: "#" }, { label: "Privacy Policy", href: "/privacy" }, { label: "Terms of Service", href: "/terms" }, { label: "SMS Terms", href: "/sms-terms" }]} />
      </div>
      <FooterWordmark />
      <div className="container-x flex flex-wrap justify-between gap-3 border-t border-white/10 py-6 pb-[max(24px,env(safe-area-inset-bottom))] text-xs text-white/40">
        <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        <p>Made with care for local businesses.</p>
      </div>
    </footer>
  );
}

function FooterWordmark() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 80, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 50, 0]);
  return (
    <motion.p
      ref={ref}
      aria-hidden="true"
      style={{ y, rotateX, transformPerspective: 800, transformOrigin: "50% 100%" }}
      className="mt-16 text-center font-display text-[clamp(44px,11vw,170px)] leading-[0.85] font-black tracking-[-0.01em] whitespace-nowrap text-carbon select-none"
    >
      {site.name}
    </motion.p>
  );
}

function FooterCol({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="font-display font-bold">{title}</p>
      <ul className="mt-3 grid gap-0.5 text-[15px] text-mist md:mt-4 md:text-base">
        {items.map((x) => (
          <li key={x.label}><a href={x.href} className="block py-1.5 hover:text-white">{x.label}</a></li>
        ))}
      </ul>
    </div>
  );
}
