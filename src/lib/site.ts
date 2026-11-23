/**
 * All homepage words live here, so copy can change without touching layout.
 *
 * ⚠ PLACEHOLDER content is marked with `// TODO:` — brand name, contact details,
 * stats, case studies and testimonials must be replaced with real ones before launch.
 */

export const site = {
  name: "Permanent SEO", // TODO: confirm agency name (also used as the CRM name)
  platformName: "Permanent SEO Platform", // the white-label CRM, always under the agency's brand
  phone: "+44 7700 175150", // business line (connected to the CRM for calls, texts and automations)
  email: "admin@permanentseo.com",
  rating: "4.9", // TODO: real Google rating
  audience: "local businesses and online stores", // TODO: confirm who the site is for
  url: "https://permanentseo.com", // used for canonical links, sitemap and SEO schema
  areaServed: ["United Kingdom", "United States"], // countries we work in
  hours: "Mon–Fri, 9 AM – 6 PM", // TODO: real business hours (and time zone)
  bookingUrl: "", // TODO: CRM booking calendar link; the Book a call buttons appear once this is set
  legalName: "Permanent SEO LLC", // TODO: your registered business name
  companyNumber: "", // TODO: registration number; shown on the contact page once set
  address: "Street, City, State ZIP", // TODO: business mailing address
  governingState: "Virginia", // TODO: state whose laws govern the Terms
};

