/**
 * Every offer and price on the site lives here (pricing page, service pages, menus).
 * Prices are set in both dollars and pounds (not converted, so they stay round numbers).
 * UK visitors see £, everyone else sees $ (see lib/currency.tsx).
 *
 * Monthly plans: 6-month minimum, then month to month. Pay yearly and save 20%.
 * One-time prices (website builds) are never discounted.
 */

export type Money = { usd: number; gbp: number };
export type Currency = "usd" | "gbp";

export const YEARLY_DISCOUNT = 0.2; // 20% off when paid yearly
export const MIN_TERM = "6-month minimum, then month to month";

/** Honest capacity: how many new package clients you take each month. */
export const capacity = { perMonth: 5, left: 5 }; // TODO: lower "left" as spots are taken
/** This month's sign-up bonus on packages. */
export const setupFee: Money = { usd: 497, gbp: 397 };

export const fmt = (m: number | Money, cur: Currency) => {
  const n = typeof m === "number" ? m : m[cur];
  return `${cur === "gbp" ? "£" : "$"}${n.toLocaleString("en-US")}`;
};
export const yearly = (n: number) => Math.round(n * (1 - YEARLY_DISCOUNT));

/* ------------------------------------------------------------------ */
/* Packages: the main offer                                            */
/* ------------------------------------------------------------------ */

export type Package = {
  key: string;
  name: string;
  price: Money; // per month
  for: string;
  outcome: string;
  includes: string[];
  popular?: boolean;
  note?: string;
};

export const packages: Package[] = [
  {
    key: "foundation",
    name: "Foundation",
    price: { usd: 397, gbp: 317 },
    for: "For local businesses that want to stop losing leads",
    outcome: "Never miss a call, chat or review again",
    includes: [
      "CRM + mobile app for every lead",
      "Missed-call text back",
      "AI chatbot on your site and socials",
      "Review automation + AI replies",
      "Google Business Profile optimization",
      "Website hosting",
    ],
  },
  {
    key: "growth",
    name: "Growth",
    price: { usd: 997, gbp: 797 },
    for: "For businesses ready for steady calls, bookings and orders",
    outcome: "More booked jobs and orders, every month",
    popular: true,
    includes: [
      "Everything in Foundation",
      "Free custom website (up to 15 pages)",
      "Local SEO & Google Maps ranking",
      "AI voice agent answering every call",
      "Email & SMS flows that bring customers back",
      "Monthly strategy call + report",
    ],
  },
  {
    key: "scale",
    name: "Scale",
    price: { usd: 1997, gbp: 1597 },
    for: "For businesses that want to own their market",
    outcome: "Grow faster with every channel working together",
    includes: [
      "Everything in Growth",
      "Google & Meta ads management",
      "Social media automation",
      "SEO content every month",
      "Landing pages & conversion tests",
      "Weekly reporting + priority support",
    ],
    note: "Ad spend is paid directly to Google and Meta",
  },
];

/** The flagship's value stack: what each part would cost on its own. */
export const growthStack: { item: string; worth: Money; per: "mo" | "once" }[] = [
  { item: "Business website with full tracking setup", worth: { usd: 297, gbp: 237 }, per: "once" },
  { item: "Local SEO & Google Maps ranking", worth: { usd: 697, gbp: 557 }, per: "mo" },
  { item: "AI voice agent + AI chatbot", worth: { usd: 594, gbp: 474 }, per: "mo" },
  { item: "Email & SMS marketing, done for you", worth: { usd: 397, gbp: 317 }, per: "mo" },
  { item: "Review automation + AI replies", worth: { usd: 197, gbp: 157 }, per: "mo" },
  { item: "CRM, mobile app & missed-call text back", worth: { usd: 197, gbp: 157 }, per: "mo" },
];

export const bonuses: { item: string; worth: Money }[] = [
  { item: "Setup and onboarding, waived this month", worth: setupFee },
  { item: "Competitor audit with a video walkthrough", worth: { usd: 297, gbp: 237 } },
  { item: "90-day growth roadmap", worth: { usd: 297, gbp: 237 } },
];

/**
 * The Starter Bundle: the three things every business needs (website, reviews, email).
 * It is the front door; clients are upsold to Foundation and Growth later.
 */
