import Image from "next/image";
import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { categories, categoryKeys, formatDate, readingMinutes, slugify, type Block, type CategoryKey, type Post } from "@/lib/blog";

/** Inline text: **bold** and [label](href). Internal links use next/link. */
export function Rich({ text }: { text: string }) {
  const out: ReactNode[] = [];
  const rx = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = rx.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) out.push(<strong key={k++} className="font-semibold text-ink">{m[1]}</strong>);
    else {
      const href = m[3];
      const cls = "font-medium text-green-ink underline decoration-green-ink/30 underline-offset-4 hover:decoration-green-ink";
      out.push(href.startsWith("/") ? <Link key={k++} href={href} className={cls}>{m[2]}</Link> : <a key={k++} href={href} className={cls} rel="noopener">{m[2]}</a>);
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out.map((n, i) => <Fragment key={i}>{n}</Fragment>)}</>;
}

/** Flat cover: the category tint with its 3D icon. No stock photos, no gradients. */
export function Cover({ category, size = "md", priority = false }: { category: CategoryKey; size?: "sm" | "md" | "lg"; priority?: boolean }) {
  const c = categories[category];
  const icon = size === "lg" ? "w-[38%] max-w-[260px]" : size === "md" ? "w-[34%]" : "w-[30%]";
  return (
    <div className="relative grid h-full w-full place-items-center overflow-hidden" style={{ background: c.tint }}>
      <Image src={`/graphics/icons/${c.icon}.webp`} alt="" width={420} height={420} priority={priority} sizes="(min-width: 1024px) 260px, 40vw" className={`${icon} drop-shadow-[0_24px_30px_rgba(0,0,0,.18)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-3`} />
    </div>
  );
}

export function Meta({ post, className = "" }: { post: Post; className?: string }) {
  const c = categories[post.category];
  return (
    <p className={`flex flex-wrap items-center gap-x-2 text-sm text-slate ${className}`}>
      <span className="font-medium" style={{ color: c.color }}>{c.name}</span>
      <span aria-hidden="true">·</span>
      <span>{readingMinutes(post)} min read</span>
      <span aria-hidden="true">·</span>
      <time dateTime={post.date}>{formatDate(post.date)}</time>
    </p>
  );
}

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="group relative flex h-full flex-col">
      <div className="aspect-[16/10] overflow-hidden rounded-2xl">
        <Cover category={post.category} />
      </div>
      <h3 className="mt-5 font-display text-xl leading-snug font-bold md:text-[22px]">
        <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4">
          {post.title}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-2 text-[15px] text-slate">{post.description}</p>
      <Meta post={post} className="mt-4" />
    </article>
  );
}

/** Category tabs: plain text links with an underline for the active one; swipes sideways on phones. */
export function CategoryNav({ active }: { active?: CategoryKey }) {
  const item = (href: string, label: string, on: boolean) => (
    <li key={href} className="flex-none">
      <Link
        href={href}
        aria-current={on ? "page" : undefined}
        className={`block border-b-2 py-3 text-[15px] font-medium whitespace-nowrap transition-colors ${on ? "border-ink text-ink" : "border-transparent text-slate hover:text-ink"}`}
      >
        {label}
      </Link>
    </li>
  );
  return (
    <nav aria-label="Blog categories" className="border-b border-line">
      <ul className="no-scrollbar -mx-5 flex gap-7 overflow-x-auto px-5 sm:mx-0 sm:px-0">
        {item("/blog", "All articles", !active)}
        {categoryKeys.map((k) => item(`/blog/category/${k}`, categories[k].name, active === k))}
      </ul>
    </nav>
  );
}

/** The article body. Headings get ids for the table of contents. */
export function PostBody({ blocks, cta }: { blocks: Block[]; cta: ReactNode }) {
  return (
    <div className="text-[17px] leading-[1.75] text-ink/85 md:text-lg">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return <p key={i} className="mt-5"><Rich text={b.text} /></p>;
          case "h2":
            return <h2 key={i} id={slugify(b.text)} className="mt-14 scroll-mt-28 font-display text-[clamp(26px,3vw,34px)] leading-tight font-bold text-ink">{b.text}</h2>;
          case "h3":
            return <h3 key={i} className="mt-9 font-display text-xl font-bold text-ink">{b.text}</h3>;
          case "list": {
            const L = b.ordered ? "ol" : "ul";
            return (
              <L key={i} className={`mt-5 grid gap-2.5 pl-6 ${b.ordered ? "list-decimal marker:font-semibold marker:text-ink" : "list-disc marker:text-green-ink"}`}>
                {b.items.map((t) => <li key={t} className="pl-1.5"><Rich text={t} /></li>)}
              </L>
            );
          }
          case "checklist":
            return (
              <div key={i} className="mt-8 rounded-2xl bg-paper p-6 md:p-7">
                <p className="font-display text-lg font-bold text-ink">{b.title}</p>
                <ul className="mt-3 grid gap-2.5">
                  {b.items.map((t) => (
                    <li key={t} className="flex gap-3">
                      <svg viewBox="0 0 20 20" className="mt-1.5 size-4 flex-none text-green-ink" fill="currentColor" aria-hidden="true"><path d="M8.2 14.6 3.6 10l1.4-1.4 3.2 3.2 6.8-6.8 1.4 1.4z" /></svg>
                      <span><Rich text={t} /></span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          case "callout":
            return (
              <aside key={i} className={`mt-8 border-l-4 py-1 pl-5 ${b.tone === "warning" ? "border-coral" : "border-green"}`}>
                <p className="font-display text-lg font-bold text-ink">{b.title}</p>
                <p className="mt-1"><Rich text={b.text} /></p>
              </aside>
            );
          case "quote":
            return (
              <figure key={i} className="mt-8">
                <blockquote className="font-display text-[clamp(22px,2.4vw,28px)] leading-snug font-semibold text-ink">“{b.text}”</blockquote>
                {b.by && <figcaption className="mt-2 text-sm text-slate">{b.by}</figcaption>}
              </figure>
            );
          case "table":
            return (
              <div key={i} className="mt-8 overflow-x-auto">
                <table className="w-full min-w-[480px] border-collapse text-left text-[15px] leading-normal">
                  <thead>
                    <tr className="border-b-2 border-ink">{b.head.map((h) => <th key={h} scope="col" className="py-3 pr-4 font-semibold text-ink">{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r) => (
                      <tr key={r.join("|")} className="border-b border-line">
                        {r.map((cell, j) => j === 0 ? <th key={j} scope="row" className="py-3 pr-4 align-top font-medium text-ink">{cell}</th> : <td key={j} className="py-3 pr-4 align-top">{cell}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "cta":
            return <div key={i} className="mt-10">{cta}</div>;
        }
      })}
    </div>
  );
}

/** Inline audit offer inside articles. */
export function InlineCta({ text }: { text: string }) {
  return (
    <div className="rounded-2xl bg-ink p-6 text-white md:flex md:items-center md:justify-between md:gap-6 md:p-7">
      <div>
        <p className="font-display text-xl font-bold">Want us to check this for you?</p>
        <p className="mt-1 text-[15px] leading-normal text-mist">{text}</p>
      </div>
      <Link href="/free-audit" className="btn-green mt-5 w-full flex-none md:mt-0 md:w-auto">Get my free audit →</Link>
    </div>
  );
}
