/**
 * Pricing page data.
 * ⚠ TODO: every price below is a PLACEHOLDER. Set your real prices before launch.
 */

export const yearlyDiscount = 0.17; // ≈ 2 months free when paid yearly (TODO: confirm)

export type Plan = {
  key: string;
  name: string;
  tagline: string;
  monthly: number; // USD per month
  setup: number; // one-time setup fee, 0 = free
  popular?: boolean;
  color: string;
  stages: string[];
  features: string[];
  cta: string;
};

export const plans: Plan[] = [
  {
    key: "starter",
    name: "Starter",
    tagline: "Get found and never miss a lead.",
    monthly: 497, // TODO
    setup: 0, // TODO
    color: "#4d8dff",
    stages: ["Get Found", "Close Fast"],
    features: [
      "Local SEO & Google Maps",
      "Google Business Profile management",
      "Automatic review requests",
      "Missed-call text back",
      "All leads in one app",
      "Monthly report",
    ],
    cta: "Start with Starter",
  },
  {
    key: "growth",
    name: "Growth",
    tagline: "The full system for steady calls.",
    monthly: 1497, // TODO
    setup: 0, // TODO
    popular: true,
    color: "#1fae55",
    stages: ["Get Found", "Get Leads", "Close Fast", "Automate"],
    features: [
      "Everything in Starter",
      "Website care & monthly improvements",
      "SEO: content and service pages",
      "AI chat assistant on your website",
      "Booking, reminders and follow-ups",
      "Quote follow-ups and pay by text",
      "Monthly strategy call",
    ],
    cta: "Start with Growth",
  },
  {
    key: "scale",
    name: "Scale",
    tagline: "More areas, more ads, more content.",
    monthly: 2997, // TODO
    setup: 0, // TODO
    color: "#8b6bff",
    stages: ["All 5 stages"],
    features: [
      "Everything in Growth",
      "Google & Meta ads management",
      "AI phone answering",
      "New city and service pages",
      "Monthly video & content",
      "Weekly reporting",
      "Priority support",
    ],
    cta: "Talk to us about Scale",
  },
];

/** Comparison table rows. true = included, false = not, string = detail. */
export const compare: { group: string; rows: { label: string; values: (boolean | string)[] }[] }[] = [
  {
    group: "Get Found",
    rows: [
      { label: "Google Business Profile management", values: [true, true, true] },
      { label: "Google Maps ranking", values: [true, true, true] },
      { label: "Website SEO & content", values: [false, true, true] },
      { label: "New city & service pages", values: [false, false, "Monthly"] },
    ],
  },
  {
    group: "Get Leads",
    rows: [
      { label: "Website care & improvements", values: [false, true, true] },
      { label: "Google & Meta ads management", values: [false, false, true] },
      { label: "Landing pages for campaigns", values: [false, false, true] },
    ],
  },
  {
    group: "Close Fast",
    rows: [
      { label: "All leads in one app (mobile too)", values: [true, true, true] },
      { label: "Missed-call text back", values: [true, true, true] },
      { label: "Online booking & reminders", values: [false, true, true] },
      { label: "Quotes, invoices & pay by text", values: [false, true, true] },
    ],
  },
  {
    group: "Automate",
    rows: [
      { label: "Automatic review requests", values: [true, true, true] },
      { label: "AI chat assistant", values: [false, true, true] },
      { label: "AI phone answering", values: [false, false, true] },
      { label: "Email & text campaigns", values: [false, true, true] },
    ],
  },
  {
    group: "Support",
    rows: [
      { label: "Reports", values: ["Monthly", "Monthly", "Weekly"] },
      { label: "Strategy call", values: [false, "Monthly", "Every 2 weeks"] },
      { label: "Support", values: ["Email & chat", "Email & chat", "Priority"] },
    ],
  },
];

/** One-time projects, priced separately. TODO: real "from" prices. */
export const projects = [
  { name: "New website", from: 2997, text: "Custom design, copy, SEO foundations and lead capture. 3–6 weeks.", icon: "website" },
  { name: "Landing page", from: 997, text: "One high-converting page for a service or campaign.", icon: "ads" },
  { name: "Automation setup", from: 1497, text: "Your platform, pipeline, booking and follow-ups set up and tested.", icon: "ai" },
  { name: "Video shoot", from: 1497, text: "One shoot, a batch of short videos and photos for every channel.", icon: "video" },
];

/** What a typical business pays for separate tools. TODO: check these against current prices. */
export const replaces = [
  { tool: "CRM & sales pipeline", cost: 99 },
  { tool: "Booking & reminders", cost: 29 },
  { tool: "Text messaging app", cost: 99 },
  { tool: "Email marketing", cost: 59 },
  { tool: "Review management", cost: 159 },
  { tool: "Website chat", cost: 49 },
  { tool: "Call tracking", cost: 49 },
  { tool: "Invoicing & payments", cost: 30 },
];

export const pricingFaqs = [
  { q: "Is there a contract?", a: "No long-term contract. Plans are month to month, and you can cancel with 30 days’ notice." },
  { q: "Is ad spend included?", a: "No. Ad spend is paid directly to Google or Meta from your card. Our plan covers managing it." },
  { q: "Can I change plans later?", a: "Yes. Move up or down any month as your business changes." },
  { q: "Do I need a new website to start?", a: "No. Many clients start with Starter on their current site. If your site holds you back, we’ll tell you in the audit." },
  { q: "What if I only need one service?", a: "We can quote single services or one-time projects. Start with the free audit and we’ll recommend the smallest plan that works." },
  { q: "What happens if I cancel?", a: "You keep your website, domain, content and data. We help you export anything you need." },
];

export const money = (n: number) => `$${n.toLocaleString("en-US")}`;