export const starterBundle: {
  name: string;
  price: Money; // per month
  for: string;
  parts: { item: string; worth: Money; per: "mo" | "once" }[];
  upgradePrice: Money;
} = {
  name: "Starter Bundle",
  price: { usd: 247, gbp: 197 },
  for: "Website, reviews and email marketing: the three things every business needs",
  parts: [
    { item: "Starter website, up to 5 pages, built for you", worth: { usd: 149, gbp: 119 }, per: "once" },
    { item: "Fast, secure website hosting", worth: { usd: 20, gbp: 16 }, per: "mo" },
    { item: "Reputation: review requests, AI replies, review widget", worth: { usd: 197, gbp: 157 }, per: "mo" },
    { item: "Email platform, up to 6,000 contacts", worth: { usd: 49, gbp: 39 }, per: "mo" },
    { item: "Setup: customer list import + 3 email flows written", worth: { usd: 197, gbp: 157 }, per: "once" },
  ],
  upgradePrice: { usd: 148, gbp: 118 }, // Starter -> Business website difference
};

/** The Permanent Promise: only what we fully control. */
export const promise = [
  { title: "Live in 14 days", text: "Your system is set up and running within 14 days of kickoff, or your first month is free." },
  { title: "Every lead answered in 60 seconds", text: "Calls, forms and chats get a reply within 60 seconds, 24/7. If any month misses it, that month is free." },
  { title: "You own everything", text: "Your website, domain, content and data stay yours, even if you leave." },
];
export const promiseSmallPrint = "Kickoff starts once we have your logins and content. Applies to monthly packages.";

/* ------------------------------------------------------------------ */
/* Single services                                                     */
/* ------------------------------------------------------------------ */

export type Tier = {
  name: string;
  price: Money;
  billing: "monthly" | "one-time" | "free";
  blurb: string;
  features: string[];
  popular?: boolean;
  note?: string;
  cta?: string;
  href?: string; // e.g. a payment link; otherwise the contact form opens with the plan filled in
};

export type Offer = {
  key: string;
  title: string;
  short: string;
  icon: string;
  color: string;
  serviceSlug?: string;
  pitch: string;
  tiers: Tier[];
};

