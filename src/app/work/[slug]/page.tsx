import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/home/Header";
import { FinalCta, Footer } from "@/components/home/Closing";
import { Reveal } from "@/components/motion";
import { cases, getCase } from "@/lib/cases";
import { site } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getCase((await params).slug);
  if (!c) return {};
  const title = `${c.industry} case study: ${c.metric} ${c.sub}`;
  return {
    title: `${title} | ${site.name}`,
    description: c.text,
    alternates: { canonical: `/work/${c.slug}` },
    openGraph: { title, description: c.text, images: [c.image] },
  };
}

export default async function CasePage({ params }: Props) {
  const c = getCase((await params).slug);
  if (!c) notFound();
  const idx = cases.findIndex((x) => x.slug === c.slug);
  const next = cases[(idx + 1) % cases.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Our work", item: `${site.url}/work` },
      { "@type": "ListItem", position: 3, name: c.client, item: `${site.url}/work/${c.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header dark={false} />
      <main>
        {/* HERO in the case color */}
        <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24" style={{ background: c.bg }}>
          <div className="container-x relative">
            <Link href="/work" className="text-sm text-ink/60 inline-flex items-center gap-1.5 hover:text-ink">← All case studies</Link>
            <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
              <div>
                <p className="font-semibold text-xs" style={{ color: c.accent }}>{c.industry} · {c.location}</p>
                <h1 className="h-display text-[clamp(52px,7.6vw,104px)] font-black">{c.metric}</h1>
                <p className="mt-3 font-display text-2xl font-medium md:text-3xl">{c.sub}</p>
                <p className="mt-6 max-w-[50ch] text-lg text-ink/70">{c.text}</p>
                {c.example && <p className="mt-5 text-sm text-ink/60">Example case study</p>}
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] shadow-[0_40px_80px_-40px_rgba(0,0,0,.45)]">
                <Image src={c.image} alt={`${c.client} website shown on a laptop and phone`} fill priority sizes="(min-width: 1024px) 640px, 100vw" className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* OVERVIEW + STORY (white) */}
        <section className="section bg-white">
          <div className="container-x grid gap-14 lg:grid-cols-[.75fr_1.25fr]">
            <aside className="lg:sticky lg:top-32 lg:self-start">
              <dl className="grid gap-5 rounded-2xl bg-paper p-7">
                <div><dt className="font-semibold text-[13px] text-slate">Client</dt><dd className="mt-1 font-display text-lg font-bold">{c.client}</dd></div>
                <div><dt className="font-semibold text-[13px] text-slate">Industry</dt><dd className="mt-1">{c.industry}</dd></div>
                <div><dt className="font-semibold text-[13px] text-slate">Location</dt><dd className="mt-1">{c.location}</dd></div>
                <div><dt className="font-semibold text-[13px] text-slate">Timeline</dt><dd className="mt-1">{c.timeline}</dd></div>
                <div>
                  <dt className="font-semibold text-[13px] text-slate">Services</dt>
                  <dd className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                    {c.services.map((s) => (
                      <Link key={s.slug} href={`/services/${s.slug}`} className="rounded-full bg-white px-3 py-1 text-sm hover:border-ink/40">{s.name}</Link>
                    ))}
                  </dd>
                </div>
              </dl>
              <Link href="/free-audit" className="btn-ink mt-5 w-full">Get results like this →</Link>
            </aside>

            <div>
              <Reveal>
                <h2 className="font-display text-2xl font-bold md:text-3xl">The challenge</h2>
                <div className="mt-4 grid gap-4 font-display text-[clamp(22px,2.4vw,30px)] leading-snug text-ink/80">
                  {c.challenge.map((p) => <p key={p}>{p}</p>)}
                </div>
              </Reveal>

              <Reveal className="mt-16">
                <h2 className="font-display text-2xl font-bold md:text-3xl">What we did</h2>
                <ol className="mt-6 grid gap-4">
                  {c.did.map((d, i) => (
                    <li key={d.title} className="flex gap-5 rounded-2xl border border-line p-6">
                      <span className="grid size-10 flex-none place-items-center rounded-full font-semibold text-sm text-white" style={{ background: c.accent }}>{i + 1}</span>
                      <div>
                        <h3 className="font-display text-xl font-bold">{d.title}</h3>
                        <p className="mt-1.5 text-slate">{d.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>
          </div>
        </section>

        {/* RESULTS (dark band, before → after) */}
        <section className="relative overflow-hidden bg-ink py-24 text-white md:py-32">
          <div className="container-x relative">
            <Reveal className="max-w-3xl">
              <h2 className="h-display text-[clamp(36px,5vw,60px)]">Before and after</h2>
            </Reveal>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {c.results.map((r, i) => (
                <Reveal key={r.label} delay={i * 0.06}>
                  <div className="glass-dark h-full rounded-2xl p-6">
                    <p className="text-sm text-mist">{r.label}</p>
                    <p className="mt-4 font-semibold text-sm text-white/40 line-through">{r.before}</p>
                    <p className="font-display text-5xl font-black tracking-[-0.01em]">{r.after}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <figure className="mx-auto mt-16 max-w-3xl text-center">
              <blockquote className="font-display text-[clamp(24px,3vw,36px)] leading-snug font-semibold">“{c.quote.text}”</blockquote>
              <figcaption className="mt-5 text-mist">{c.quote.role}{c.example && " · example quote"}</figcaption>
            </figure>
          </div>
        </section>

        {/* NEXT CASE (paper) */}
        <section className="bg-paper py-20">
          <div className="container-x">
            <h2 className="font-display text-2xl font-bold md:text-3xl">Next case study</h2>
            <Link href={`/work/${next.slug}`} className="group mt-5 flex flex-wrap items-center justify-between gap-6 rounded-2xl p-8 transition-shadow hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,.35)] md:p-10" style={{ background: next.bg }}>
              <div>
                <p className="font-semibold text-xs" style={{ color: next.accent }}>{next.industry}</p>
                <p className="mt-2 font-display text-[clamp(32px,4vw,52px)] leading-none font-black tracking-[-0.01em]">{next.metric}</p>
                <p className="mt-1 text-lg">{next.sub}</p>
              </div>
              <span className="grid size-14 place-items-center rounded-full text-xl text-white transition-transform group-hover:translate-x-1" style={{ background: next.accent }} aria-hidden="true">→</span>
            </Link>
            <p className="mt-6 text-center"><Link href="/work" className="text-sm font-medium underline-offset-4 hover:underline">See all case studies</Link></p>
          </div>
        </section>

        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
