import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/home/Header";
import { Footer } from "@/components/home/Closing";
import ContactForm from "@/components/contact/ContactForm";
import { Reveal } from "@/components/motion";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Contact Us | ${site.name}`,
  description: `Talk to ${site.name} about your website, Google ranking, ads or automation. Call, text, email or send a message. We reply within one business day.`,
  alternates: { canonical: "/contact" },
};

const tel = site.phone.replace(/[^\d+]/g, "");

const ways = [
  { label: "Call us", value: site.phone, href: `tel:${tel}`, note: site.hours, icon: "M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z", color: "#1fae55" },
  { label: "Text us", value: site.phone, href: `sms:${tel}`, note: "Quickest way to reach us", icon: "M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2z", color: "#4d8dff" },
  { label: "Email us", value: site.email, href: `mailto:${site.email}`, note: "We reply within 1 business day", icon: "M3 5h18v14H3zM3 6l9 7 9-7", color: "#8b6bff" },
];

const markets = [
  { code: "uk", name: "United Kingdom", note: "Billed in pounds (£)" },
  { code: "us", name: "United States", note: "Billed in dollars ($)" },
] as const;

const details: { label: string; value: string; href?: string }[] = [
  { label: "Business", value: site.name },
  { label: "Website", value: site.url.replace(/^https?:\/\//, ""), href: site.url },
  { label: "Phone", value: site.phone, href: `tel:${tel}` },
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "Hours", value: site.hours },
  { label: "Serving", value: "UK and US, remote-first" },
  // registered details show once they are filled in site.ts
  ...(site.companyNumber ? [{ label: "Registered", value: `${site.legalName}, no. ${site.companyNumber}` }] : []),
];

/** Small flat flags (no emoji, so they look the same on every device). */
function Flag({ code }: { code: "uk" | "us" }) {
  return (
    <svg viewBox="0 0 60 40" className="h-8 w-12 flex-none overflow-hidden rounded-md" aria-hidden="true">
      {code === "uk" ? (
        <>
          <rect width="60" height="40" fill="#012169" />
          <path d="M0 0 60 40M60 0 0 40" stroke="#fff" strokeWidth="8" />
          <path d="M0 0 60 40M60 0 0 40" stroke="#C8102E" strokeWidth="3" />
          <path d="M30 0v40M0 20h60" stroke="#fff" strokeWidth="12" />
          <path d="M30 0v40M0 20h60" stroke="#C8102E" strokeWidth="7" />
        </>
      ) : (
        <>
          <rect width="60" height="40" fill="#fff" />
          {[0, 2, 4, 6, 8, 10, 12].map((i) => (
            <rect key={i} y={(i * 40) / 13} width="60" height={40 / 13} fill="#B22234" />
          ))}
          <rect width="26" height={(40 * 7) / 13} fill="#3C3B6E" />
        </>
      )}
    </svg>
  );
}

const faqs = [
  { q: "How fast do you reply?", a: "Within one business day, usually the same day. Texts and calls during business hours get the fastest answer." },
  { q: "Do you work with businesses outside your area?", a: `Yes. We work with ${site.audience} across the UK and the US, mostly over video calls. UK clients are billed in pounds, US clients in dollars.` },
  { q: "I’m a current client. Where do I get support?", a: "Message us here and choose “I’m a current client”, or reply in your client app. You’ll reach the team working on your account." },
];

export default function ContactPage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${site.name}`,
    url: `${site.url}/contact`,
    mainEntity: { "@type": "Organization", name: site.name, url: site.url, telephone: site.phone, email: site.email, areaServed: site.areaServed.map((name) => ({ "@type": "Country", name })) },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Header dark={false} />
      <main>
        {/* HERO: ways to reach us + form (light, pastel glow) */}
        <section className="relative overflow-hidden bg-white pt-14 pb-24 md:pt-20 md:pb-32">
          <div className="container-x relative grid items-start gap-12 lg:grid-cols-[.9fr_1.1fr]">
            <div>
              <h1 className="h-display text-[clamp(48px,7vw,92px)] font-black">
                Let’s talk
                <span className="block font-normal text-slate">Real people, fast replies</span>
              </h1>
              <p className="mt-6 max-w-[46ch] text-lg text-slate">
                Questions about your website, Google, ads or automation? Reach out the way that suits you. No sales scripts.
              </p>

              {/* Phone, SMS and email links may not open on every device, so the number and address are always shown as text too. */}
              <ul className="mt-10 grid gap-3">
                {ways.map((w) => (
                  <li key={w.label}>
                    <a href={w.href} className="group flex items-center gap-4 rounded-2xl bg-white/80 p-4 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-transparent hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,.35)]">
                      <span className="grid size-12 flex-none place-items-center rounded-xl text-white" style={{ background: w.color }} aria-hidden="true">
                        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><path d={w.icon} /></svg>
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm text-slate">{w.label}</span>
                        <span className="block truncate font-display text-lg font-bold">{w.value}</span>
                        <span className="block text-xs text-slate">{w.note}</span>
                      </span>
                      <span aria-hidden="true" className="ml-auto text-xl transition-transform group-hover:translate-x-1">→</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <ContactForm />
          </div>
        </section>

        {/* BOOK A CALL + BUSINESS DETAILS (dark band) */}
        <section id="book" className="relative scroll-mt-24 overflow-hidden bg-ink py-20 text-white md:py-28">
          <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
            <Reveal>
              <h2 className="h-display text-[clamp(36px,5vw,64px)]">
                Book a <span className="whitespace-nowrap">20-minute</span> call
                <span className="block font-normal text-green-soft">Or start with a free audit</span>
              </h2>
              <p className="mt-5 max-w-[48ch] text-lg text-mist">
                We’ll look at where your calls and orders come from today and what would bring more. You leave with a clear next step either way.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {site.bookingUrl ? (
                  <a href={site.bookingUrl} className="btn-green">Pick a time →</a>
                ) : (
                  <a href={`tel:${tel}`} className="btn-green">Call {site.phone}</a>
                )}
                <Link href="/free-audit" className="btn-outline-light">Get my free audit</Link>
              </div>

              <p className="mt-12 text-sm font-semibold text-mist">We work with businesses in</p>
              <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                {markets.map((m) => (
                  <li key={m.name} className="flex items-center gap-4 rounded-2xl bg-white/[0.06] p-4">
                    <Flag code={m.code} />
                    <span>
                      <span className="block font-display text-lg font-bold">{m.name}</span>
                      <span className="block text-sm text-mist">{m.note}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-2xl bg-white p-6 text-ink sm:p-8">
                <h3 className="font-display text-2xl font-extrabold">{site.name}</h3>
                <p className="mt-1 text-[15px] text-slate">Growth systems for {site.audience}</p>
                <dl className="mt-6 divide-y divide-line">
                  {details.map((d) => (
                    <div key={d.label} className="grid grid-cols-[76px_1fr] gap-3 py-3.5 text-[14px] sm:grid-cols-[96px_1fr] sm:gap-4 sm:text-[15px]">
                      <dt className="text-slate">{d.label}</dt>
                      <dd className="min-w-0 font-semibold break-words">
                        {d.href ? <a href={d.href} className="hover:text-green-ink hover:underline">{d.value}</a> : d.value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-5 rounded-xl bg-mint px-4 py-3 text-sm text-ink">
                  We reply within one business day, usually the same day.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FAQ (white) */}
        <section className="section bg-white">
          <div className="container-x grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <h2 className="h-display text-[clamp(34px,4.6vw,56px)]">Good to know</h2>
            <div>
              <div className="divide-y divide-line border-y border-line">
                {faqs.map((f) => (
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
      </main>
      <Footer />
    </>
  );
}