export const offers: Offer[] = [
  {
    key: "websites",
    title: "Websites & hosting",
    short: "Websites",
    icon: "website",
    color: "#1fae55",
    serviceSlug: "website-design",
    pitch: "Fast, mobile-first websites built to rank on Google and get recommended by AI search like ChatGPT. Included in the Starter Bundle and in every Growth or Scale package.",
    tiers: [
      {
        name: "Starter website",
        price: { usd: 149, gbp: 119 },
        billing: "one-time",
        blurb: "A clean, fast 5-page site that turns visitors into calls.",
        features: ["Up to 5 pages, designed for your business", "Mobile-first and fast loading", "Contact form & click-to-call", "Basic on-page SEO", "Live in 14 days"],
        note: "+ hosting",
        cta: "Start my website",
      },
      {
        name: "Business website",
        price: { usd: 297, gbp: 237 },
        billing: "one-time",
        blurb: "Everything in Starter, plus full tracking so you know where every lead comes from.",
        features: ["Up to 15 pages, service + location pages", "Google Tag Manager setup", "Google Analytics 4 + Search Console", "Meta Pixel + conversion tracking", "Advanced SEO & schema setup"],
        popular: true,
        note: "Free with Growth and Scale packages",
        cta: "Build my business site",
      },
      {
        name: "Hosting",
        price: { usd: 20, gbp: 16 },
        billing: "monthly",
        blurb: "Keeps your site fast, secure and online.",
        features: ["Fast hosting + SSL", "Daily backups", "Security updates", "Uptime monitoring"],
        cta: "Add hosting",
      },
    ],
  },
  {
    key: "email-platform",
    title: "Email marketing platform",
    short: "Email platform",
    icon: "email",
    color: "#4d8dff",
    serviceSlug: "email-marketing",
    pitch: "The flows, campaigns and automation of the big tools, for less, and in the same app as your leads and customers.",
    tiers: [
      {
        name: "Essential",
        price: { usd: 49, gbp: 39 },
        billing: "monthly",
        blurb: "Professional email for growing lists.",
        features: ["Up to 6,000 contacts", "Drag-and-drop builder", "Automations & flows", "Forms & pop-ups", "Shopify & WooCommerce sync"],
        cta: "Start Essential",
      },
      {
        name: "Growth",
        price: { usd: 79, gbp: 65 },
        billing: "monthly",
        blurb: "For bigger lists, more sends and SMS.",
        features: ["Up to 15,000 contacts", "Everything in Essential", "SMS campaigns", "A/B testing", "Advanced segments & reports"],
        note: "Bigger list? See your price in the calculator below",
        cta: "Start Growth",
      },
      {
        name: "Done for you",
        price: { usd: 397, gbp: 317 },
        billing: "monthly",
        blurb: "We run your email marketing for you, from plan to send.",
        features: ["Platform included (up to 15,000 contacts)", "List import & clean-up", "Welcome, abandoned cart & win-back flows built", "4 campaigns a month, written & designed", "Monthly revenue report"],
        popular: true,
        cta: "Run my email for me",
      },
    ],
  },
  {
    key: "local-seo",
    title: "Local SEO & Google Maps",
    short: "Local SEO",
    icon: "local",
    color: "#f29a00",
    serviceSlug: "local-seo",
    pitch: "Get into the Google Maps top 3, with more calls, more reviews and more people finding you nearby.",
    tiers: [
      {
        name: "Essential",
        price: { usd: 397, gbp: 317 },
        billing: "monthly",
        blurb: "Your Google Business Profile, fully optimized and always active.",
        features: ["Profile optimization", "Weekly posts & photos", "Automated review requests", "Local citations", "Monthly ranking report"],
        cta: "Start Essential",
      },
      {
        name: "Growth",
        price: { usd: 697, gbp: 557 },
        billing: "monthly",
        blurb: "For busy areas and businesses that want to own the map.",
        features: ["Everything in Essential", "Location & service pages", "Map rank grid tracking", "Competitor tracking", "Review replies done for you"],
        popular: true,
        cta: "Start Growth",
      },
    ],
  },
  {
    key: "seo",
    title: "SEO",
    short: "SEO",
    icon: "seo",
    color: "#4d8dff",
    serviceSlug: "seo",
    pitch: "Rank for the searches that bring customers, on Google and in AI answers like ChatGPT.",
    tiers: [
      {
        name: "Local business SEO",
        price: { usd: 797, gbp: 637 },
        billing: "monthly",
        blurb: "For service businesses that want more calls from search.",
        features: ["Keyword & competitor plan", "Service + location pages", "Technical SEO fixes", "4 articles a month", "Monthly report"],
        cta: "Start local SEO",
      },
      {
        name: "Ecommerce SEO",
        price: { usd: 1197, gbp: 957 },
        billing: "monthly",
        blurb: "For online stores that want more orders without more ad spend.",
        features: ["Product & collection SEO", "Product schema for Google Shopping", "Technical store fixes", "6 articles a month", "Revenue-focused reporting"],
        popular: true,
        cta: "Start ecommerce SEO",
      },
    ],
  },
  {
    key: "reputation",
    title: "Reputation management",
    short: "Reviews",
    icon: "reviews",
    color: "#f2a900",
    serviceSlug: "reputation-management",
    pitch: "AI asks every customer for a review at the right moment, so your rating and review count keep climbing.",
    tiers: [
      {
        name: "Reputation",
        price: { usd: 197, gbp: 157 },
        billing: "monthly",
        blurb: "More 5-star reviews on autopilot, and a private line for feedback.",
        features: ["Review requests by SMS & email", "Private feedback form for unhappy customers", "AI review replies", "Review widget for your website", "Alerts for every new review"],
        popular: true,
        cta: "Get more reviews",
      },
    ],
  },
  {
    key: "ai",
    title: "AI chatbots & voice agents",
    short: "AI agents",
    icon: "voice",
    color: "#8b6bff",
    serviceSlug: "ai-automation",
    pitch: "Answer every chat and every call in seconds, 24/7, and book the job before your competitor calls back.",
    tiers: [
      {
        name: "AI chatbot",
        price: { usd: 197, gbp: 157 },
        billing: "monthly",
        blurb: "Replies on your website, Facebook, Instagram, WhatsApp and SMS.",
        features: ["Trained on your business", "Answers questions 24/7", "Books appointments", "Hands off to you anytime"],
        cta: "Start the chatbot",
      },
      {
        name: "AI voice agent",
        price: { usd: 397, gbp: 317 },
        billing: "monthly",
        blurb: "Picks up every call, day or night, in a natural voice.",
        features: ["Answers and qualifies callers", "Books into your calendar", "Call summaries to your phone", "Missed-call text back"],
        popular: true,
        note: "Call minutes billed at cost", // TODO: confirm minutes policy
        cta: "Start the voice agent",
      },
    ],
  },
  {
    key: "social",
    title: "Social media automation",
    short: "Social",
    icon: "social",
    color: "#e0459b",
    serviceSlug: "social-media-automation",
    pitch: "Show up on every channel every week, and answer every comment and DM, without living on your phone.",
    tiers: [
      {
        name: "Social automation",
        price: { usd: 197, gbp: 157 },
        billing: "monthly",
        blurb: "A month of posts planned, scheduled and published for you.",
        features: ["Facebook, Instagram, LinkedIn, TikTok & Google", "12 posts a month planned with you", "AI captions in your voice", "One inbox for comments & DMs", "Monthly performance report"],
        popular: true,
        cta: "Automate my social",
      },
    ],
  },
];

