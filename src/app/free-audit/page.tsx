import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/home/Header";
import { Footer } from "@/components/home/Closing";
import AuditForm from "@/components/audit/AuditForm";
import { Marker, Reveal } from "@/components/motion";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Free Website & Google Audit | ${site.name}`,
  description:
    "Get a free video audit of your website, Google ranking, Maps profile, reviews and lead follow-up, with the 5 fixes that will bring the most calls. Ready in 48 hours.",
};

const checks = [
  { icon: "website", title: "Website speed & mobile", text: "How fast your site loads on a phone, and whether visitors can find your number and book in one tap." },
  { icon: "seo", title: "Google ranking", text: "Where you show up for the searches your customers actually type, and who ranks above you." },
  { icon: "local", title: "Google Maps & profile", text: "Your Google Business Profile, photos, categories and Maps position in your area." },
  { icon: "ai", title: "Lead response test", text: "We send a real enquiry and time how long it takes to get a reply. Most businesses are surprised." },
  { icon: "ads", title: "Ads & tracking", text: "If you run ads: where the money goes, and whether calls and forms are tracked at all." },
  { icon: "video", title: "Reviews & reputation", text: "How many reviews you have, how recent they are, and how you compare to nearby competitors." },
];

const findings = [
  { label: "Mobile page speed", value: "5.8s", tone: "bad", note: "Customers leave after 3 seconds" },
  { label: "Reply time to a new lead", value: "19 hrs", tone: "bad", note: "Competitor replied in 4 min" },
  { label: "Google Maps position", value: "#9", tone: "warn", note: "Top 3 get most of the calls" },
  { label: "Google reviews", value: "41 · 4.6★", tone: "warn", note: "Last review 5 months ago" },
  { label: "Click-to-call on mobile", value: "Yes", tone: "good", note: "Keep it" },
];

const tone = { bad: "bg-coral/20 text-[#ff9a82]", warn: "bg-amber/20 text-[#ffc46b]", good: "bg-green/20 text-green-soft" } as const;

const steps = [
  { n: "1", t: "Tell us about your business", d: "Two quick steps, about 30 seconds." },
  { n: "2", t: "We review everything", d: "A real person checks your site, Google and follow-up. No automated junk report." },
  { n: "3", t: "Get your video + report", d: "Within 48 hours, by text and email. Book a call only if you want help fixing it." },
];

const faqs = [
  { q: "Is it really free?", a: "Yes. No card, no contract. You keep the video and report either way." },
  { q: "Will you try to sell me something?", a: "We’ll show you what we’d fix and offer a short call. If you’d rather do it yourself, the report tells you how." },
  { q: "What do you need from me?", a: "Just your website (or business name) and where to send the audit. No logins or passwords." },
  { q: "How long does it take?", a: "Most audits are ready within 48 hours on business days." },
];

export default function FreeAuditPage() {
  return (
    <>
      <Header dark={false} />
      <main>
        {/* HERO + FORM (light, pastel glow behind the glass form) */}
        <section className="relative overflow-hidden bg-white pt-10 pb-16 sm:pt-16 sm:pb-24 md:pt-24 md:pb-32">
          {/* phones: intro → form → extras, so the form is on the first screen or two */}
          <div className="container-x relative grid items-start gap-8 lg:grid-cols-[1.05fr_.95fr] lg:grid-rows-[auto_1fr] lg:gap-x-14 lg:gap-y-0">
            <div className="lg:col-start-1 lg:row-start-1 lg:pt-6">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3.5 py-1.5 text-[13px] text-slate">
                <span className="size-1.5 rounded-full bg-green" aria-hidden="true" /> Free for {site.audience}
              </p>
              <h1 className="h-display mt-5 text-[clamp(38px,5.2vw,70px)] font-black sm:mt-6">
                Find out what’s costing you calls and sales
                <span className="block font-normal text-slate">Free, in 48 hours</span>
              </h1>
              <p className="mt-5 max-w-[52ch] text-[17px] text-slate sm:mt-6 sm:text-lg">
                We check your website or store, Google ranking, Maps profile, ads, reviews and how fast you follow up. Then we send you a
                short video and report with the <Marker>5 fixes that will bring the most calls and sales</Marker>.
              </p>
            </div>
            <div id="start" className="scroll-mt-28 lg:col-start-2 lg:row-span-2 lg:row-start-1">
              <AuditForm />
            </div>
            <div className="lg:col-start-1 lg:row-start-2">
              <ul className="grid gap-3 text-[15px] lg:mt-8">
                {["A personal video walkthrough (about 10 minutes)", "A clear report: what’s working, what’s not, what to fix first", "A side-by-side with your top 3 local competitors"].map((x) => (
                  <li key={x} className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-5 flex-none place-items-center rounded-full bg-ink text-[11px] text-green" aria-hidden="true">✓</span>
                    {x}
                  </li>
                ))}
              </ul>
              <p className="mt-8 flex items-center gap-2 text-sm text-slate">
                <span className="text-amber">★★★★★</span> Rated {site.rating} by business owners on Google
              </p>
            </div>
          </div>
        </section>

        {/* WHAT WE CHECK (paper) */}
        <section className="section bg-paper">
          <div className="container-x">
            <Reveal className="max-w-3xl">
              <h2 className="h-display text-[clamp(38px,5.4vw,64px)]">Six things that decide if the phone rings</h2>
            </Reveal>
            <div className="mt-10 grid gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
              {checks.map((c, i) => (
                <Reveal key={c.title} delay={i * 0.05}>
                  <div className="flex h-full items-start gap-4 rounded-2xl bg-white p-5 sm:block sm:rounded-2xl sm:p-7">
                    <Image src={`/graphics/icons/${c.icon}.webp`} alt="" width={72} height={72} className="size-12 flex-none sm:size-16" />
                    <div>
                      <h3 className="font-display text-lg font-bold sm:mt-6 sm:text-xl">{c.title}</h3>
                      <p className="mt-1 text-[15px] text-slate sm:mt-2 sm:text-base">{c.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SAMPLE REPORT (dark, blue glow) */}
        <section className="relative overflow-hidden bg-ink py-16 text-white sm:py-24 md:py-32">
          <div className="container-x relative grid items-center gap-14 lg:grid-cols-[.9fr_1.1fr]">
            <Reveal>
              <h2 className="h-display text-[clamp(38px,5.4vw,64px)]">A report you can actually understand</h2>
              <p className="mt-5 max-w-[46ch] text-lg text-mist">
                No jargon and no 40-page PDF. Just your score, what’s hurting you, and the order to fix it in, explained on video.
              </p>
              <a href="#start" className="btn-green mt-8">Get my free audit →</a>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="glass-dark rounded-2xl p-6 sm:p-8" aria-label="Example audit report">
                <div className="flex flex-wrap items-center justify-between gap-6">
                  <div>
                    <p className="font-semibold text-[13px] text-white/50">Example report</p>
                    <p className="mt-1 font-display text-2xl font-bold">yourbusiness.com</p>
                  </div>
                  <div className="relative grid size-24 place-items-center">
                    <svg viewBox="0 0 36 36" className="absolute inset-0 -rotate-90" aria-hidden="true">
                      <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="3" />
                      <circle cx="18" cy="18" r="15.5" fill="none" stroke="#f29a00" strokeWidth="3" strokeLinecap="round" strokeDasharray="97.4" strokeDashoffset={97.4 * 0.38} />
                    </svg>
                    <p className="text-center leading-none"><span className="font-display text-3xl font-black">62</span><br /><span className="text-[10px] text-white/50">/ 100</span></p>
                  </div>
                </div>
                <ul className="mt-6 divide-y divide-white/10 border-y border-white/10">
                  {findings.map((f) => (
                    <li key={f.label} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-3.5">
                      <div className="min-w-0">
                        <p className="text-[15px]">{f.label}</p>
                        <p className="text-xs text-white/45">{f.note}</p>
                      </div>
                      <span className={`rounded-full px-3 py-1 font-semibold text-sm ${tone[f.tone as keyof typeof tone]}`}>{f.value}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 rounded-2xl bg-white p-4 text-ink">
                  <p className="font-semibold text-[13px] text-slate">Fix first</p>
                  <p className="mt-1 font-display text-lg font-bold">Turn on instant reply for new leads</p>
                  <p className="text-sm text-slate">Expected: 20–30% more booked calls from the leads you already get.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* HOW IT WORKS (white) */}
        <section className="section bg-white">
          <div className="container-x">
            <Reveal className="mx-auto max-w-3xl text-center">
              <h2 className="h-display text-[clamp(38px,5.4vw,64px)]">Three steps. Zero pressure</h2>
            </Reveal>
            <ol className="mt-14 grid gap-5 md:grid-cols-3">
              {steps.map((s, i) => (
                <Reveal as="li" key={s.n} delay={i * 0.08} className="h-full rounded-2xl bg-paper p-8">
                    <span className="grid size-11 place-items-center rounded-full bg-ink font-semibold text-sm text-white">{s.n}</span>
                    <h3 className="mt-6 font-display text-2xl font-bold">{s.t}</h3>
                    <p className="mt-2 text-slate">{s.d}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ + FINAL CTA (paper) */}
        <section className="section bg-paper">
          <div className="container-x grid gap-12 md:grid-cols-[.8fr_1.2fr]">
            <div>
              <h2 className="h-display text-[clamp(36px,4.6vw,56px)]">Before you ask</h2>
              <a href="#start" className="btn-ink mt-8">Start my free audit →</a>
            </div>
            <dl className="grid gap-4">
              {faqs.map((f) => (
                <div key={f.q} className="rounded-2xl bg-white p-6">
                  <dt className="font-display text-lg font-bold">{f.q}</dt>
                  <dd className="mt-1.5 text-slate">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
