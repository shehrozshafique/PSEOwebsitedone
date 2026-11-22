/**
 * Case studies (/work and /work/[slug]).
 * ⚠ TODO: these are EXAMPLES. Replace with real clients, real numbers and approved quotes before launch.
 * Every page shows an "Example case study" label while `example: true`.
 */

export type CaseStudy = {
  slug: string;
  example: boolean;
  industry: string;
  client: string;
  location: string;
  metric: string;
  sub: string;
  text: string; // short summary for cards
  bg: string;
  accent: string;
  image: string;
  services: { name: string; slug: string }[];
  timeline: string;
  challenge: string[];
  did: { title: string; text: string; when: string }[];
  results: { label: string; before: string; after: string }[];
  quote: { text: string; role: string };
  /** Monthly series for the growth chart. `launch` = index of the first month after the work went live. */
  chart: { title: string; prefix?: string; suffix?: string; months: string[]; values: number[]; launch: number };
};

export const cases: CaseStudy[] = [
  {
    slug: "roofing-company-3x-calls",
    example: true,
    industry: "Roofing",
    client: "Example Roofing Co.",
    location: "Northern Virginia",
    metric: "3× more calls",
    sub: "in the first 90 days",
    text: "New website, Google Maps ranking and missed-call text back. Calls tripled and no lead goes unanswered.",
    bg: "#cfe6ff",
    accent: "#1d4ed8",
    image: "/graphics/case-roofing.webp",
    services: [
      { name: "Website Design", slug: "website-design" },
      { name: "Local SEO & Maps", slug: "local-seo" },
      { name: "AI Automation", slug: "ai-automation" },
    ],
    timeline: "6 weeks to launch, results tracked over 90 days",
    challenge: [
      "A family roofing company with great work and a 10-year-old website that didn’t work on phones.",
      "They showed up on page 2 of Google Maps, and calls that came in after 5 PM went to voicemail and were never returned.",
    ],
    did: [
      { title: "Rebuilt the website", when: "Weeks 1–4", text: "Fast, mobile-first pages for every service and every town they serve, with tap-to-call and a 3-field quote form." },
      { title: "Fixed Google Maps", when: "Weeks 2–6", text: "Optimized their Google Business Profile, added weekly posts and turned on review requests after every job." },
      { title: "Stopped missing leads", when: "Week 5", text: "Missed calls get a text in 5 seconds, and every form gets a reply in under a minute, day or night." },
    ],
    results: [
      { label: "Calls per month", before: "38", after: "114" },
      { label: "Google Maps position", before: "#11", after: "#2" },
      { label: "Google reviews", before: "46", after: "171" },
      { label: "Reply time to new leads", before: "next day", after: "< 1 min" },
    ],
    quote: { text: "We used to lose every call that came in after hours. Now they get a text right away and most of them book.", role: "Owner, roofing company" },
    chart: { title: "Calls per month", months: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"], values: [35, 38, 40, 63, 92, 114], launch: 3 },
  },
  {
    slug: "dental-clinic-142-bookings",
    example: true,
    industry: "Dental clinic",
    client: "Example Dental",
    location: "Maryland",
    metric: "+142 bookings",
    sub: "per month from Google",
    text: "Rebuilt booking flow, local SEO in 4 nearby towns and automatic reminders that cut no-shows in half.",
    bg: "#ffe4c7",
    accent: "#b45309",
    image: "/graphics/case-dental.webp",
    services: [
      { name: "Website Design", slug: "website-design" },
      { name: "Local SEO & Maps", slug: "local-seo" },
      { name: "Google & Meta Ads", slug: "google-meta-ads" },
    ],
    timeline: "4 weeks to launch, results tracked over 6 months",
    challenge: [
      "A growing clinic ready for more patients, but booking meant calling during office hours.",
      "No-shows were high, and they only ranked near their own street, not in the towns around them.",
    ],
    did: [
      { title: "Online booking", when: "Weeks 1–2", text: "Patients book 24/7 from the website and Google profile, with instant confirmation." },
      { title: "Town pages + Maps", when: "Weeks 2–4", text: "A page for each nearby town and a stronger Google profile, so they show up across the area." },
      { title: "Reminders that work", when: "Week 4", text: "Text reminders 1 day and 1 hour before, with an easy reschedule link." },
    ],
    results: [
      { label: "New bookings per month", before: "61", after: "203" },
      { label: "No-show rate", before: "18%", after: "8%" },
      { label: "Towns ranking in Maps top 3", before: "1", after: "5" },
      { label: "Bookings made after hours", before: "0", after: "37%" },
    ],
    quote: { text: "Patients book at 10 at night now. The front desk spends less time on the phone and the calendar is fuller than ever.", role: "Practice manager, dental clinic" },
    chart: { title: "New bookings per month", months: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"], values: [58, 61, 63, 92, 121, 148, 170, 189, 203], launch: 3 },
  },
  {
    slug: "law-firm-rank-1",
    example: true,
    industry: "Law firm",
    client: "Example Law Group",
    location: "Washington, DC area",
    metric: "#1 on Google",
    sub: "for 14 practice-area searches",
    text: "Practice-area pages, AI intake chat and a follow-up system that turns website visits into consultations.",
    bg: "#d7f8e1",
    accent: "#0f7a36",
    image: "/graphics/case-law.webp",
    services: [
      { name: "SEO", slug: "seo" },
      { name: "Website Design", slug: "website-design" },
      { name: "AI Automation", slug: "ai-automation" },
    ],
    timeline: "8 weeks to launch, results tracked over 9 months",
    challenge: [
      "A respected firm relying on referrals, with a website that had one page for six practice areas.",
      "Visitors left without contacting them, and consultation requests sat in an inbox for days.",
    ],
    did: [
      { title: "Practice-area pages", when: "Weeks 1–6", text: "A detailed page for each practice area, written to answer the questions clients actually ask." },
      { title: "AI intake chat", when: "Weeks 5–7", text: "A chat assistant that answers basic questions and books consultations around the clock." },
      { title: "Fast follow-up", when: "Week 8", text: "Every request gets an instant reply and a reminder sequence until the consultation is booked." },
    ],
    results: [
      { label: "Searches ranking #1", before: "0", after: "14" },
      { label: "Website visitors per month", before: "900", after: "4,800" },
      { label: "Consultations per month", before: "9", after: "31" },
      { label: "Time to first reply", before: "2–3 days", after: "< 1 min" },
    ],
    quote: { text: "We finally get found by people who need us, and the chat books consultations while we’re in court.", role: "Managing partner, law firm" },
    chart: { title: "Website visitors per month", months: ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"], values: [880, 900, 910, 1200, 1650, 2300, 2900, 3500, 3900, 4200, 4500, 4800], launch: 3 },
  },
  {
    slug: "skincare-store-68-percent",
    example: true,
    industry: "Online store",
    client: "Example Skincare Co.",
    location: "Shopify · ships US-wide",
    metric: "+68% revenue",
    sub: "from email & SMS in 4 months",
    text: "Faster Shopify store, abandoned-cart and post-purchase flows, and Shopping ads tuned for return on spend.",
    bg: "#e7e0ff",
    accent: "#7b3fbf",
    image: "/graphics/case-store.webp",
    services: [
      { name: "Ecommerce Growth", slug: "ecommerce-growth" },
      { name: "Google & Meta Ads", slug: "google-meta-ads" },
      { name: "Website Design", slug: "website-design" },
    ],
    timeline: "2 weeks for quick wins, results tracked over 4 months",
    challenge: [
      "A growing skincare brand with great products and plenty of traffic, but most visitors left without buying.",
      "Email went out once a month, carts were abandoned with no reminder, and rising ad costs were eating the profit.",
    ],
    did: [
      { title: "Fixed the store", when: "Week 1", text: "Faster pages, clearer product pages and a shorter checkout on mobile." },
      { title: "Turned on the flows", when: "Week 2", text: "Welcome, abandoned cart, post-purchase, review and win-back emails and texts." },
      { title: "Rebuilt the ads", when: "Weeks 2–4", text: "Google Shopping and Meta campaigns judged on return on ad spend, not clicks." },
    ],
    results: [
      { label: "Monthly revenue", before: "$41K", after: "$69K" },
      { label: "Revenue from email & SMS", before: "6%", after: "29%" },
      { label: "Return on ad spend", before: "1.8×", after: "3.4×" },
      { label: "Repeat-customer rate", before: "14%", after: "27%" },
    ],
    quote: { text: "The flows paid for everything in the first month. Customers actually come back now.", role: "Founder, skincare brand" },
    chart: { title: "Monthly revenue", prefix: "$", suffix: "K", months: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"], values: [39, 40, 41, 48, 56, 63, 69], launch: 3 },
  },
];

export const getCase = (slug: string) => cases.find((c) => c.slug === slug);
