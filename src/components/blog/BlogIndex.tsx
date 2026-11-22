import Image from "next/image";
import Link from "next/link";
import Header from "@/components/home/Header";
import { FinalCta, Footer } from "@/components/home/Closing";
import { Reveal } from "@/components/motion";
import { categories, categoryKeys, posts, postsIn, type CategoryKey } from "@/lib/blog";
import { CategoryNav, Cover, Meta, PostCard } from "./parts";

/** /blog and /blog/category/[category]. */
export default function BlogIndex({ active }: { active?: CategoryKey }) {
  const list = active ? postsIn(active) : posts;
  const [featured, ...rest] = list;
  const cat = active ? categories[active] : null;

  return (
    <>
      <Header dark={false} />
      <main>
        <section className="bg-white pt-10 pb-2 md:pt-16">
          <div className="container-x">
            {cat && <Link href="/blog" className="text-sm text-slate hover:text-ink">← All articles</Link>}
            <div className="mt-4 grid gap-6 md:grid-cols-[1.2fr_.8fr] md:items-end">
              <h1 className="h-display text-[clamp(44px,6.4vw,88px)] font-black">
                {cat ? cat.name : "The growth playbook"}
              </h1>
              <p className="max-w-[46ch] text-[17px] text-slate md:pb-3 md:text-lg">
                {cat
                  ? cat.blurb
                  : "Practical guides on SEO, Google Maps, ads and automation for local businesses and online stores. Written by the people who do the work."}
              </p>
            </div>
            <div className="mt-10">
              <CategoryNav active={active} />
            </div>
          </div>
        </section>

        <section className="bg-white pt-10 pb-20 md:pt-14 md:pb-28">
          <div className="container-x">
            {featured && (
              <Reveal>
                <article className="group relative grid gap-6 md:grid-cols-[1.1fr_.9fr] md:items-center md:gap-12">
                  <div className="aspect-[16/11] overflow-hidden rounded-[20px]">
                    <Cover category={featured.category} size="lg" priority />
                  </div>
                  <div>
                    <Meta post={featured} />
                    <h2 className="mt-3 font-display text-[clamp(28px,3.6vw,46px)] leading-[1.08] font-extrabold">
                      <Link href={`/blog/${featured.slug}`} className="after:absolute after:inset-0 group-hover:underline group-hover:decoration-2 group-hover:underline-offset-[6px]">
                        {featured.title}
                      </Link>
                    </h2>
                    <p className="mt-4 text-[17px] text-slate md:text-lg">{featured.description}</p>
                    <p className="mt-6 font-semibold text-green-ink">Read the guide →</p>
                  </div>
                </article>
              </Reveal>
            )}

            {rest.length > 0 && (
              <div className="mt-16 grid gap-x-8 gap-y-14 border-t border-line pt-14 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((p, i) => (
                  <Reveal key={p.slug} delay={(i % 3) * 0.05} className="h-full">
                    <PostCard post={p} />
                  </Reveal>
                ))}
              </div>
            )}

            {list.length === 0 && <p className="text-slate">New articles in this topic are on the way.</p>}
          </div>
        </section>

        {!active && (
          <section className="section bg-paper">
            <div className="container-x">
              <h2 className="h-display text-[clamp(34px,4.6vw,56px)]">Browse by topic</h2>
              <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {categoryKeys.map((k) => {
                  const c = categories[k];
                  const n = postsIn(k).length;
                  return (
                    <li key={k}>
                      <Link href={`/blog/category/${k}`} className="group flex h-full items-center gap-4 rounded-2xl bg-white p-5 transition-transform hover:-translate-y-0.5">
                        <span className="grid size-14 flex-none place-items-center rounded-xl" style={{ background: c.tint }}>
                          <Image src={`/graphics/icons/${c.icon}.webp`} alt="" width={64} height={64} className="size-10" />
                        </span>
                        <span className="min-w-0">
                          <span className="block font-display text-lg font-bold">{c.name}</span>
                          <span className="block text-sm text-slate">{n} {n === 1 ? "article" : "articles"}</span>
                        </span>
                        <span aria-hidden="true" className="ml-auto text-slate transition-transform group-hover:translate-x-1">→</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        )}

        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
