import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/home/Header";
import { Footer } from "@/components/home/Closing";
import { cases, site } from "@/lib/site";

export const metadata: Metadata = {
  title: `You're in! | ${site.name}`,
  robots: { index: false }, // thank-you pages stay out of Google
};

export default function ThankYouPage() {
  const c = cases[0];
  return (
    <>
      <Header dark={false} />
      <main>
        <section className="relative overflow-hidden bg-white pt-16 pb-24 md:pt-24">
          <div className="container-x relative mx-auto max-w-4xl text-center">
            <span className="mx-auto grid size-16 place-items-center rounded-full bg-green text-2xl text-[#03150a]" aria-hidden="true">✓</span>
            <h1 className="h-display mt-6 text-[clamp(44px,6.4vw,84px)] font-black">You’re in!</h1>
            <p className="mx-auto mt-5 max-w-[52ch] text-lg text-slate">
              Your free audit is on its way. We’ll text you as soon as it’s ready, usually within 48 hours.
            </p>

            {/* TODO: replace with a 60-second founder welcome video */}
            <div className="relative mx-auto mt-12 grid aspect-video max-w-3xl place-items-center overflow-hidden rounded-2xl bg-ink text-white">
              <div className="relative">
                <span className="mx-auto grid size-20 place-items-center rounded-full bg-white/90 text-ink shadow-xl" aria-hidden="true">
                  <svg viewBox="0 0 24 24" className="ml-1 size-7" fill="currentColor"><path d="M7 4v16l13-8z" /></svg>
                </span>
                <p className="mt-4 font-display text-xl font-bold">Watch this first (60 sec)</p>
                <p className="text-sm text-white/60">What happens next, and how to get the most from your audit</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-paper">
          <div className="container-x grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h2 className="h-display text-[clamp(36px,4.8vw,60px)]">Want us to walk you through it?</h2>
              <p className="mt-5 max-w-[46ch] text-lg text-slate">
                Book a 20-minute call for when your audit is ready. We’ll go through the fixes together and answer your questions.
              </p>
              {/* Set site.bookingUrl to your CRM calendar link */}
              <a href={site.bookingUrl || "/contact#book"} className="btn-ink mt-8">Pick a time →</a>
              <p className="mt-4 text-sm text-slate">Prefer to talk now? Call {site.phone}</p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-black/5" style={{ background: c.bg }}>
              <div className="relative aspect-[4/3]">
                <Image src={c.image} alt={`${c.industry} website shown on a laptop and phone`} fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
              </div>
              <div className="p-6">
                <p className="font-semibold text-xs" style={{ color: c.accent }}>While you wait · {c.industry}</p>
                <p className="mt-2 font-display text-3xl font-black">{c.metric} <span className="text-lg font-medium">{c.sub}</span></p>
                <p className="mt-2 text-ink/70">{c.text}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