export const nav = [
  { label: "Growth System", href: "/#growth" },
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/work" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

export const stages = [
  {
    key: "found",
    label: "Get Found",
    color: "#4d8dff",
    title: "Show up where buyers search",
    text: "Rank on Google Search, Google Maps and Shopping, so customers find your business or your products before a competitor’s.",
    items: ["SEO for your website", "Google Maps ranking", "Product & category SEO", "Google Business Profile", "Show up in AI search", "Monthly ranking report"],
    chat: { them: "“best vegan skincare” · “plumber near me”", us: "You’re in the top 3 for both" },
  },
  {
    key: "leads",
    label: "Get Leads",
    color: "#1fae55",
    title: "Turn visitors into calls and orders",
    text: "Fast websites, landing pages and Shopify stores built to convert, plus Google, Meta and TikTok ads that bring buyers, not clicks.",
    items: ["Website & Shopify design", "Landing pages", "Google & Shopping ads", "Meta & TikTok ads", "Quote forms & checkout", "Call & sales tracking"],
    chat: { them: "New order · $186.40", us: "From your Google Shopping ad" },
  },
  {
    key: "close",
    label: "Close Fast",
    color: "#f29a00",
    title: "Never lose a lead or a cart",
    text: "Missed calls get a text back, quotes get followed up, and abandoned carts get a reminder, so the sale doesn’t slip away.",
    items: ["All leads in one inbox", "Missed-call text back", "Online booking", "Abandoned cart recovery", "Quotes & invoices", "Pay by text"],
    chat: { them: "Cart left with 2 items", us: "Reminder sent: “Still thinking? Here’s 10% off”" },
  },
  {
    key: "automate",
    label: "Automate",
    color: "#8b6bff",
    title: "Let the busywork run itself",
    text: "AI answers chats and calls 24/7. Welcome, post-purchase, review and win-back emails and texts go out on their own.",
    items: ["AI chat & phone answering", "Email & SMS flows", "Post-purchase follow-ups", "Review requests", "Win-back campaigns", "Weekly reports"],
    chat: { them: "New lead · 11:48 PM", us: "AI replied, answered 3 questions, booked a call" },
  },
  {
    key: "scale",
    label: "Scale",
    color: "#ff6a4a",
    title: "Grow what already works",
    text: "When the system is working, we add new cities, products and channels, scale the ads that pay back, and track every dollar.",
    items: ["New city & product pages", "Scale winning ads", "Video & UGC content", "New sales channels", "Repeat-customer growth", "Monthly strategy call"],
    chat: { them: "Revenue this month", us: "+38% vs last month" },
  },
];

// TODO: replace with verified client results
export const stats = [
  { lead: "Up to", value: 3, suffix: "×", label: "more calls for local clients after 90 days", bg: "#ffffff" },
  { lead: "Average", value: 68, suffix: "%", label: "lift in online store revenue from email & SMS", bg: "#ffd9ec" },
  { lead: "Under", value: 60, suffix: "s", label: "to reply to every new lead, day or night", bg: "#cfe6ff" },
  { lead: "Rated", value: 4.9, suffix: "★", label: "average rating from our clients", bg: "linear-gradient(135deg, #8cf08b 0%, #72e582 45%, #56c76c 100%)", decimals: 1 },
];

export const services = [
  { slug: "website-design", title: "Website Design & Hosting", text: "Fast websites built to rank on Google and ChatGPT and turn visitors into calls.", color: "#1fae55", size: "lg", icon: "website" },
  { slug: "email-marketing", title: "Email Marketing", text: "An affordable email platform, or we run your email and SMS for you.", color: "#4d8dff", size: "md", icon: "email" },
  { slug: "local-seo", title: "Local SEO & Google Maps", text: "Get into the Maps top 3 for more calls, reviews and visibility.", color: "#f29a00", size: "md", icon: "local" },
  { slug: "seo", title: "SEO", text: "Rank for the searches that bring buyers, for local businesses and stores.", color: "#4d8dff", size: "md", icon: "seo" },
  { slug: "reputation-management", title: "Reputation & Reviews", text: "AI asks every customer for a review and replies for you.", color: "#f2a900", size: "md", icon: "reviews" },
  { slug: "ai-automation", title: "AI Chatbots & Voice Agents", text: "Every chat and call answered in seconds, 24/7, and booked.", color: "#8b6bff", size: "md", icon: "chatbot" },
  { slug: "social-media-automation", title: "Social Media Automation", text: "Schedule everywhere, AI captions and one inbox for every DM.", color: "#e0459b", size: "md", icon: "social" },
];

// Case studies live in ./cases.ts (re-exported here so older imports keep working)
export { cases } from "./cases";

export const process = [
  { step: "Free audit", time: "Day 1", text: "We review your website or store, Google ranking, ads and follow-up, and show you what to fix first." },
  { step: "Plan", time: "Week 1", text: "A clear plan with goals, timeline and price. You know exactly what you get." },
  { step: "Build", time: "Weeks 2–6", text: "We build your website, set up your platform and turn on the automations." },
  { step: "Grow", time: "Every month", text: "We improve rankings, ads and follow-ups, and report results every month." },
];

// TODO: replace with real client testimonials (ideally video)
export const testimonials = [
  { quote: "We used to miss half our calls. Now every lead gets a text back and our calendar is full.", name: "Client name", role: "Owner, HVAC company", bg: "#cfe6ff" },
  { quote: "Our new website finally looks like the business we are, and it ranks. Calls went up in the first month.", name: "Client name", role: "Founder, landscaping company", bg: "#e7e0ff" },
  { quote: "The abandoned-cart and post-purchase flows paid for everything in the first month. Repeat orders are way up.", name: "Client name", role: "Founder, online skincare brand", bg: "#ffd9ec" },
];

export const faqs = [
  { q: "How fast will I see results?", a: "Instant replies, missed-call text back and abandoned-cart flows work from day one. Ads usually bring leads and sales in the first 2–4 weeks. SEO and Google Maps rankings build over 3–6 months." },
  { q: "What do I get in the free audit?", a: "A short video and report on your website speed, Google ranking, Google Business Profile, and how quickly you reply to leads, with the top 5 fixes in order." },
  { q: "Do I own my website?", a: "Yes. Your website, domain and content belong to you." }, // TODO: confirm policy
  { q: "Do I have to sign a long contract?", a: "No. Plans are month to month after the setup project." }, // TODO: confirm policy
  { q: "Do I need to learn new software?", a: "No. We set everything up. You get one simple app on your phone to see leads, reply and get paid." },
  { q: "Do you work with my type of business?", a: "We work with two kinds of clients: local service businesses (home services, clinics, law firms, contractors) and online stores (Shopify and DTC brands). Book the free audit and we’ll tell you honestly if we’re a fit." },
];

export const footerServices = [
  { label: "Website Design & Hosting", href: "/services/website-design" },
  { label: "Email Marketing", href: "/services/email-marketing" },
  { label: "Local SEO & Maps", href: "/services/local-seo" },
  { label: "SEO", href: "/services/seo" },
  { label: "Reputation & Reviews", href: "/services/reputation-management" },
  { label: "AI Chatbots & Voice", href: "/services/ai-automation" },
  { label: "Social Media Automation", href: "/services/social-media-automation" },
];
export const footerCompany = [
  { label: "About", href: "/about" },
  { label: "Our work", href: "/work" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];
export const footerStart = [
  { label: "Free audit", href: "/free-audit" },
  { label: "Pricing", href: "/pricing" },
  { label: "Book a call", href: "/contact#book" },
  { label: "Client login", href: "#login" },
];

/** Social profiles shown in the footer. TODO: paste your profile links; an icon only becomes a link once its url is set. */
export const socials: { platform: "instagram" | "linkedin" | "x" | "facebook" | "tiktok" | "youtube"; url: string }[] = [
  { platform: "instagram", url: "" },
  { platform: "linkedin", url: "" },
  { platform: "x", url: "" },
  { platform: "facebook", url: "" },
  { platform: "tiktok", url: "" },
  { platform: "youtube", url: "" },
];