/** Extra services, quoted per project. */
export const moreServices = [
  { title: "Google & Meta Ads", slug: "google-meta-ads", icon: "ads" },
  { title: "Ecommerce Growth", slug: "ecommerce-growth", icon: "shop" },
  { title: "Video & Content", slug: "video-content", icon: "video" },
];

/** Everything clients get inside our platform. */
export const platformFeatures = [
  { title: "One inbox", text: "SMS, email, WhatsApp, Facebook, Instagram and Google chats in one place." },
  { title: "CRM & pipelines", text: "Every lead and customer, with their full history, in one view." },
  { title: "Booking calendars", text: "Online booking with reminders that cut no-shows." },
  { title: "Workflow automation", text: "Follow-ups, reminders and tasks that run on their own." },
  { title: "Missed-call text back", text: "Every missed call gets a text within seconds." },
  { title: "Email & SMS marketing", text: "Campaigns, flows and broadcasts from the same app." },
  { title: "Reviews", text: "Review requests, replies and a review widget for your site." },
  { title: "Social planner", text: "Schedule posts to every channel from one calendar." },
  { title: "Forms & surveys", text: "Capture leads from your website, ads and social." },
  { title: "Invoices & text-to-pay", text: "Send an invoice or a payment link by text and get paid faster." },
  { title: "AI employee", text: "AI that chats, answers calls, writes and books for you." },
  { title: "Mobile app", text: "Reply to leads and see your numbers from your phone." },
  { title: "Reporting & call tracking", text: "See which channels bring calls, leads and sales." },
  { title: "Websites & funnels", text: "Landing pages and sites, hosted on the same platform." },
  { title: "Documents & e-signature", text: "Send proposals and contracts and get them signed online." },
];

/* ------------------------------------------------------------------ */
/* Email savings calculator                                            */
/* ------------------------------------------------------------------ */

/**
 * Competitor list prices (USD/month), read from each vendor's public pricing page on 23 Nov 2026
 * (list price, not promo). Klaviyo = Email plan, Omnisend = Standard, Mailchimp = Standard.
 */
export const emailPriceCheckedOn = "Nov 2026";
/**
 * Public list prices (USD/month) read from each tool's own pricing page, Nov 2026, without promotions:
 * Klaviyo "Email" plan, Omnisend "Standard" plan (3-month total ÷ 3, no upfront discount),
 * Mailchimp "Standard" plan (the price after the intro offer). Mailchimp's Standard plan stops at
 * 100,000 contacts; above that it is Premium by sales quote, so it is left blank (null).
 */
export const contactSteps = [5000, 10000, 15000, 25000, 30000, 50000, 75000, 100000, 150000];
export const competitorPrices: Record<string, (number | null)[]> = {
  Klaviyo: [100, 150, 350, 400, 500, 720, 1070, 1380, 1955],
  Omnisend: [81, 132, 207, 282, 338, 413, 650, 900, 1456],
  Mailchimp: [100, 135, 230, 310, 340, 450, 630, 800, null],
};
/** Our platform price by list size (sends included: up to 6 emails per contact a month). */
export const emailListPrices: { upTo: number; price: Money }[] = [
  { upTo: 6000, price: { usd: 49, gbp: 39 } },
  { upTo: 15000, price: { usd: 79, gbp: 65 } },
  { upTo: 30000, price: { usd: 179, gbp: 143 } },
  { upTo: 50000, price: { usd: 279, gbp: 223 } },
  { upTo: 75000, price: { usd: 379, gbp: 303 } },
  { upTo: 100000, price: { usd: 499, gbp: 399 } },
  { upTo: 150000, price: { usd: 749, gbp: 599 } },
];
/** Our platform price for a list size (USD, to compare like with like). */
export const ourEmailPrice = (contacts: number) => (emailListPrices.find((t) => contacts <= t.upTo) ?? emailListPrices[emailListPrices.length - 1]).price.usd;

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export const offerFor = (serviceSlug: string) => offers.filter((o) => o.serviceSlug === serviceSlug);

/** Lowest price for a service page, for "From …" labels in menus. */
export function fromPrice(serviceSlug: string, cur: Currency) {
  const tiers = offerFor(serviceSlug).flatMap((o) => o.tiers).filter((t) => t.billing !== "free");
  if (!tiers.length) return "";
  // a service sold as a one-time build (websites) shows its build price; others show the monthly price
  const oneTime = tiers.filter((t) => t.billing === "one-time");
  const pool = oneTime.length ? oneTime : tiers.filter((t) => t.billing === "monthly");
  const pick = pool.reduce((a, b) => (b.price[cur] < a.price[cur] ? b : a));
  return `From ${fmt(pick.price, cur)}${pick.billing === "monthly" ? "/mo" : ""}`;
}
