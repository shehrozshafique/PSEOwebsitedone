import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/home/Header";
import { FinalCta, Footer } from "@/components/home/Closing";
import { Reveal } from "@/components/motion";
import GrowthChart from "@/components/work/GrowthChart";
import { PostCard } from "@/components/blog/parts";
import { cases, getCase } from "@/lib/cases";
import { posts } from "@/lib/blog";
import { servicesData } from "@/lib/services";
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
  const serviceSlugs = c.services.map((s) => s.slug);
  const services = serviceSlugs.map((s) => servicesData.find((x) => x.slug === s)).filter((s): s is NonNullable<typeof s> => Boolean(s));
  const guides = posts.filter((p) => p.services.some((s) => serviceSlugs.includes(s))).slice(0, 3);
  const before = c.chart.values.slice(0, c.chart.launch);
  const lastVal = c.chart.values[c.chart.values.length - 1];

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
        {/* HERO: the headline result first */}
        <section className="pt-8 pb-12 md:pt-14 md:pb-16" style={{ background: c.bg }}>
          <div className="container-x">
            <Link href="/work" className="text-sm text-ink/60 hover:text-ink">← All case studies</Link>
            <h1 className="mt-6 max-w-[18ch] font-display text-[clamp(38px,5.8vw,80px)] leading-[1.02] font-extrabold">
              {c.client}: <span style={{ color: c.accent }}>{c.metric}</span> {c.sub}
            </h1>
            <p className="mt-6 max-w-[58ch] text-[17px] text-ink/75 md:text-xl">{c.text}</p>

            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-ink/10 pt-6 text-sm md:grid-cols-4">
              <div><dt className="text-ink/55">Industry</dt><dd className="mt-1 font-semibold">{c.industry}</dd></div>
              <div><dt className="text-ink/55">Location</dt><dd className="mt-1 font-semibold">{c.location}</dd></div>
              <div className="col-span-2 md:col-span-1"><dt className="text-ink/55">Timeline</dt><dd className="mt-1 font-semibold">{c.timeline}</dd></div>
              <div className="col-span-2 md:col-span-1">
                <dt className="text-ink/55">Services</dt>
                <dd className="mt-1 font-semibold">
                  {c.services.map((s, i) => (
                    <span key={s.slug}>{i > 0 && ", "}<Link href={`/services/${s.slug}`} className="underline decoration-ink/20 underline-offset-4 hover:decoration-ink">{s.name}</Link></span>
                  ))}
                </dd>
              </div>
            </dl>
            {c.example && <p className="mt-6 text-sm text-ink/60">Example case study. Figures are illustrative until real client results are added.</p>}
          </div>
        </section>

        <div style={{ background: `linear-gradient(${c.bg} 50%, #fff 50%)` }}>
          <div className="container-x">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] md:aspect-[16/7]">
              <Image src={c.image} alt={`${c.client} website shown on a laptop and phone`} fill priority sizes="(min-width: 1200px) 1200px, 100vw" className="object-cover" />
            </div>
          </div>
        </div>

        {/* KEY RESULTS */}
        <section className="bg-white pt-16 pb-6 md:pt-24">
          <div className="container-x">
            <h2 className="font-display text-2xl font-bold md:text-3xl">The results</h2>
            <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
              {c.results.map((r) => (
                <Reveal as="li" key={r.label}>
                  <p className="font-display text-[clamp(40px,5vw,64px)] leading-none font-black">{r.after}</p>
                  <p className="mt-3 text-[15px] font-medium">{r.label}</p>
                  <p className="mt-1 text-sm text-slate">from {r.before}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* GROWTH CHART */}
        <section className="bg-white pt-14 pb-20 md:pt-20 md:pb-28">
          <div className="container-x">
            <div className="rounded-[20px] bg-paper p-5 sm:p-8 md:p-10">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-bold md:text-3xl">{c.chart.title}</h2>
                  <p className="mt-1 text-[15px] text-slate">
                    Averaged {c.chart.prefix}{Math.round(before.reduce((a, b) => a + b, 0) / before.length).toLocaleString("en-US")}{c.chart.suffix} before we started,{" "}
                    {c.chart.prefix}{lastVal.toLocaleString("en-US")}{c.chart.suffix} in {c.chart.months[c.chart.months.length - 1]}
                  </p>
                </div>
              </div>
              <div className="mt-8">
                <GrowthChart {...c.chart} color={c.accent} />
              </div>
            </div>
          </div>
        </section>

        {/* STORY: challenge, then the approach as a timeline */}
        <section className="section bg-white pt-0 md:pt-0">
          <div className="container-x grid gap-16 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
            <Reveal>
              <h2 className="font-display text-2xl font-bold md:text-3xl">The challenge</h2>
              <div className="mt-5 grid gap-4 text-[17px] leading-relaxed text-ink/80 md:text-lg">
                {c.challenge.map((p) => <p key={p}>{p}</p>)}
              </div>
            </Reveal>
            <Reveal>
              <h2 className="font-display text-2xl font-bold md:text-3xl">What we did</h2>
              <ol className="relative mt-6 grid gap-8 border-l-2 pl-7" style={{ borderColor: `${c.accent}33` }}>
                {c.did.map((d) => (
                  <li key={d.title} className="relative">
                    <span className="absolute top-2 -left-[35px] size-3 rounded-full ring-4 ring-white" style={{ background: c.accent }} aria-hidden="true" />
                    <h3 className="font-display text-xl font-bold">{d.title}</h3>
                    <p className="mt-1.5 text-[16px] leading-relaxed text-slate">{d.text}</p>
                    <p className="mt-2 text-sm font-medium" style={{ color: c.accent }}>{d.when}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>

        {/* BEFORE / AFTER + QUOTE */}
        <section className="bg-ink py-16 text-white sm:py-24 md:py-28">
          <div className="container-x grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
            <Reveal>
              <h2 className="h-display text-[clamp(32px,4.4vw,52px)]">Before and after</h2>
              <table className="mt-8 w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-white/20 text-sm text-mist">
                    <th scope="col" className="py-3 pr-4 font-normal">Metric</th>
                    <th scope="col" className="py-3 pr-4 font-normal">Before</th>
                    <th scope="col" className="py-3 font-normal">After</th>
                  </tr>
                </thead>
                <tbody>
                  {c.results.map((r) => (
                    <tr key={r.label} className="border-b border-white/10">
                      <th scope="row" className="py-4 pr-4 font-normal">{r.label}</th>
                      <td className="py-4 pr-4 text-mist">{r.before}</td>
                      <td className="py-4 font-display text-xl font-bold text-green-soft">{r.after}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Reveal>
            <Reveal>
              <figure>
                <blockquote className="font-display text-[clamp(24px,2.8vw,34px)] leading-snug font-semibold">“{c.quote.text}”</blockquote>
                <figcaption className="mt-6 text-mist">{c.quote.role}{c.example && " · example quote"}</figcaption>
              </figure>
            </Reveal>
          </div>
        </section>

        {/* SERVICES USED */}
        <section className="bg-white py-16 md:py-24">
          <div className="container-x">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="font-display text-2xl font-bold md:text-3xl">What made this work</h2>
              <Link href="/free-audit" className="btn-ink">Get results like this →</Link>
            </div>
            <ul className="mt-8 grid gap-3 md:grid-cols-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="group flex h-full items-center gap-4 rounded-2xl bg-paper p-5 transition-transform hover:-translate-y-0.5">
                    <Image src={`/graphics/icons/${s.icon}.webp`} alt="" width={56} height={56} className="size-12 flex-none" />
                    <span className="min-w-0">
                      <span className="block font-display text-lg font-bold">{s.name}</span>
                      <span className="block text-sm text-slate">See the service</span>
                    </span>
                    <span aria-hidden="true" className="ml-auto transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* GUIDES (internal links to the blog) */}
        {guides.length > 0 && (
          <section className="bg-paper py-16 md:py-24">
            <div className="container-x">
              <h2 className="font-display text-2xl font-bold md:text-3xl">How we do it, in our own guides</h2>
              <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {guides.map((p) => <PostCard key={p.slug} post={p} />)}
              </div>
            </div>
          </section>
        )}

        {/* NEXT CASE */}
        <section className="bg-white py-16 md:py-20">
          <div className="container-x">
            <Link href={`/work/${next.slug}`} className="group flex flex-wrap items-center justify-between gap-6 rounded-[20px] p-7 transition-shadow hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,.35)] md:p-10" style={{ background: next.bg }}>
              <div>
                <p className="text-sm text-ink/60">Next case study</p>
                <p className="mt-2 font-display text-[clamp(28px,3.6vw,46px)] leading-tight font-extrabold">{next.client}: {next.metric}</p>
                <p className="mt-1 text-lg">{next.sub}</p>
              </div>
              <span className="grid size-14 place-items-center rounded-full text-xl text-white transition-transform group-hover:translate-x-1" style={{ background: next.accent }} aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
