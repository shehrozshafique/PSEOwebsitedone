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

const faqs = [
  { q: "How fast do you reply?", a: "Within one business day, usually the same day. Texts and calls during business hours get the fastest answer." },
  { q: "Do you work with businesses outside your area?", a: `Yes. We work with ${site.audience} across ${site.areaServed}, mostly over video calls.` },
  { q: "I’m a current client. Where do I get support?", a: "Message us here and choose “I’m a current client”, or reply in your client app. You’ll reach the team working on your account." },
];

export default function ContactPage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${site.name}`,
    url: `${site.url}/contact`,
    mainEntity: { "@type": "Organization", name: site.name, telephone: site.phone, email: site.email, areaServed: site.areaServed },
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

        {/* BOOK A CALL / AUDIT (dark band) */}
        <section id="book" className="relative scroll-mt-24 overflow-hidden bg-ink py-24 text-white md:py-28">
          <div className="container-x relative grid items-center gap-10 lg:grid-cols-[1.2fr_.8fr]">
            <Reveal>
              <h2 className="h-display text-[clamp(36px,5vw,64px)]">
                Book a 20-minute call
                <span className="block font-normal text-green-soft">Or start with a free audit</span>
              </h2>
              <p className="mt-5 max-w-[50ch] text-lg text-mist">
                We’ll look at where your calls come from today and what would bring more. You leave with a clear next step either way.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="flex flex-col gap-3 lg:items-end">
              {site.bookingUrl ? (
                <a href={site.bookingUrl} className="btn-green w-full lg:w-auto">Pick a time →</a>
              ) : (
                <a href={`tel:${tel}`} className="btn-green w-full lg:w-auto">Call {site.phone}</a>
              )}
              <Link href="/free-audit" className="btn-outline-light w-full lg:w-auto">Get my free audit</Link>
            </Reveal>
          </div>
        </section>

        {/* AREAS + FAQ (white) */}
        <section className="section bg-white">
          <div className="container-x grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <div className="rounded-2xl bg-paper p-7">
                <p className="font-semibold text-[13px] text-slate">Where we work</p>
                <p className="mt-2 font-display text-2xl font-bold">{site.areaServed}</p>
                <p className="mt-2 text-slate">Remote-first, with video calls and a client app so you always know what’s happening.</p>
                <p className="mt-5 font-semibold text-[13px] text-slate">Hours</p>
                <p className="mt-1">{site.hours}</p>
              </div>
            </div>
            <div>
              <h2 className="font-display text-3xl font-bold">Good to know</h2>
              <div className="mt-6 divide-y divide-line border-y border-line">
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
