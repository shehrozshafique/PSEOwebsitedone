"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { useCurrency } from "@/lib/currency";
import {
  bonuses,
  capacity,
  competitorPrices,
  contactSteps,
  emailPriceCheckedOn,
  fmt,
  growthStack,
  MIN_TERM,
  ourEmailPrice,
  packages,
  promise,
  promiseSmallPrint,
  setupFee,
  starterBundle,
  YEARLY_DISCOUNT,
  yearly,
  type Currency,
  type Money,
  type Offer,
  type Tier,
} from "@/lib/offers";

const Ctx = createContext<{ yearlyOn: boolean; setYearly: (v: boolean) => void }>({ yearlyOn: false, setYearly: () => {} });

export function BillingProvider({ children }: { children: ReactNode }) {
  const [yearlyOn, setYearly] = useState(false);
  return <Ctx.Provider value={{ yearlyOn, setYearly }}>{children}</Ctx.Provider>;
}

function Pill({ on, onClick, children }: { on: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" role="radio" aria-checked={on} onClick={onClick} className={`relative z-10 flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors sm:px-5 ${on ? "text-white" : "bg-mint text-ink hover:bg-green/25"}`}>
      {on && <span className="absolute inset-0 -z-10 rounded-full bg-ink" />}
      {children}
    </button>
  );
}

/** Monthly / Yearly switch and $ / £ switch. */
export function BillingToggle() {
  const { yearlyOn, setYearly } = useContext(Ctx);
  const [cur, setCur] = useCurrency();
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <div role="radiogroup" aria-label="Billing period" className="inline-flex gap-1 rounded-full bg-white p-1 shadow-sm">
        <Pill on={!yearlyOn} onClick={() => setYearly(false)}>Monthly</Pill>
        <Pill on={yearlyOn} onClick={() => setYearly(true)}>
          Yearly <span className={`text-xs font-bold ${yearlyOn ? "text-green-soft" : "text-green-ink"}`}>Save {Math.round(YEARLY_DISCOUNT * 100)}%</span>
        </Pill>
      </div>
      <CurrencySwitch cur={cur} setCur={setCur} />
    </div>
  );
}

export function CurrencySwitch({ cur, setCur }: { cur: Currency; setCur: (c: Currency) => void }) {
  return (
    <div role="radiogroup" aria-label="Currency" className="inline-flex gap-1 rounded-full bg-white p-1 shadow-sm">
      <Pill on={cur === "usd"} onClick={() => setCur("usd")}>$ USD</Pill>
      <Pill on={cur === "gbp"} onClick={() => setCur("gbp")}>£ GBP</Pill>
    </div>
  );
}

function Monthly({ price, big = "text-5xl" }: { price: Money; big?: string }) {
  const { yearlyOn } = useContext(Ctx);
  const [cur] = useCurrency();
  const base = price[cur];
  const show = yearlyOn ? yearly(base) : base;
  return (
    <div>
      <p className="flex flex-wrap items-baseline gap-x-1.5">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span key={`${cur}${show}`} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }} className={`font-display font-black ${big}`}>
            {fmt(show, cur)}
          </motion.span>
        </AnimatePresence>
        <span className="text-sm opacity-70">/mo</span>
        {yearlyOn && <span className="ml-1 text-sm line-through opacity-50">{fmt(base, cur)}</span>}
      </p>
      <p className="mt-1 text-xs opacity-70">{yearlyOn ? `Billed yearly: ${fmt(show * 12, cur)}` : MIN_TERM}</p>
    </div>
  );
}

function Price({ tier }: { tier: Tier }) {
  const [cur] = useCurrency();
  if (tier.billing === "free") return <p className="font-display text-5xl font-black">Free</p>;
  if (tier.billing === "one-time")
    return (
      <p className="flex items-baseline gap-2">
        <span className="font-display text-5xl font-black">{fmt(tier.price, cur)}</span>
        <span className="text-sm opacity-70">one-time</span>
      </p>
    );
  return <Monthly price={tier.price} />;
}

