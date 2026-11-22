"use client";

import { useEffect, useState } from "react";

/** "On this page" list that highlights the section you're reading. */
export function Toc({ items }: { items: { id: string; text: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-90px 0px -65% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <ol className="grid gap-1 border-l border-line">
      {items.map((i) => (
        <li key={i.id}>
          <a
            href={`#${i.id}`}
            aria-current={active === i.id ? "location" : undefined}
            className={`-ml-px block border-l-2 py-1.5 pl-4 text-[15px] leading-snug transition-colors ${
              active === i.id ? "border-ink font-medium text-ink" : "border-transparent text-slate hover:text-ink"
            }`}
          >
            {i.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

/** Copy-link button for the share row. */
export function CopyLink({ url }: { url: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(url);
        setDone(true);
        setTimeout(() => setDone(false), 1800);
      }}
      className="text-sm font-medium text-slate hover:text-ink"
    >
      {done ? "Link copied" : "Copy link"}
    </button>
  );
}
