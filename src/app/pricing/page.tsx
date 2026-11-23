import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/home/Header";
import { FinalCta, Footer } from "@/components/home/Closing";
import { Reveal } from "@/components/motion";
import { BillingProvider, BillingToggle, EmailSavings, OfferPlans, PackagePlans, PermanentPromise, StarterBundle, ValueStack } from "@/components/pricing/Billing";
import { MIN_TERM, moreServices, offers, platformFeatures, YEARLY_DISCOUNT } from "@/lib/offers";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Pricing: growth packages and services | ${site.name}`,
  description:
    "Done-for-you growth packages for local businesses and online stores: website, Google Maps, AI that answers every lead, reviews and email. Backed by the Permanent Promise. Prices in $ and £.",
  alternates: { canonical: "/pricing" },
};

const faqs = [
  { q: "Why is there a 6-month minimum?", a: "SEO, Google Maps and reviews build up month after month. Six months gives the system time to work and gives you real results to judge. After that it is month to month and you can leave anytime." },
  { q: "What exactly do you guarantee?", a: "The Permanent Promise: your system is live within 14 days of kickoff or your first month is free; every lead gets a reply within 60 seconds, 24/7, or that month is free; and you own your website, domain, content and data." },
  { q: "Can I change packages later?", a: "Yes. You can move up a package anytime. Most clients start on Foundation or Growth and add more as they grow." },
  { q: "Is the website really included?", a: "Yes. The Starter Bundle includes a 5-page Starter website, and Growth and Scale include the Business website with full tracking setup. On its own, a Starter website is a one-time build plus hosting." },
  { q: "What is the Starter Bundle?", a: "A website, review automation and an email marketing platform in one monthly price, with the website build and setup included. It is how most businesses start with us, and you can move up to a Growth package anytime." },
  { q: "Do you charge in pounds or dollars?", a: "Both. UK businesses are billed in pounds, everyone else in dollars. Use the switch at the top of the page to see either." },
  { q: "How do I pay?", a: "Pick a package and we send a secure payment link. Monthly plans are billed each month; pay yearly to save 20%." },
];

export default function PricingPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <Header dark={false} />
      <BillingProvider>
        <main>
          {/* HERO: the promise */}
          <section className="bg-white pt-10 pb-12 text-center md:pt-16 md:pb-16">
            <div className="container-x">
              <h1 className="h-display mx-auto max-w-[18ch] text-[clamp(40px,6vw,84px)] font-black">
                More booked jobs and orders <span className="block font-normal text-slate">without chasing a single lead</span>
              </h1>
              <p className="mx-auto mt-5 max-w-[56ch] text-[17px] text-slate md:text-lg">
                We build and run the whole system for you: a website that converts, top spots on Google, AI that answers every call and message in seconds, and reviews that keep coming in.
              </p>
              <div className="mt-8">
                <BillingToggle />
              </div>
              <p className="mt-4 text-[13px] text-slate">
                {MIN_TERM} · Pay yearly and save {Math.round(YEARLY_DISCOUNT * 100)}%
              </p>
            </div>
          </section>

          {/* STARTER BUNDLE: the front door */}
          <section id="starter" className="scroll-mt-24 bg-white pb-12 md:pb-16">
            <div className="container-x">
              <Reveal>
                <StarterBundle />
              </Reveal>
            </div>
          </section>

          {/* PACKAGES */}
          <section className="bg-white pb-6">
            <div className="container-x">
              <Reveal className="max-w-3xl">
                <h2 className="h-display text-[clamp(34px,4.6vw,56px)]">Ready for more? Growth packages</h2>
                <p className="mt-4 text-[17px] text-slate">Everything done for you: Google Maps ranking, AI that answers every call, and email and SMS that sell.</p>
              </Reveal>
            </div>
          </section>
          <section id="packages" className="scroll-mt-24 bg-white pb-16 md:pb-24">
            <div className="container-x">
              <PackagePlans />
            </div>
          </section>

          {/* VALUE STACK + PROMISE */}
          <section className="bg-white pb-16 md:pb-24">
            <div className="container-x grid gap-6">
              <Reveal>
                <ValueStack />
              </Reveal>
              <Reveal>
                <PermanentPromise />
              </Reveal>
            </div>
          </section>

          {/* SINGLE SERVICES */}
          <section className="border-t border-line bg-white pt-14 md:pt-20">
            <div className="container-x">
              <Reveal className="max-w-3xl">
                <h2 className="h-display text-[clamp(34px,4.6vw,56px)]">Only need one thing?</h2>
                <p className="mt-4 text-[17px] text-slate">Every service is available on its own, on the same platform, with the same promise.</p>
              </Reveal>
            </div>
            <nav aria-label="Single services" className="sticky top-[72px] z-30 mt-8 border-b border-line bg-white/95 backdrop-blur">
              <ul className="no-scrollbar container-x flex gap-2 overflow-x-auto py-3 md:justify-center">
                {offers.map((o) => (
                  <li key={o.key} className="flex-none">
                    <a href={`#${o.key}`} className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate transition-colors hover:bg-paper hover:text-ink">
                      <Image src={`/graphics/icons/${o.icon}.webp`} alt="" width={28} height={28} className="size-6" />
                      {o.short}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </section>

          {offers.map((o) => (
            <section key={o.key} id={o.key} className="scroll-mt-36 bg-white py-12 md:py-16">
              <div className="container-x">
                <Reveal className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div className="flex items-center gap-4">
                    <Image src={`/graphics/icons/${o.icon}.webp`} alt="" width={96} height={96} className="size-16 flex-none md:size-20" />
                    <div>
                      <h2 className="font-display text-3xl font-extrabold md:text-4xl">{o.title}</h2>
                      <p className="mt-1 max-w-[60ch] text-[15px] text-slate md:text-base">{o.pitch}</p>
                    </div>
                  </div>
                  {o.serviceSlug && (
                    <Link href={`/services/${o.serviceSlug}`} className="flex-none text-sm font-semibold text-green-ink hover:underline">
                      See what’s included →
                    </Link>
                  )}
                </Reveal>
                <OfferPlans offer={o} />
                {o.key === "email-platform" && (
                  <div className="mt-6">
                    <EmailSavings />
                  </div>
                )}
              </div>
            </section>
          ))}

          {/* PLATFORM */}
          <section className="section bg-paper">
            <div className="container-x">
              <Reveal className="max-w-3xl">
                <h2 className="h-display text-[clamp(34px,4.6vw,56px)]">Every plan runs on one platform</h2>
                <p className="mt-4 text-[17px] text-slate">The same app powers your leads, messages, bookings, reviews and marketing, so you never juggle ten logins again.</p>
              </Reveal>
              <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {platformFeatures.map((f) => (
                  <li key={f.title} className="flex gap-3 rounded-2xl bg-white p-5">
                    <span className="mt-0.5 grid size-8 flex-none place-items-center rounded-lg bg-green/15 text-green-ink" aria-hidden="true">
                      <svg viewBox="0 0 20 20" className="size-4" fill="currentColor"><path d="M8.2 14.6 3.6 10l1.4-1.4 3.2 3.2 6.8-6.8 1.4 1.4z" /></svg>
                    </span>
                    <span>
                      <span className="block font-display font-bold">{f.title}</span>
                      <span className="block text-[15px] text-slate">{f.text}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* MORE SERVICES */}
          <section className="bg-white py-14 md:py-20">
            <div className="container-x">
              <h2 className="font-display text-2xl font-bold md:text-3xl">More services, quoted per project</h2>
              <ul className="mt-6 grid gap-3 md:grid-cols-3">
                {moreServices.map((m) => (
                  <li key={m.slug}>
                    <Link href={`/services/${m.slug}`} className="group flex items-center gap-4 rounded-2xl bg-paper p-5 transition-transform hover:-translate-y-0.5">
                      <Image src={`/graphics/icons/${m.icon}.webp`} alt="" width={56} height={56} className="size-12 flex-none" />
                      <span className="font-display text-lg font-bold">{m.title}</span>
                      <span aria-hidden="true" className="ml-auto transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* FAQ */}
          <section className="section bg-paper">
            <div className="container-x grid gap-10 md:grid-cols-[.8fr_1.2fr]">
              <h2 className="h-display text-[clamp(34px,4.6vw,56px)]">Pricing questions</h2>
              <div className="border-t border-line">
                {faqs.map((f) => (
                  <details key={f.q} className="group border-b border-line">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-lg font-semibold [&::-webkit-details-marker]:hidden">
                      {f.q}
                      <span aria-hidden="true" className="grid size-8 flex-none place-items-center rounded-full bg-white transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="pb-5 text-slate">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <FinalCta />
        </main>
      </BillingProvider>
      <Footer />
    </>
  );
}