function Check({ dark }: { dark?: boolean }) {
  return (
    <svg viewBox="0 0 20 20" className={`mt-0.5 size-4 flex-none ${dark ? "text-green-soft" : "text-green-ink"}`} fill="currentColor" aria-hidden="true">
      <path d="M10 0a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-1.3 14.3-4-4 1.4-1.4 2.6 2.6 5.6-5.6 1.4 1.4-7 7Z" />
    </svg>
  );
}

const contactHref = (plan: string) => `/contact?plan=${encodeURIComponent(plan)}`;

/** Plan cards for one single-service offer. */
export function OfferPlans({ offer }: { offer: Offer }) {
  const { yearlyOn } = useContext(Ctx);
  const n = offer.tiers.length;
  const cols = n >= 3 ? "md:grid-cols-3" : n === 2 ? "md:grid-cols-2" : "mx-auto w-full md:max-w-[520px]";
  return (
    <div className={`grid gap-4 ${cols}`}>
      {offer.tiers.map((t) => {
        const dark = !!t.popular;
        const plan = `${offer.title}: ${t.name}${t.billing === "monthly" && yearlyOn ? " (yearly)" : ""}`;
        return (
          <div key={t.name} className={`relative flex h-full flex-col rounded-2xl p-6 sm:p-7 ${dark ? "bg-ink text-white" : "bg-mint/70 text-ink"}`}>
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-xl font-bold">{t.name}</h3>
              {t.popular && n > 1 && <span className="text-sm font-semibold whitespace-nowrap text-green-soft">Most popular</span>}
            </div>
            <p className={`mt-1 text-[15px] ${dark ? "text-mist" : "text-slate"}`}>{t.blurb}</p>
            <div className="mt-6">
              <Price tier={t} />
              {t.note && <p className={`mt-2 text-xs ${dark ? "text-white/60" : "text-slate"}`}>{t.note}</p>}
            </div>
            <ul className="mt-6 grid flex-1 content-start gap-2.5 text-[15px]">
              {t.features.map((f) => (
                <li key={f} className="flex gap-2.5">
                  <Check dark={dark} />
                  {f}
                </li>
              ))}
            </ul>
            <Link href={t.href ?? contactHref(plan)} className={`${dark ? "btn-green" : "btn-ink"} mt-7 w-full`}>
              {t.cta ?? "Get started"} →
            </Link>
          </div>
        );
      })}
    </div>
  );
}

/** The three packages (the main offer). */
export function PackagePlans() {
  const { yearlyOn } = useContext(Ctx);
  return (
    <div className="grid gap-4 lg:grid-cols-3 lg:items-stretch">
      {packages.map((p) => {
        const dark = !!p.popular;
        return (
          <div key={p.key} className={`relative flex h-full flex-col rounded-2xl p-6 sm:p-8 ${dark ? "bg-ink text-white lg:-my-4 lg:py-12" : "bg-mint/70 text-ink"}`}>
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-2xl font-extrabold">{p.name}</h3>
              {p.popular && <span className="text-sm font-semibold text-green-soft">Most popular</span>}
            </div>
            <p className={`mt-1 text-[15px] ${dark ? "text-mist" : "text-slate"}`}>{p.for}</p>
            <div className="mt-6">
              <Monthly price={p.price} big="text-5xl md:text-6xl" />
            </div>
            <p className={`mt-6 font-display text-lg font-bold ${dark ? "text-green-soft" : "text-green-ink"}`}>{p.outcome}</p>
            <ul className="mt-4 grid flex-1 content-start gap-2.5 text-[15px]">
              {p.includes.map((f) => (
                <li key={f} className="flex gap-2.5">
                  <Check dark={dark} />
                  {f}
                </li>
              ))}
            </ul>
            {p.note && <p className={`mt-4 text-xs ${dark ? "text-white/60" : "text-slate"}`}>{p.note}</p>}
            <Link href={contactHref(`${p.name} package${yearlyOn ? " (yearly)" : ""}`)} className={`${dark ? "btn-green" : "btn-ink"} mt-7 w-full`}>
              Start with {p.name} →
            </Link>
          </div>
        );
      })}
    </div>
  );
}

