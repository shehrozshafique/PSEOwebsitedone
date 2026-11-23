"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { cases, services, site } from "@/lib/site";
import { BrandMark } from "@/components/brand/BrandMark";
import { fromPrice, moreServices } from "@/lib/offers";
import { useCurrency } from "@/lib/currency";
import { telHref } from "@/components/MobileCta";

export function Logo({ light = false }: { light?: boolean }) {
  // "Permanent SEO" → "Permanent" + green "SEO"
  const words = site.name.split(" ");
  const last = words.length > 1 ? words.pop() : "";
  return (
    <Link href="/" aria-label={`${site.name} home`} className={`group flex items-center gap-2.5 font-display text-lg font-extrabold whitespace-nowrap ${light ? "text-white" : "text-ink"}`}>
      <span className="transition-transform duration-300 group-hover:-translate-y-0.5">
        <BrandMark height={26} onDark={light} />
      </span>
      <span>
        {words.join(" ")}
        {last && <span className={`ml-1 font-semibold ${light ? "text-green-soft" : "text-green-ink"}`}>{last}</span>}
      </span>
    </Link>
  );
}

type MenuKey = "services" | "solutions" | "company";

const solutions = [
  {
    title: "Local businesses",
    text: "More calls and booked jobs from Google, Maps and your website.",
    icon: "local",
    color: "#4d8dff",
    links: [
      { label: "Local SEO & Google Maps", href: "/services/local-seo" },
      { label: "Website design", href: "/services/website-design" },
      { label: "Missed-call text back & AI", href: "/services/ai-automation" },
      { label: "Client results", href: "/work" },
    ],
  },
  {
    title: "Online stores",
    text: "More orders, bigger carts and customers who come back.",
    icon: "shop",
    color: "#e0459b",
    links: [
      { label: "Ecommerce growth", href: "/services/ecommerce-growth" },
      { label: "Google Shopping & Meta ads", href: "/services/google-meta-ads" },
      { label: "Shopify store design", href: "/services/website-design" },
      { label: "Email & SMS flows", href: "/services/ecommerce-growth#included" },
    ],
  },
];

const company = [
  { label: "About us", text: "Our story and how we work", href: "/about" },
  { label: "Our work", text: "Case studies with real numbers", href: "/work" },
  { label: "Blog", text: "Guides on SEO, ads and automation", href: "/blog" },
  { label: "Contact", text: "Call, text, email or message", href: "/contact" },
];

/* ---------- desktop panels ---------- */

