import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/home/Header";
import { FinalCta, Footer } from "@/components/home/Closing";
import { CopyLink, Toc } from "@/components/blog/Toc";
import { Cover, InlineCta, Meta, PostBody, PostCard, Rich } from "@/components/blog/parts";
import { categories, formatDate, getPost, posts, readingMinutes, relatedTo, toc } from "@/lib/blog";
import { servicesData } from "@/lib/services";
import { founder } from "@/lib/about";
import { site } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return {};
  return {
    title: `${p.title} | ${site.name}`,
    description: p.description,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: { type: "article", title: p.title, description: p.description, publishedTime: p.date, modifiedTime: p.updated ?? p.date },
  };
}

const initials = (name: string) => name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const cat = categories[post.category];
  const url = `${site.url}/blog/${post.slug}`;
  const contents = toc(post);
  const related = relatedTo(post);
  const services = post.services.map((s) => servicesData.find((x) => x.slug === s)).filter((s): s is NonNullable<typeof s> => Boolean(s));

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.updated ?? post.date,
      author: { "@type": "Person", name: founder.name, jobTitle: founder.role },
      publisher: { "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: `${site.url}/brand/logo-mark-512.png` } },
      mainEntityOfPage: url,
      articleSection: cat.name,
      wordCount: readingMinutes(post) * 220,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
        { "@type": "ListItem", position: 3, name: cat.name, item: `${site.url}/blog/category/${post.category}` },
        { "@type": "ListItem", position: 4, name: post.title, item: url },
      ],
    },
    ...(post.faqs?.length
      ? [{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: post.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }]
      : []),
  ];

  const share = [
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    { label: "X", href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(post.title)}` },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header dark={false} />
      <main>
        {/* TITLE */}
        <header className="bg-white pt-8 md:pt-14">
          <div className="container-x">
            <Link href={`/blog/category/${post.category}`} className="text-sm text-slate hover:text-ink">← {cat.name}</Link>
            <h1 className="mt-5 max-w-[22ch] font-display text-[clamp(34px,5vw,64px)] leading-[1.05] font-extrabold">{post.title}</h1>
            <p className="mt-5 max-w-[60ch] text-[17px] text-slate md:text-xl">{post.description}</p>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-ink font-display text-sm font-bold text-white" aria-hidden="true">{initials(founder.name)}</span>
                <span className="text-sm leading-tight">
                  <span className="block font-semibold">{founder.name}</span>
                  <span className="text-slate">{founder.role}</span>
                </span>
              </div>
              <Meta post={post} />
            </div>
            <div className="mt-10 aspect-[16/9] overflow-hidden rounded-[20px] md:aspect-[21/8]">
              <Cover category={post.category} size="lg" priority />
            </div>
          </div>
        </header>

        {/* BODY + SIDEBAR */}
        <div className="bg-white pt-12 pb-20 md:pt-16 md:pb-28">
          <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-20">
            <article className="min-w-0 max-w-[720px]">
              {/* phones: table of contents folds away */}
              <details className="mb-8 rounded-2xl bg-paper p-5 lg:hidden">
                <summary className="cursor-pointer font-display text-lg font-bold">On this page</summary>
                <div className="mt-4"><Toc items={contents} /></div>
              </details>

              <section aria-label="Key takeaways" className="rounded-2xl bg-mint p-6 md:p-7">
                <h2 className="font-display text-xl font-bold">Key takeaways</h2>
                <ul className="mt-3 grid gap-2.5 text-[16px] leading-relaxed">
                  {post.takeaways.map((t) => (
                    <li key={t} className="flex gap-3">
                      <svg viewBox="0 0 20 20" className="mt-1.5 size-4 flex-none text-green-ink" fill="currentColor" aria-hidden="true"><path d="M8.2 14.6 3.6 10l1.4-1.4 3.2 3.2 6.8-6.8 1.4 1.4z" /></svg>
                      <span><Rich text={t} /></span>
                    </li>
                  ))}
                </ul>
              </section>

              <PostBody blocks={post.blocks} cta={<InlineCta text={`In 48 hours you get a short video and report on your ${cat.name.toLowerCase()}, with the 5 fixes that will bring the most calls and sales.`} />} />

              {post.faqs && post.faqs.length > 0 && (
                <section className="mt-16">
                  <h2 id="faq" className="scroll-mt-28 font-display text-[clamp(26px,3vw,34px)] font-bold">Questions people ask</h2>
                  <div className="mt-5 border-t border-line">
                    {post.faqs.map((f) => (
                      <details key={f.q} className="group border-b border-line">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-lg font-semibold [&::-webkit-details-marker]:hidden">
                          {f.q}
                          <span aria-hidden="true" className="grid size-8 flex-none place-items-center rounded-full bg-paper transition-transform group-open:rotate-45">+</span>
                        </summary>
                        <p className="pb-5 text-[16px] leading-relaxed text-slate">{f.a}</p>
                      </details>
                    ))}
                  </div>
                </section>
              )}

              {/* author + share */}
              <div className="mt-16 flex flex-col gap-6 rounded-2xl bg-paper p-6 sm:flex-row sm:items-center sm:justify-between md:p-7">
                <div className="flex items-center gap-4">
                  <span className="grid size-14 flex-none place-items-center rounded-full bg-ink font-display font-bold text-white" aria-hidden="true">{initials(founder.name)}</span>
                  <div>
                    <p className="font-display text-lg font-bold">{founder.name}</p>
                    <p className="text-sm text-slate">{founder.role} at {site.name}. Updated {formatDate(post.updated ?? post.date)}.</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  <span className="text-sm text-slate">Share</span>
                  {share.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-slate hover:text-ink">{s.label}</a>
                  ))}
                  <CopyLink url={url} />
                </div>
              </div>
            </article>

            {/* sticky sidebar (desktop) */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 grid gap-10">
                <div>
                  <p className="mb-3 font-display font-bold">On this page</p>
                  <Toc items={contents} />
                </div>
                {services.length > 0 && (
                  <div className="rounded-2xl bg-ink p-6 text-white">
                    <p className="font-display text-lg font-bold">Want this done for you?</p>
                    <ul className="mt-3 grid gap-1.5 text-[15px]">
                      {services.map((s) => (
                        <li key={s.slug}><Link href={`/services/${s.slug}`} className="text-mist hover:text-white">{s.name} →</Link></li>
                      ))}
                    </ul>
                    <Link href="/free-audit" className="btn-green mt-5 w-full !py-3 text-sm">Get my free audit</Link>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>

        {/* KEEP READING */}
        <section className="section bg-paper">
          <div className="container-x">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="h-display text-[clamp(32px,4.4vw,52px)]">Keep reading</h2>
              <Link href="/blog" className="font-medium text-green-ink hover:underline">All articles →</Link>
            </div>
            <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => <PostCard key={p.slug} post={p} />)}
            </div>
          </div>
        </section>

        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
