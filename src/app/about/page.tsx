import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/home/Header";
import { FinalCta, Footer } from "@/components/home/Closing";
import { Marker, Reveal } from "@/components/motion";
import { founder, story, team, values, versus } from "@/lib/about";
import { site, stages } from "@/lib/site";

export const metadata: Metadata = {
  title: `About Us | ${site.name}`,
  description: `${site.name} helps ${site.audience} get found, get leads and close them fast, with one connected system and plain-English results.`,
  alternates: { canonical: "/about" },
};

const initials = (n: string) => n.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

export default function AboutPage() {
  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    areaServed: site.areaServed,
    logo: `${site.url}/brand/logo-mark-512.png`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
      <Header dark={false} />
      <main>
        {/* HERO (light) */}
        <section className="relative overflow-hidden bg-white pt-14 pb-20 md:pt-20 md:pb-28">
          <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1.2fr_.8fr]">
            <div>
              <h1 className="h-display text-[clamp(44px,6.4vw,84px)] font-black">
                We build the system
                <span className="block font-normal text-slate">that grows local businesses</span>
              </h1>
              <p className="mt-6 max-w-[54ch] text-lg text-slate">
                {site.name} helps {site.audience} <Marker>get found, get leads and close them fast</Marker>, then automates the slow, manual work so owners can focus on the job.
              </p>
            </div>
            <div className="relative mx-auto grid aspect-square w-full max-w-[420px] place-items-center">
              <Image src="/graphics/loop.webp" alt="" width={900} height={600} className="animate-float relative w-full drop-shadow-[0_30px_40px_rgba(0,0,0,.18)]" />
            </div>
          </div>
        </section>

        {/* STORY + FOUNDER (paper) */}
        <section className="section bg-paper">
          <div className="container-x grid gap-14 lg:grid-cols-[1.2fr_.8fr]">
            <Reveal>
              <h2 className="h-display text-[clamp(34px,4.6vw,56px)]">{story.title}</h2>
              <div className="mt-8 grid max-w-[62ch] gap-5 text-lg text-slate">
                {story.paragraphs.map((p) => <p key={p}>{p}</p>)}
              </div>
            </Reveal>
            <Reveal delay={0.1} className="lg:pt-16">
              <figure className="overflow-hidden rounded-[20px] bg-ink text-white">
                <div className="relative aspect-[4/5]">
                  {founder.photo ? (
                    <Image src={founder.photo} alt={`${founder.name}, ${founder.role}`} fill sizes="(min-width: 1024px) 420px, 100vw" className="object-cover" />
                  ) : (
                    <>
                      <span className="absolute inset-0 grid place-items-center font-display text-8xl font-black text-white/15" aria-hidden="true">{initials(founder.name)}</span>
                    </>
                  )}
                </div>
                <figcaption className="p-6">
                  <p className="font-display text-xl font-bold">{founder.name}</p>
                  <p className="text-sm text-mist">{founder.role}</p>
                  <p className="mt-3 text-sm text-white/70">{founder.note}</p>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </section>

        {/* VALUES (white) */}
        <section className="section bg-white">
          <div className="container-x">
            <Reveal className="max-w-3xl">
              <h2 className="h-display text-[clamp(36px,5vw,60px)]">Four rules we work by</h2>
            </Reveal>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((v, i) => (
                <Reveal key={v.title} delay={i * 0.06}>
                  <div className="relative h-full overflow-hidden rounded-2xl bg-paper p-7">
                    <h3 className="mt-6 font-display text-2xl font-bold">{v.title}</h3>
                    <p className="mt-2 text-slate">{v.text}</p>
                                      </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* US VS TYPICAL AGENCY (dark) */}
        <section className="relative overflow-hidden bg-ink py-16 text-white sm:py-24 md:py-32">
          <div className="container-x relative">
            <Reveal className="max-w-3xl">
              <h2 className="h-display text-[clamp(36px,5vw,60px)]">Not your typical agency</h2>
            </Reveal>
            {/* phones: one card per topic instead of a wide table */}
            <ul className="mt-10 grid gap-3 sm:hidden">
              {versus.map((r) => (
                <li key={r.topic} className="glass-dark rounded-[20px] p-5">
                  <p className="font-display text-lg font-bold">{r.topic}</p>
                  <p className="mt-2 text-[15px] text-white/45 line-through decoration-white/25">{r.them}</p>
                  <p className="mt-1.5 flex gap-2 text-[15px]"><span className="text-green-soft" aria-hidden="true">✓</span>{r.us}</p>
                </li>
              ))}
            </ul>
            <div className="glass-dark mt-12 hidden overflow-x-auto rounded-2xl sm:block">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th scope="col" className="px-6 py-5 font-semibold text-xs text-white/50">&nbsp;</th>
                    <th scope="col" className="px-6 py-5 font-semibold text-xs text-white/50">Typical agency</th>
                    <th scope="col" className="px-6 py-5 font-display text-lg font-bold text-green-soft">{site.name}</th>
                  </tr>
                </thead>
                <tbody>
                  {versus.map((r) => (
                    <tr key={r.topic} className="border-b border-white/10 last:border-0">
                      <th scope="row" className="px-6 py-4 font-medium">{r.topic}</th>
                      <td className="px-6 py-4 text-white/45 line-through decoration-white/25">{r.them}</td>
                      <td className="px-6 py-4"><span className="mr-2 text-green-soft" aria-hidden="true">✓</span>{r.us}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* HOW WE HELP: the 5 stages (white) */}
        <section className="section bg-white">
          <div className="container-x">
            <Reveal className="max-w-3xl">
              <h2 className="h-display text-[clamp(36px,5vw,60px)]">One growth system, five stages</h2>
            </Reveal>
            <ol className="mt-12 grid gap-3 md:grid-cols-5">
              {stages.map((s, i) => (
                <Reveal as="li" key={s.key} delay={i * 0.05} className="h-full rounded-2xl border border-line p-6" >
                    <h3 className="mt-3 font-display text-xl font-bold">{s.label}</h3>
                    <p className="mt-2 text-[15px] text-slate">{s.title}</p>
                </Reveal>
              ))}
            </ol>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/#services" className="btn-ink">See our services</Link>
              <Link href="/work" className="btn-outline">See client results</Link>
            </div>
          </div>
        </section>

        {/* TEAM (paper) */}
        <section className="section bg-paper">
          <div className="container-x">
            <Reveal className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-2xl">
                <h2 className="h-display text-[clamp(36px,5vw,60px)]">Specialists, not generalists</h2>
              </div>
              <p className="max-w-[38ch] text-slate">You talk to the people doing the work, and each part of your system has an expert behind it.</p>
            </Reveal>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((m, i) => (
                <Reveal key={m.role} delay={i * 0.05}>
                  <div className="h-full overflow-hidden rounded-2xl bg-white">
                    <div className="relative grid aspect-square place-items-center" style={{ background: `${m.color}22` }}>
                      {m.photo ? (
                        <Image src={m.photo} alt={`${m.name}, ${m.role}`} fill sizes="(min-width: 1024px) 280px, 50vw" className="object-cover" />
                      ) : (
                        <Image src={`/graphics/icons/${m.icon}.webp`} alt="" width={240} height={240} className="w-1/2 drop-shadow-[0_20px_24px_rgba(0,0,0,.15)]" />
                      )}
                    </div>
                    <div className="p-5">
                      <p className="font-display text-lg font-bold">{m.name}</p>
                      <p className="text-sm text-slate">{m.role}</p>
                    </div>
                  </div>
                </Reveal>
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
