import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/home/Header";
import { FinalCta, Footer } from "@/components/home/Closing";
import { Reveal } from "@/components/motion";
import { BillingProvider, BillingToggle, EmailSavings, OfferPlans, StarterBundle } from "@/components/pricing/Billing";
import { offerFor } from "@/lib/offers";
import { cases, site } from "@/lib/site";
import { getService, servicesData } from "@/lib/services";

export const dynamicParams = false;
export function generateStaticParams() {
  return servicesData.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  return {
    title: `${s.metaTitle} | ${site.name}`,
    description: s.metaDescription,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title: s.metaTitle, description: s.metaDescription, type: "website" },
  };
}

export default async function ServicePage({ params }: Props) {
  const s = getService((await params).slug);
  if (!s) notFound();
  const c = cases[s.caseIndex] ?? cases[0];
  const plans = offerFor(s.slug);
  const related = s.related.map(getService).filter(Boolean) as NonNullable<ReturnType<typeof getService>>[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: s.name,
        serviceType: s.name,
        description: s.metaDescription,
        provider: { "@type": "Organization", name: site.name, url: site.url },
        areaServed: site.areaServed,
        url: `${site.url}/services/${s.slug}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Services", item: `${site.url}/#services` },
          { "@type": "ListItem", position: 3, name: s.name, item: `${site.url}/services/${s.slug}` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: s.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main style={{ ["--c" as string]: s.color }}>
        {/* HERO: dark with the green grid (matches the homepage), 3D service icon, key facts */}
        <section className="relative -mt-[88px] overflow-hidden bg-ink pt-[128px] pb-14 text-white sm:pt-[150px] md:pb-20">
          <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0" />
          <div className="container-x relative">
            <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_.7fr]">
              <div>
                <h1 className="h-display text-[clamp(40px,5.8vw,78px)] font-black">
                  {s.headline}
                  <span className="block font-normal text-green-soft">{s.headlineLite}</span>
                </h1>
                <p className="mt-5 max-w-[56ch] text-[17px] text-mist sm:mt-6 sm:text-lg">{s.intro}</p>
                <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
                  <Link href="/free-audit" className="btn-green">Get my free audit →</Link>
                  <a href="#included" className="btn-outline-light">What’s included</a>
                </div>
                <p className="mt-5 text-[13px] text-white/55">
                  <span className="text-amber" aria-hidden="true">★★★★★</span> <b className="font-semibold text-white">{site.rating}</b> on Google · Free audit in 48 hours
                </p>
              </div>
              <div className="relative mx-auto hidden aspect-square w-full max-w-[380px] place-items-center sm:grid">
                <Image src={`/graphics/icons/${s.icon}.webp`} alt="" width={480} height={480} priority className="animate-float relative w-[80%] drop-shadow-[0_40px_50px_rgba(0,0,0,.55)]" />
              </div>
            </div>
            <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-white/10 pt-8 md:mt-16">
              {s.facts.map((f) => (
                <div key={f.label}>
                  <dt className="sr-only">{f.label}</dt>
                  <dd className="font-display text-[clamp(26px,3.4vw,40px)] leading-none font-black">{f.value}</dd>
                  <dd className="mt-2 text-[13px] leading-snug text-mist sm:text-sm">{f.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* PROBLEMS (paper) */}
        <section className="section bg-paper">
          <div className="container-x">
            <Reveal className="max-w-3xl">
              <h2 className="h-display text-[clamp(36px,5vw,60px)]">If this is you, you’re losing customers every week</h2>
            </Reveal>
            <div className="mt-10 grid gap-3 sm:gap-4 md:mt-12 md:grid-cols-3">
              {s.pains.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.06}>
                  <div className="flex h-full items-start gap-4 rounded-2xl bg-white p-5 md:block md:rounded-2xl md:p-7">
                    <span className="grid size-10 flex-none place-items-center rounded-full bg-coral/12 text-sm font-semibold text-coral" aria-hidden="true">✕</span>
                    <div>
                      <h3 className="font-display text-lg font-bold md:mt-5 md:text-xl">{p.title}</h3>
                      <p className="mt-1 text-[15px] text-slate md:mt-2 md:text-base">{p.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* WHAT'S INCLUDED (white) */}
        <section id="included" className="section scroll-mt-24 bg-white">
          <div className="container-x">
            <Reveal className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-2xl">
                <h2 className="h-display text-[clamp(36px,5vw,60px)]">Everything done for you</h2>
              </div>
              <p className="max-w-[36ch] text-slate">No hidden extras. Exact scope and price are confirmed after your free audit.</p>
            </Reveal>
            <ul className="mt-10 grid gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
              {s.included.map((it, i) => (
                <Reveal as="li" key={it.title} delay={(i % 4) * 0.05} className="group flex h-full items-start gap-4 rounded-2xl bg-paper p-5 transition-colors hover:bg-white sm:block sm:rounded-2xl sm:p-6">
                    <span className="grid size-8 flex-none place-items-center rounded-full text-sm text-white" style={{ background: s.color }} aria-hidden="true">✓</span>
                    <div>
                      <h3 className="font-display text-lg font-bold sm:mt-5">{it.title}</h3>
                      <p className="mt-1 text-[15px] text-slate sm:mt-1.5">{it.text}</p>
                    </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* PLANS & PRICING */}
        {plans.length > 0 && (
          <section id="pricing" className="section scroll-mt-24 bg-paper">
            <BillingProvider>
              <div className="container-x">
                <Reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                  <div className="max-w-2xl">
                    <h2 className="h-display text-[clamp(36px,5vw,60px)]">Plans & pricing</h2>
                    <p className="mt-3 text-slate">Monthly plans: 6-month minimum, then month to month. Pay yearly and save 12%.</p>
                  </div>
                  {plans.some((o) => o.tiers.some((t) => t.billing === "monthly")) && <BillingToggle />}
                </Reveal>
                <div className="mt-10 grid gap-12">
                  {plans.map((o) => (
                    <div key={o.key}>
                      {plans.length > 1 && <h3 className="mb-5 font-display text-2xl font-bold">{o.title}</h3>}
                      <OfferPlans offer={o} />
                      {o.key === "email-platform" && (
                        <div className="mt-6">
                          <EmailSavings />
                        </div>
                      )}
                    </div>
                  ))}
                  {["website-design", "reputation-management", "email-marketing"].includes(s.slug) && <StarterBundle compact />}
                </div>
              </div>
            </BillingProvider>
          </section>
        )}

        {/* PROCESS (dark band, glow in the service color) */}
        <section className="relative overflow-hidden bg-ink py-16 text-white sm:py-24 md:py-32">
          <div className="container-x relative">
            <Reveal className="max-w-3xl">
              <h2 className="h-display text-[clamp(36px,5vw,60px)]">Clear steps. No surprises</h2>
            </Reveal>
            <ol className="mt-10 grid gap-3 sm:gap-4 md:mt-14 md:grid-cols-4">
              {s.steps.map((st, i) => (
                <Reveal as="li" key={st.title} delay={i * 0.07} className="glass-dark h-full rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                      <span className="grid size-10 place-items-center rounded-full bg-white font-semibold text-sm text-ink">{i + 1}</span>
                      <span className="font-semibold text-xs text-white/55">{st.time}</span>
                    </div>
                    <h3 className="mt-4 font-display text-xl font-bold md:mt-6">{st.title}</h3>
                    <p className="mt-2 text-[15px] text-mist">{st.text}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* RESULT (paper, reuse case study) */}
        <section className="section bg-paper">
          <div className="container-x">
            <Reveal>
              <article className="grid overflow-hidden rounded-[20px] md:grid-cols-[1fr_1.05fr]" style={{ background: c.bg }}>
                <div className="flex flex-col justify-center gap-4 p-8 md:p-12">
                  <p className="font-semibold text-xs" style={{ color: c.accent }}>Client result · {c.industry}</p>
                  <p className="font-display text-[clamp(40px,5vw,64px)] leading-none font-black tracking-[-0.01em]">{c.metric}</p>
                  <p className="text-lg font-medium">{c.sub}</p>
                  <p className="max-w-[46ch] text-ink/70">{c.text}</p>
                  <Link href={`/work/${c.slug}`} className="btn w-full text-white sm:w-auto sm:self-start" style={{ background: c.accent }}>Read the case study →</Link>
                  {c.example && <p className="text-xs text-ink/50">Example case study until real client work is added.</p>}
                </div>
                <div className="relative m-3 min-h-[280px] overflow-hidden rounded-2xl md:m-4">
                  <Image src={c.image} alt={`${c.industry} website shown on a laptop and phone`} fill sizes="(min-width: 768px) 600px, 100vw" className="object-cover" />
                </div>
              </article>
            </Reveal>
          </div>
        </section>

        {/* FAQ (white) */}
        <section className="section bg-white">
          <div className="container-x grid gap-12 md:grid-cols-[.8fr_1.2fr]">
            <div>
              <h2 className="h-display text-[clamp(34px,4.4vw,54px)]">{s.name} questions</h2>
            </div>
            <div className="divide-y divide-line border-y border-line">
              {s.faqs.map((f) => (
                <details key={f.q} className="group py-5 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-xl font-semibold">
                    {f.q}
                    <span className="grid size-8 flex-none place-items-center rounded-full border border-line transition-transform duration-300 group-open:rotate-45 group-open:bg-ink group-open:text-white" aria-hidden="true">+</span>
                  </summary>
                  <p className="max-w-[60ch] pt-3 text-slate">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* RELATED (paper) */}
        <section className="bg-paper py-20">
          <div className="container-x">
            <h2 className="font-display text-2xl font-bold md:text-3xl">Works even better with</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} href={`/services/${r.slug}`} className="group flex items-center gap-5 rounded-2xl bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,.35)]">
                  <Image src={`/graphics/icons/${r.icon}.webp`} alt="" width={72} height={72} className="size-16 flex-none transition-transform group-hover:rotate-6" />
                  <div className="min-w-0">
                    <p className="font-display text-lg font-bold">{r.name}</p>
                    <p className="truncate text-sm text-slate">{r.headline}</p>
                  </div>
                  <span aria-hidden="true" className="ml-auto text-xl transition-transform group-hover:translate-x-1">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
