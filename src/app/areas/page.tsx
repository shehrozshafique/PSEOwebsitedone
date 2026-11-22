import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/home/Header";
import { FinalCta, Footer } from "@/components/home/Closing";
import { Marker, Reveal } from "@/components/motion";
import { areas } from "@/lib/areas";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Areas We Serve | ${site.name}`,
  description: `${site.name} helps ${site.audience} get more calls with websites, SEO, Google Maps and lead follow-up. See the cities we serve.`,
  alternates: { canonical: "/areas" },
};

export default function AreasPage() {
  return (
    <>
      <Header dark={false} />
      <main>
        <section className="relative overflow-hidden bg-white pt-14 pb-24 md:pt-20 md:pb-32">
          <div className="container-x relative">
            <div className="grid items-end gap-10 lg:grid-cols-[1.2fr_.8fr]">
              <div>
                <h1 className="h-display text-[clamp(44px,6.4vw,84px)] font-black">
                  Local results,
                  <span className="block font-normal text-slate">wherever you work</span>
                </h1>
                <p className="mt-5 max-w-[54ch] text-lg text-slate">
                  Every city is its own competition on Google. We build <Marker>a local plan for each area</Marker> you serve, then track your Maps position across it.
                </p>
              </div>
              <Image src="/graphics/icons/local.webp" alt="" width={300} height={300} className="animate-float mx-auto hidden w-56 drop-shadow-[0_30px_40px_rgba(0,0,0,.18)] lg:block" />
            </div>

            <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {areas.map((a, i) => (
                <Reveal as="li" key={a.slug} delay={i * 0.05}>
                    <Link
                      href={`/areas/${a.slug}`}
                      className="glass-light group flex h-full flex-col rounded-2xl p-7 transition-all hover:-translate-y-0.5 hover:shadow-[0_24px_50px_-26px_rgba(0,0,0,.35)]"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-semibold text-xs text-slate">{a.state}</p>
                          <h2 className="mt-1 font-display text-3xl font-extrabold">{a.city}</h2>
                        </div>
                        <span className="grid size-11 place-items-center rounded-full bg-ink text-white transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                      </div>
                      <p className="mt-4 text-[15px] text-slate">Also serving {a.nearby.slice(0, 4).join(", ")} and more.</p>
                      {a.example && <p className="mt-auto pt-4 text-xs text-slate">Example city</p>}
                    </Link>
                </Reveal>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-ink p-7 text-white md:p-9">
              <div>
                <p className="font-display text-2xl font-bold">Don’t see your city?</p>
                <p className="mt-1 text-mist">We work with businesses across {site.areaServed}. Most of our work happens remotely.</p>
              </div>
              <Link href="/free-audit" className="btn-green">Get my free audit →</Link>
            </div>
          </div>
        </section>
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
