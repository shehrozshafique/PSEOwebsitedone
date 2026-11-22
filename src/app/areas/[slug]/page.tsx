import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/home/Header";
import { FinalCta, Footer } from "@/components/home/Closing";
import GeoGrid from "@/components/areas/GeoGrid";
import { Reveal } from "@/components/motion";
import { areas, getArea } from "@/lib/areas";
import { getCase, cases } from "@/lib/cases";
import { servicesData } from "@/lib/services";
import { site } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = getArea((await params).slug);
  if (!a) return {};
  const title = `Websites, SEO & Google Maps in ${a.city}, ${a.state}`;
  return {
    title: `${title} | ${site.name}`,
    description: `Get more calls in ${a.city}: websites, local SEO, Google Maps ranking, ads and instant lead follow-up for ${a.city} businesses. Free audit.`,
    alternates: { canonical: `/areas/${a.slug}` },
    // Example cities stay out of Google until real local content replaces them.
    robots: a.example ? { index: false, follow: true } : undefined,
  };
}

export default async function AreaPage({ params }: Props) {
  const a = getArea((await params).slug);
  if (!a) notFound();
  const c = (a.caseSlug && getCase(a.caseSlug)) || cases[0];
  const place = `${a.city}, ${a.state}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        name: `${site.name} · ${place}`,
        url: `${site.url}/areas/${a.slug}`,
        telephone: site.phone,
        areaServed: [{ "@type": "City", name: place }, ...a.nearby.map((n) => ({ "@type": "City", name: `${n}, ${a.state}` }))],
        serviceType: servicesData.map((s) => s.name),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Areas we serve", item: `${site.url}/areas` },
          { "@type": "ListItem", position: 3, name: place, item: `${site.url}/areas/${a.slug}` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: a.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header dark={false} />
      <main>
        {/* HERO (light) */}
        <section className="relative overflow-hidden bg-white pt-12 pb-20 md:pt-16 md:pb-28">
          <div className="container-x relative">
            <Link href="/areas" className="text-sm text-slate inline-flex items-center gap-1.5 hover:text-ink">← All areas</Link>
            <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1.15fr_.85fr]">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3.5 py-1.5 text-[13px] text-slate">
                  <svg viewBox="0 0 24 24" className="size-3.5 text-amber" fill="currentColor" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5.3 7 13 7 13s7-7.7 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" /></svg>
                  Serving {place} and nearby
                </p>
                <h1 className="h-display mt-6 text-[clamp(38px,4.8vw,64px)] font-black">
                  More calls from {a.city} customers.
                  <span className="mt-2 block text-[0.62em] leading-tight font-normal text-slate">Websites, SEO &amp; Google Maps for {a.city} businesses</span>
                </h1>
                <p className="mt-6 max-w-[56ch] text-lg text-slate">{a.intro}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/free-audit" className="btn-green">Get my free {a.city} audit →</Link>
                  <a href="#services" className="btn-outline">What we do in {a.city}</a>
                </div>
                {a.example && <p className="mt-4 text-xs text-slate">Example location page (hidden from Google until real local content is added).</p>}
              </div>
              <GeoGrid city={a.city} />
            </div>
          </div>
        </section>

        {/* SERVICES IN CITY (paper) */}
        <section id="services" className="section scroll-mt-24 bg-paper">
          <div className="container-x">
            <Reveal className="max-w-3xl">
              <h2 className="h-display text-[clamp(36px,5vw,60px)]">Everything a {a.city} business needs to grow</h2>
            </Reveal>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {servicesData.map((s, i) => (
                <Reveal key={s.slug} delay={(i % 3) * 0.05}>
                  <Link href={`/services/${s.slug}`} className="group flex h-full items-start gap-5 rounded-2xl bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,.35)]">
                    <Image src={`/graphics/icons/${s.icon}.webp`} alt="" width={64} height={64} className="size-14 flex-none transition-transform group-hover:rotate-6" />
                    <div className="min-w-0">
                      <h3 className="font-display text-lg font-bold">{s.name} in {a.city}</h3>
                      <p className="mt-1 text-[15px] text-slate">{s.headline}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* LOCAL INSIGHTS (dark) */}
        <section className="relative overflow-hidden bg-ink py-24 text-white md:py-32">
          <div className="container-x relative">
            <Reveal className="max-w-3xl">
              <h2 className="h-display text-[clamp(36px,5vw,60px)]">Winning locally takes a local plan</h2>
            </Reveal>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {a.insights.map((x, i) => (
                <Reveal key={x.title} delay={i * 0.06}>
                  <div className="glass-dark h-full rounded-2xl p-7">
                    <h3 className="mt-4 font-display text-xl font-bold">{x.title}</h3>
                    <p className="mt-2 text-mist">{x.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* NEIGHBORHOODS + CASE (white) */}
        <section className="section bg-white">
          <div className="container-x grid gap-12 lg:grid-cols-[.9fr_1.1fr]">
            <Reveal>
              <h2 className="h-display text-[clamp(32px,4.4vw,52px)]">All around {a.city}</h2>
              <p className="mt-5 font-semibold text-[13px] text-slate">Neighborhoods</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {a.neighborhoods.map((n) => <li key={n} className="rounded-full bg-paper px-3.5 py-1.5 text-sm">{n}</li>)}
              </ul>
              <p className="mt-6 font-semibold text-[13px] text-slate">Nearby cities</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {a.nearby.map((n) => <li key={n} className="rounded-full border border-line px-3.5 py-1.5 text-sm">{n}, {a.state}</li>)}
              </ul>
              <a
                href={`https://www.google.com/maps/search/${encodeURIComponent(place)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-green-ink underline underline-offset-4"
              >
                View {a.city} on Google Maps ↗
              </a>
            </Reveal>
            <Reveal delay={0.1}>
              <Link href={`/work/${c.slug}`} className="group block overflow-hidden rounded-[20px] border border-black/5" style={{ background: c.bg }}>
                <div className="relative aspect-[16/10]">
                  <Image src={c.image} alt={`${c.industry} website shown on a laptop and phone`} fill sizes="(min-width: 1024px) 640px, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                </div>
                <div className="p-7">
                  <p className="font-semibold text-xs" style={{ color: c.accent }}>Client result · {c.industry}</p>
                  <p className="mt-2 font-display text-4xl font-black tracking-[-0.01em]">{c.metric} <span className="text-lg font-medium">{c.sub}</span></p>
                  <p className="mt-2 text-ink/70">{c.text}</p>
                  {c.example && <p className="mt-2 text-xs text-ink/50">Example case study</p>}
                </div>
              </Link>
            </Reveal>
          </div>
        </section>

        {/* LOCAL FAQ (paper) */}
        <section className="section bg-paper">
          <div className="container-x grid gap-12 md:grid-cols-[.8fr_1.2fr]">
            <div>
              <h2 className="h-display text-[clamp(32px,4.4vw,52px)]">{a.city} questions</h2>
            </div>
            <div className="divide-y divide-line border-y border-line">
              {a.faqs.map((f) => (
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
        </section>

        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