function ServicesPanel({ close }: { close: () => void }) {
  const [cur] = useCurrency();
  return (
    <div className="p-5">
      {/* service cards only: 7 services + a pricing card, 4 per row */}
      <ul className="grid grid-cols-4 gap-2">
        {services.map((s) => (
          <li key={s.slug}>
            <Link href={`/services/${s.slug}`} onClick={close} className="group flex h-full flex-col rounded-2xl p-4 transition-colors hover:bg-paper">
              <span className="grid size-12 place-items-center rounded-xl transition-transform duration-300 group-hover:-rotate-6" style={{ background: `${s.color}1a` }}>
                <Image src={`/graphics/icons/${s.icon}.webp`} alt="" width={40} height={40} className="size-9" />
              </span>
              <span className="mt-3 flex items-center gap-1.5 font-display font-bold">
                {s.title}
                <span aria-hidden="true" className="-translate-x-1 text-slate opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">→</span>
              </span>
              <span className="mt-1 block flex-1 text-[13px] leading-snug text-slate">{s.text}</span>
              <span className="mt-2 block text-[13px] font-semibold text-green-ink">{fromPrice(s.slug, cur)}</span>
            </Link>
          </li>
        ))}
        <li>
          <Link href="/pricing" onClick={close} className="group flex h-full flex-col justify-between rounded-2xl bg-ink p-4 text-white">
            <span className="font-display text-lg font-bold">See all pricing</span>
            <span className="mt-1 block text-[13px] leading-snug text-mist">Growth packages and single services. Save 20% yearly.</span>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-green-soft">
              Compare plans <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </Link>
        </li>
      </ul>
      <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line px-4 pt-4 text-sm">
        <span className="text-slate">More services:</span>
        {moreServices.map((m) => (
          <Link key={m.slug} href={`/services/${m.slug}`} onClick={close} className="inline-flex items-center gap-1.5 font-medium hover:text-green-ink">
            <Image src={`/graphics/icons/${m.icon}.webp`} alt="" width={20} height={20} className="size-5" />
            {m.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

function SolutionsPanel({ close }: { close: () => void }) {
  const c = cases.find((x) => x.industry === "Online store") ?? cases[0];
  return (
    <div className="grid gap-4 p-6 lg:grid-cols-[1fr_1fr_.9fr]">
      {solutions.map((sol) => (
        <div key={sol.title} className="rounded-2xl bg-paper p-5">
          <div className="flex items-center gap-3">
            <Image src={`/graphics/icons/${sol.icon}.webp`} alt="" width={48} height={48} className="size-11" />
            <p className="font-display text-xl font-bold">{sol.title}</p>
          </div>
          <p className="mt-2 text-sm text-slate">{sol.text}</p>
          <ul className="mt-4 grid gap-0.5">
            {sol.links.map((l) => (
              <li key={l.label}>
                <Link href={l.href} onClick={close} className="group flex items-center justify-between rounded-lg px-2 py-1.5 text-sm font-medium hover:bg-white">
                  {l.label}
                  <span aria-hidden="true" className="text-slate opacity-0 transition-opacity group-hover:opacity-100">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <Link href={`/work/${c.slug}`} onClick={close} className="group overflow-hidden rounded-2xl border border-black/5" style={{ background: c.bg }}>
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image src={c.image} alt="" fill sizes="320px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
        <div className="p-4">
          <p className="font-semibold text-[13px]" style={{ color: c.accent }}>Case study · {c.industry}</p>
          <p className="mt-1 font-display text-xl font-black">{c.metric}</p>
          <p className="text-sm text-ink/70">{c.sub}</p>
        </div>
      </Link>
    </div>
  );
}

function CompanyPanel({ close }: { close: () => void }) {
  return (
    <ul className="grid gap-1 p-3">
      {company.map((l) => (
        <li key={l.href}>
          <Link href={l.href} onClick={close} className="block rounded-xl px-4 py-3 hover:bg-paper">
            <span className="block font-display font-bold">{l.label}</span>
            <span className="block text-[13px] text-slate">{l.text}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/* ---------- header ---------- */

export default function Header({ dark = true }: { dark?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [bar, setBar] = useState(true);
  const [mobile, setMobile] = useState(false);
  const [menu, setMenu] = useState<MenuKey | null>(null);
  const [mobileSection, setMobileSection] = useState<MenuKey | null>("services");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const on = () => setScrolled(!dark || window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [dark]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(null);
        setMobile(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // lock page scroll while the mobile menu is open
  useEffect(() => {
    document.documentElement.style.overflow = mobile ? "hidden" : "";
  }, [mobile]);

  const openMenu = (k: MenuKey) => {
    if (timer.current) clearTimeout(timer.current);
    setMenu(k);
  };
  const closeSoon = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setMenu(null), 140);
  };
  const close = () => {
    setMenu(null);
    setMobile(false);
  };

  const solid = scrolled || menu !== null || mobile;
  const linkCls = `nav-link flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
    solid ? "text-slate hover:bg-paper hover:text-ink" : "text-white/75 hover:bg-white/10 hover:text-white"
  }`;

  const trigger = (k: MenuKey, label: string) => (
    <li onMouseEnter={() => openMenu(k)} onMouseLeave={closeSoon}>
      <button
        type="button"
        aria-expanded={menu === k}
        aria-controls={`menu-${k}`}
        onClick={() => setMenu(menu === k ? null : k)}
        className={`${linkCls} ${menu === k ? (solid ? "!bg-paper !text-ink" : "") : ""}`}
      >
        {label}
        <svg viewBox="0 0 20 20" className={`size-3.5 transition-transform duration-300 ${menu === k ? "rotate-180" : ""}`} fill="currentColor" aria-hidden="true"><path d="M5.3 7.3a1 1 0 0 1 1.4 0L10 10.6l3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 0-1.4Z" /></svg>
      </button>
    </li>
  );

  return (
    <>
      {bar && (
        <div className="relative z-50 bg-ink text-white">
          <div className="container-x flex items-center justify-center gap-3 py-2.5 pr-10 text-[13px] sm:pr-8">
            <span className="size-1.5 flex-none rounded-full bg-green" aria-hidden="true" />
            <p className="whitespace-nowrap">
              <span className="sm:hidden">Free growth audit this month.</span>
              <span className="hidden sm:inline">Free website, store &amp; Google audit this month.</span>{" "}
              <Link href="/free-audit" className="font-semibold underline underline-offset-4 hover:text-green-soft">Claim yours →</Link>
            </p>
            <button onClick={() => setBar(false)} aria-label="Close announcement" className="absolute right-2 grid size-9 place-items-center text-white/60 hover:text-white">✕</button>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-40 px-3 pt-3">
        <div
          className={`container-x relative flex items-center justify-between gap-4 rounded-full py-2 pr-2 pl-4 transition-all sm:py-2.5 sm:pr-2.5 sm:pl-5 duration-300 ${
            solid ? "glass-light nav-solid max-w-[1180px]" : "max-w-[1200px] bg-white/0"
          }`}
        >
          <Logo light={!solid} />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex gap-0.5">
              {trigger("services", "Services")}
              {trigger("solutions", "Who we help")}
              <li><Link href="/work" className={linkCls}>Work</Link></li>
              <li><Link href="/pricing" className={linkCls}>Pricing</Link></li>
              <li><Link href="/blog" className={linkCls}>Blog</Link></li>
              {trigger("company", "Company")}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a href="#login" className={`hidden px-3 text-sm font-medium xl:block ${solid ? "text-slate hover:text-ink" : "text-white/75 hover:text-white"}`}>
              Client login
            </a>
            <Link href="/free-audit" className="btn-green !hidden !rounded-full !px-5 !py-2.5 text-sm whitespace-nowrap sm:!inline-flex">Get my free audit</Link>
            <button
              className={`grid size-11 place-items-center rounded-full transition-colors lg:hidden ${solid || mobile ? "bg-ink text-white" : "bg-white/10 text-white"}`}
              aria-label={mobile ? "Close menu" : "Open menu"}
              aria-expanded={mobile}
              onClick={() => setMobile((o) => !o)}
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2"><path d={mobile ? "M6 6l12 12M18 6 6 18" : "M4 7h16M4 12h16M4 17h16"} /></svg>
            </button>
          </div>

          {/* desktop mega menu */}
          <AnimatePresence>
            {menu && (
              <motion.div
                key={menu}
                id={`menu-${menu}`}
                onMouseEnter={() => openMenu(menu)}
                onMouseLeave={closeSoon}
                initial={{ opacity: 0, y: 10, rotateX: -8 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: 6, transition: { duration: 0.15 } }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformPerspective: 1000, transformOrigin: "50% 0%" }}
                className={`absolute top-[calc(100%+10px)] hidden overflow-hidden rounded-2xl border border-white bg-white/95 text-ink shadow-[0_40px_80px_-30px_rgba(10,12,11,.45)] backdrop-blur-xl lg:block ${
                  menu === "company" ? "right-40 w-[320px]" : "inset-x-0"
                }`}
              >
                {menu === "services" && <ServicesPanel close={close} />}
                {menu === "solutions" && <SolutionsPanel close={close} />}
                {menu === "company" && <CompanyPanel close={close} />}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* mobile menu */}
        <AnimatePresence>
          {mobile && (
            <motion.nav
              aria-label="Mobile"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mx-auto mt-2 max-h-[calc(100dvh-100px)] overscroll-contain max-w-[1180px] overflow-y-auto rounded-2xl border border-white bg-white/97 p-3 text-ink shadow-2xl backdrop-blur-xl lg:hidden"
            >
              {(
                [
                  ["services", "Services"],
                  ["solutions", "Who we help"],
                ] as const
              ).map(([k, label]) => (
                <div key={k} className="border-b border-line last:border-0">
                  <button
                    className="flex w-full items-center justify-between px-4 py-3.5 font-display text-lg font-bold"
                    aria-expanded={mobileSection === k}
                    onClick={() => setMobileSection(mobileSection === k ? null : k)}
                  >
                    {label}
                    <span className={`grid size-7 place-items-center rounded-full border border-line transition-transform ${mobileSection === k ? "rotate-45 bg-ink text-white" : ""}`} aria-hidden="true">+</span>
                  </button>
                  {mobileSection === k && (
                    <div className="grid gap-1 px-1 pb-3">
                      {k === "services"
                        ? services.map((s) => (
                            <Link key={s.slug} href={`/services/${s.slug}`} onClick={close} className="flex items-center gap-3 rounded-2xl p-2.5 hover:bg-paper">
                              <Image src={`/graphics/icons/${s.icon}.webp`} alt="" width={36} height={36} className="size-9" />
                              <span>
                                <span className="block font-semibold">{s.title}</span>
                                <span className="block text-xs text-slate">{s.text}</span>
                              </span>
                            </Link>
                          ))
                        : solutions.map((sol) => (
                            <div key={sol.title} className="rounded-2xl bg-paper p-3">
                              <p className="font-semibold">{sol.title}</p>
                              {sol.links.map((l) => (
                                <Link key={l.label} href={l.href} onClick={close} className="block py-1.5 text-sm text-slate">{l.label}</Link>
                              ))}
                            </div>
                          ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="grid grid-cols-2 gap-1 p-2">
                {[{ label: "Work", href: "/work" }, { label: "Pricing", href: "/pricing" }, ...company.filter((c) => c.href !== "/work")].map((l) => (
                  <Link key={l.href} href={l.href} onClick={close} className="rounded-xl px-3 py-2.5 font-medium hover:bg-paper">{l.label}</Link>
                ))}
              </div>
              <div className="grid gap-2 p-2">
                <Link href="/free-audit" onClick={close} className="btn-green w-full">Get my free audit →</Link>
                <div className="grid grid-cols-2 gap-2">
                  <a href={telHref} className="btn-outline !px-3">Call us</a>
                  <a href="#login" onClick={close} className="btn-outline !px-3">Client login</a>
                </div>
                <p className="text-center text-xs text-slate">For local businesses &amp; online stores</p>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
