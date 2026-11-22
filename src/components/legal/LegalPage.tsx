import Link from "next/link";
import Header from "@/components/home/Header";
import { Footer } from "@/components/home/Closing";

export type LegalSection = { id: string; title: string; body: React.ReactNode };

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/sms-terms", label: "SMS Terms" },
];

/** Shared layout for legal pages: light, readable, with a sticky table of contents. */
export default function LegalPage({
  title,
  intro,
  updated,
  current,
  sections,
}: {
  title: string;
  intro: string;
  updated: string;
  current: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <Header dark={false} />
      <main className="bg-white">
        <section className="border-b border-line bg-paper pt-14 pb-12 md:pt-20">
          <div className="container-x">
            <h1 className="h-display text-[clamp(40px,5.6vw,72px)] font-black">{title}</h1>
            <p className="mt-4 max-w-[62ch] text-lg text-slate">{intro}</p>
            <p className="mt-4 font-semibold text-xs text-slate">Last updated: {updated}</p>
            <nav aria-label="Legal pages" className="mt-8 flex flex-wrap gap-2">
              {legalLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={current === l.href ? "page" : undefined}
                  className={`rounded-full border px-4 py-2 text-sm font-medium ${current === l.href ? "border-ink bg-ink text-white" : "border-line bg-white hover:border-ink/30"}`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </section>

        <div className="container-x grid gap-12 py-16 md:py-20 lg:grid-cols-[240px_1fr]">
          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-32">
              <p className="font-semibold text-[13px] text-slate">On this page</p>
              <ol className="mt-4 grid gap-2 text-sm">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="text-slate hover:text-ink">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <article className="max-w-[72ch] min-w-0 text-[17px] leading-relaxed text-ink/80 [&_a]:font-medium [&_a]:text-green-ink [&_a]:underline [&_a]:underline-offset-4 [&_li]:mt-1.5 [&_p+p]:mt-4 [&_strong]:text-ink [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6">
            {sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-28 border-b border-line py-8 first:pt-0 last:border-0">
                <h2 className="font-display text-2xl font-bold text-ink">
                  
                  {s.title}
                </h2>
                <div className="mt-4">{s.body}</div>
              </section>
            ))}
            <p className="mt-10 rounded-2xl bg-paper p-5 text-sm text-slate">
              Questions about this page? Contact us at the details on our <Link href="/contact">contact page</Link>.
            </p>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
