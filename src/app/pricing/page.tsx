import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/home/Header";
import { FinalCta, Footer } from "@/components/home/Closing";
import { Marker, Reveal } from "@/components/motion";
import Plans from "@/components/pricing/Plans";
import { compare, money, plans, pricingFaqs, projects, replaces } from "@/lib/pricing";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Pricing | ${site.name}`,
  description: "Simple monthly plans for websites, SEO, Google Maps, ads and AI automation. No long contracts. Start with a free audit.",
  alternates: { canonical: "/pricing" },
};

function Cell({ v, dark }: { v: boolean | string; dark?: boolean }) {
  if (v === true) return <span className={`inline-grid size-6 place-items-center rounded-full text-xs ${dark ? "bg-green text-[#03150a]" : "bg-ink text-white"}`} aria-label="Included">✓</span>;
  if (v === false) return <span className="text-ink/25" aria-label="Not included">—</span>;
  return <span className="text-sm font-medium">{v}</span>;
}

export default function PricingPage() {
  const toolsTotal = replaces.reduce((a, r) => a + r.cost, 0);
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pricingFaqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <Header dark={false} />
      <main>
        {/* HERO + PLANS (light, pastel glow so the glass cards read) */}
        <section className="relative overflow-hidden bg-white pt-14 pb-24 md:pt-20 md:pb-32">
          <div className="container-x relative">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="h-display text-[clamp(44px,6.4vw,84px)] font-black">
                Simple plans
                <span className="block font-normal text-slate">No long contracts</span>
              </h1>
              <p className="mx-auto mt-5 max-w-[54ch] text-lg text-slate">
                One monthly plan covers your marketing, your lead follow-up and the app that runs it. <Marker>Cancel anytime</Marker>.
              </p>
            </div>
            <div className="mt-12">
              <Plans />
            </div>
          </div>
        </section>

        {/* WHAT YOU REPLACE (dark, blue glow) */}
        <section className="relative overflow-hidden bg-ink py-24 text-white md:py-32">
          <div className="container-x relative grid items-center gap-14 lg:grid-cols-[.9fr_1.1fr]">
            <Reveal>
              <h2 className="h-display text-[clamp(36px,5vw,60px)]">One app instead of eight subscriptions</h2>
              <p className="mt-5 max-w-[46ch] text-lg text-mist">
                Every plan includes the {site.platformName}: calls, texts, email, booking, reviews and payments in one place, with a mobile app.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="glass-dark rounded-2xl p-6 sm:p-8">
                <ul className="divide-y divide-white/10">
                  {replaces.map((r) => (
                    <li key={r.tool} className="flex items-center justify-between gap-4 py-3">
                      <span className="text-white/80 line-through decoration-white/25">{r.tool}</span>
                      <span className="font-semibold text-sm text-white/55 tabular-nums">{money(r.cost)}/mo</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white p-5 text-ink">
                  <div>
                    <p className="font-semibold text-[13px] text-slate">Separate tools</p>
                    <p className="font-display text-3xl font-black line-through decoration-coral/70">{money(toolsTotal)}+/mo</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-[13px] text-slate">With us</p>
                    <p className="font-display text-3xl font-black text-green-ink">Included</p>
                  </div>
                </div>
                <p className="mt-3 text-xs text-white/40">Typical prices for popular standalone tools. Your costs may vary.</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* COMPARE (white) */}
        <section className="section bg-white">
          <div className="container-x">
            <Reveal className="max-w-3xl">
              <h2 className="h-display text-[clamp(36px,5vw,60px)]">See exactly what you get</h2>
            </Reveal>
            <div className="mt-10 overflow-hidden rounded-2xl border border-line sm:mt-12 sm:overflow-x-auto sm:rounded-2xl">
              {/* phones: fixed layout so all three plans fit on screen, no sideways scrolling */}
              <table className="w-full table-fixed border-collapse text-left sm:min-w-[720px] sm:table-auto">
                <thead>
                  <tr className="bg-paper">
                    <th scope="col" className="w-[38%] px-3 py-4 text-xs font-semibold text-slate sm:w-[40%] sm:px-6 sm:py-5">Feature</th>
                    {plans.map((p) => (
                      <th key={p.key} scope="col" className={`px-1 py-4 text-center sm:px-6 sm:py-5 ${p.popular ? "bg-ink text-white" : ""}`}>
                        <span className="font-display text-[15px] font-bold sm:text-lg">{p.name}</span>
                        <span className={`block text-[11px] font-normal sm:text-sm ${p.popular ? "text-mist" : "text-slate"}`}>{money(p.monthly)}/mo</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                {compare.map((g) => (
                  <tbody key={g.group}>
                    <tr>
                      <th colSpan={4} scope="colgroup" className="border-t border-line bg-white px-3 pt-6 pb-2 font-display sm:px-6 sm:pt-7 text-sm font-bold text-green-ink">
                        {g.group}
                      </th>
                    </tr>
                    {g.rows.map((r) => (
                      <tr key={r.label} className="border-t border-line/60">
                        <th scope="row" className="px-3 py-3 text-sm leading-snug font-normal sm:px-6 sm:py-3.5 sm:text-[15px]">{r.label}</th>
                        {r.values.map((v, i) => (
                          <td key={i} className={`px-1 py-3 text-center text-xs sm:px-6 sm:py-3.5 sm:text-base ${plans[i].popular ? "bg-ink/[0.03]" : ""}`}>
                            <Cell v={v} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </section>

        {/* ONE-TIME PROJECTS (paper) */}
        <section className="section bg-paper">
          <div className="container-x">
            <Reveal className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-2xl">
                <h2 className="h-display text-[clamp(36px,5vw,60px)]">Need just one thing done?</h2>
              </div>
              <p className="max-w-[36ch] text-slate">Fixed price, agreed before we start. No monthly plan required.</p>
            </Reveal>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {projects.map((p, i) => (
                <Reveal key={p.name} delay={i * 0.05}>
                  <div className="flex h-full flex-col rounded-2xl bg-white p-6 sm:rounded-2xl sm:p-7">
                    <Image src={`/graphics/icons/${p.icon}.webp`} alt="" width={64} height={64} className="size-12 sm:size-14" />
                    <h3 className="mt-5 font-display text-xl font-bold">{p.name}</h3>
                    <p className="mt-1.5 flex-1 text-[15px] text-slate">{p.text}</p>
                    <p className="mt-5 font-display text-2xl font-black">
                      <span className="text-sm font-normal text-slate">from </span>
                      {money(p.from)}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* GUARANTEE + FAQ (white) */}
        <section className="section bg-white">
          <div className="container-x grid gap-12 lg:grid-cols-[.85fr_1.15fr]">
            <div>
              <div className="rounded-2xl bg-lime p-8">
                <p className="font-semibold text-xs text-green-ink">Our promise</p>
                {/* TODO: confirm guarantee wording */}
                <p className="mt-3 font-display text-3xl leading-tight font-extrabold">No contracts. No hidden fees. You own everything we build.</p>
                <p className="mt-3 text-ink/70">If we’re not the right fit, you leave with your website, data and content. No hard feelings.</p>
              </div>
              <Link href="/free-audit" className="btn-ink mt-6">Start with a free audit →</Link>
            </div>
            <div>
              <h2 className="font-display text-3xl font-bold">Pricing questions</h2>
              <div className="mt-6 divide-y divide-line border-y border-line">
                {pricingFaqs.map((f) => (
                  <details key={f.q} className="group py-5 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-lg font-semibold">
                      {f.q}
                      <span className="grid size-8 flex-none place-items-center rounded-full border border-line transition-transform duration-300 group-open:rotate-45 group-open:bg-ink group-open:text-white" aria-hidden="true">+</span>
                    </summary>
                    <p className="max-w-[60ch] pt-3 text-slate">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