/** Growth value stack + bonuses: what it would cost to buy everything separately. */
export function ValueStack() {
  const [cur] = useCurrency();
  const monthlyWorth = growthStack.filter((s) => s.per === "mo").reduce((a, s) => a + s.worth[cur], 0);
  const onceWorth = growthStack.filter((s) => s.per === "once").reduce((a, s) => a + s.worth[cur], 0) + bonuses.reduce((a, b) => a + b.worth[cur], 0);
  const growth = packages.find((p) => p.key === "growth")!;
  return (
    <div className="grid gap-8 rounded-2xl bg-ink p-6 text-white sm:p-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-14">
      <div>
        <h3 className="font-display text-3xl font-extrabold md:text-4xl">Everything in Growth, priced one by one</h3>
        <ul className="mt-6 divide-y divide-white/10">
          {growthStack.map((s) => (
            <li key={s.item} className="flex items-baseline justify-between gap-4 py-3 text-[15px]">
              <span className="flex gap-2.5"><Check dark />{s.item}</span>
              <span className="flex-none text-mist">{fmt(s.worth, cur)}{s.per === "mo" ? "/mo" : ""}</span>
            </li>
          ))}
        </ul>
        <p className="mt-8 font-display text-xl font-bold text-green-soft">Bonuses when you join this month</p>
        <ul className="mt-2 divide-y divide-white/10">
          {bonuses.map((b) => (
            <li key={b.item} className="flex items-baseline justify-between gap-4 py-3 text-[15px]">
              <span className="flex gap-2.5"><Check dark />{b.item}</span>
              <span className="flex-none text-mist line-through decoration-white/40">{fmt(b.worth, cur)}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col justify-center rounded-2xl bg-white/[0.06] p-6 sm:p-8">
        <p className="text-sm text-mist">Bought separately</p>
        <p className="mt-1 font-display text-3xl font-black text-white/60 line-through decoration-white/40">
          {fmt(monthlyWorth, cur)}/mo + {fmt(onceWorth, cur)}
        </p>
        <p className="mt-6 text-sm text-mist">With the Growth package</p>
        <p className="font-display text-6xl font-black text-green-soft">{fmt(growth.price, cur)}<span className="text-xl font-semibold text-white">/mo</span></p>
        <p className="mt-2 text-sm text-mist">Website, setup and bonuses included. {MIN_TERM}.</p>
        <p className="mt-6 rounded-xl bg-white/[0.06] px-4 py-3 text-sm">
          <b className="text-white">{capacity.left} of {capacity.perMonth}</b> <span className="text-mist">new client spots left this month, so every client gets our full attention.</span>
        </p>
        <Link href={contactHref("Growth package")} className="btn-green mt-6 w-full">Claim a Growth spot →</Link>
        <p className="mt-3 text-center text-xs text-white/50">Setup normally {fmt(setupFee, cur)}, waived this month</p>
      </div>
    </div>
  );
}

/** The Starter Bundle: website + reviews + email, the front-door offer for every business. */
export function StarterBundle({ compact = false }: { compact?: boolean }) {
  const { yearlyOn } = useContext(Ctx);
  const [cur] = useCurrency();
  const b = starterBundle;
  const monthlyWorth = b.parts.filter((x) => x.per === "mo").reduce((a, x) => a + x.worth[cur], 0);
  const onceWorth = b.parts.filter((x) => x.per === "once").reduce((a, x) => a + x.worth[cur], 0);
  return (
    <div className={`grid gap-8 rounded-2xl bg-mint/60 ring-2 ring-green/40 ${compact ? "p-6 sm:p-8" : "p-6 sm:p-10"} lg:grid-cols-[1.1fr_.9fr] lg:gap-14`}>
      <div>
        <p className="font-display text-lg font-bold text-green-ink">Most businesses start here</p>
        <h3 className="mt-1 font-display text-3xl font-extrabold md:text-4xl">{b.name}</h3>
        <p className="mt-2 text-[15px] text-slate md:text-base">{b.for}. Get found, get reviewed, and bring past customers back, all in one app.</p>
        <ul className="mt-6 divide-y divide-ink/10">
          {b.parts.map((x) => (
            <li key={x.item} className="flex items-baseline justify-between gap-4 py-3 text-[15px]">
              <span className="flex gap-2.5"><Check />{x.item}</span>
              <span className="flex-none text-slate">{fmt(x.worth, cur)}{x.per === "mo" ? "/mo" : ""}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col justify-center rounded-2xl bg-white p-6 sm:p-8">
        <p className="text-sm text-slate">Bought separately</p>
        <p className="mt-1 font-display text-2xl font-black text-slate/70 line-through decoration-slate/40">
          {fmt(monthlyWorth, cur)}/mo + {fmt(onceWorth, cur)}
        </p>
        <p className="mt-5 text-sm text-slate">In the bundle</p>
        <Monthly price={b.price} big="text-5xl md:text-6xl" />
        <p className="mt-3 text-sm text-slate">Website build and setup included free.</p>
        <Link href={contactHref(`${b.name}${yearlyOn ? " (yearly)" : ""}`)} className="btn-green mt-6 w-full">Start the {b.name} →</Link>
        <p className="mt-4 text-center text-xs text-slate">
          Want the Business website with full tracking (GA4, Tag Manager, Pixel)? Add it for {fmt(b.upgradePrice, cur)} one-time.
        </p>
      </div>
    </div>
  );
}

/** The Permanent Promise (guarantee). */
export function PermanentPromise({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`rounded-2xl border-2 border-green/40 bg-mint/50 ${compact ? "p-6" : "p-6 sm:p-10"}`}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <h3 className="font-display text-2xl font-extrabold md:text-3xl">The Permanent Promise</h3>
        <p className="text-sm text-slate">Three things we guarantee, in writing</p>
      </div>
      <ul className="mt-6 grid gap-4 md:grid-cols-3">
        {promise.map((p) => (
          <li key={p.title} className="rounded-xl bg-white p-5">
            <p className="flex items-center gap-2 font-display text-lg font-bold">
              <span className="grid size-7 place-items-center rounded-full bg-green text-[#03150a]" aria-hidden="true">
                <svg viewBox="0 0 20 20" className="size-4" fill="currentColor"><path d="M8.2 14.6 3.6 10l1.4-1.4 3.2 3.2 6.8-6.8 1.4 1.4z" /></svg>
              </span>
              {p.title}
            </p>
            <p className="mt-2 text-[15px] text-slate">{p.text}</p>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-slate">{promiseSmallPrint}</p>
    </div>
  );
}

/** "How much would you save?" for the email platform (USD list prices, like for like). */
export function EmailSavings() {
  const { yearlyOn } = useContext(Ctx);
  const tools = Object.keys(competitorPrices);
  const [i, setI] = useState(5); // 50,000 contacts
  const [tool, setTool] = useState(tools[0]);
  const contacts = contactSteps[i];
  const n = (c: number) => c.toLocaleString("en-US");
  const usd = (v: number) => fmt(v, "usd");
  const oursMonthly = ourEmailPrice(contacts);
  const ours = yearlyOn ? yearly(oursMonthly) : oursMonthly;
  const theirs = competitorPrices[tool][i];
  const diff = theirs == null ? 0 : theirs - ours;
  const pct = theirs ? Math.round((diff / theirs) * 100) : 0;
  // every tool at this list size, for the side-by-side bars
  const rows = [...tools.map((t) => ({ name: t, price: competitorPrices[t][i] })), { name: "Our platform", price: ours }];
  const max = Math.max(...rows.map((r) => r.price ?? 0));

  return (
    <div className="rounded-2xl bg-ink p-6 text-white sm:p-8 md:p-10">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <h3 className="font-display text-2xl font-bold md:text-3xl">The bigger your list, the more you save</h3>
          <p className="mt-2 text-[15px] text-mist">Big email tools charge more for every contact you add. Our Growth plan is one flat price with unlimited contacts, so a growing list never costs you more. Move the slider to your list size.</p>
          <label className="mt-7 block">
            <span className="flex items-baseline justify-between text-sm text-mist">
              Contacts <b className="font-display text-2xl font-black text-white">{n(contacts)}</b>
            </span>
            <input type="range" min={0} max={contactSteps.length - 1} step={1} value={i} onChange={(e) => setI(Number(e.target.value))} className="mt-3 w-full accent-green" aria-valuetext={`${n(contacts)} contacts`} />
            <span className="mt-1 flex justify-between text-xs text-white/50">
              <span>{n(contactSteps[0])}</span>
              <span>{n(contactSteps[contactSteps.length - 1])}</span>
            </span>
          </label>
          <p className="mt-6 text-sm text-mist">Compare with</p>
          <div className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label="Your current email tool">
            {tools.map((t) => (
              <button key={t} type="button" role="radio" aria-checked={tool === t} onClick={() => setTool(t)} className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${tool === t ? "bg-white text-ink" : "bg-white/10 text-white hover:bg-white/15"}`}>
                {t}
              </button>
            ))}
          </div>

          {/* every tool at this list size */}
          <ul className="mt-7 space-y-3" aria-label={`Monthly price for ${n(contacts)} contacts`}>
            {rows.map((r) => {
              const us = r.name === "Our platform";
              return (
                <li key={r.name}>
                  <div className="flex items-baseline justify-between text-sm">
                    <span className={us ? "font-semibold text-green-soft" : r.name === tool ? "text-white" : "text-mist"}>{r.name}</span>
                    <span className={`font-display font-bold ${us ? "text-green-soft" : "text-white"}`}>{r.price == null ? "Sales quote" : `${usd(r.price)}/mo`}</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className={`h-full rounded-full ${us ? "bg-green" : r.name === tool ? "bg-white/70" : "bg-white/30"}`}
                      initial={false}
                      animate={{ width: r.price == null ? "100%" : `${Math.max(4, (r.price / max) * 100)}%` }}
                      transition={{ type: "spring", stiffness: 160, damping: 24 }}
                      style={r.price == null ? { opacity: 0.25 } : undefined}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white/[0.06] p-6 md:p-8">
          {theirs == null ? (
            <>
              <p className="text-sm text-mist">At {n(contacts)} contacts</p>
              <p className="mt-2 text-[17px] leading-relaxed text-white">
                {tool}’s Standard plan stops at 100,000 contacts. Above that you move to Premium, priced by a sales quote. Ours is a fixed {usd(ours)} a month.
              </p>
            </>
          ) : diff > 0 ? (
            <>
              <p className="text-sm text-mist">Switch from {tool} and save</p>
              <p className="mt-1 font-display text-[clamp(44px,7vw,68px)] font-black leading-none text-green-soft">{usd(diff * 12)}</p>
              <p className="mt-2 text-lg font-semibold">a year, {pct}% less</p>
              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                <div>
                  <p className="text-sm text-mist">{tool}</p>
                  <p className="mt-1 font-display text-2xl font-black">{usd(theirs)}<span className="text-sm font-medium text-mist">/mo</span></p>
                </div>
                <div>
                  <p className="text-sm text-mist">Our platform{yearlyOn ? ", paid yearly" : ""}</p>
                  <p className="mt-1 font-display text-2xl font-black text-green-soft">{usd(ours)}<span className="text-sm font-medium text-mist">/mo</span></p>
                </div>
              </div>
              <p className="mt-5 text-sm text-mist">That’s {usd(diff)} back in your pocket every month, plus CRM, SMS and automation in the same app.</p>
            </>
          ) : (
            <p className="text-[15px] leading-relaxed text-mist">
              At {n(contacts)} contacts, {tool} costs about the same on price alone. Our platform also includes CRM, SMS and automation in the same app, and the gap grows in your favour as your list grows.
            </p>
          )}
          <Link href="/contact?plan=Email%20platform" className="mt-7 inline-flex items-center justify-center rounded-full bg-green px-6 py-3.5 font-semibold text-ink transition-transform hover:-translate-y-0.5">
            Move my list for free →
          </Link>
        </div>
      </div>
      <p className="mt-6 text-xs leading-relaxed text-white/45">
        Compared in US dollars. Competitor prices are public list prices checked {emailPriceCheckedOn}, without promotions: Klaviyo Email plan, Omnisend Standard plan and Mailchimp Standard plan. They can change. Our prices include up to 6 emails per contact each month.
      </p>
    </div>
  );
}
