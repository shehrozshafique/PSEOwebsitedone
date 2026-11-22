/**
 * About page content.
 * ⚠ TODO: replace the story, founder details and team with your real ones.
 * Add real photos to /public/team/ and set `photo` (e.g. "/team/founder.webp").
 */

export const story = {
  // TODO: your real story, in your words
  title: "We started because great local businesses were losing to worse ones",
  paragraphs: [
    "Again and again we saw the same thing: a business with excellent work and happy customers, losing calls to a competitor who simply showed up higher on Google and answered the phone faster.",
    "The fix wasn’t one more tool or one more agency. It was one connected system: get found, get the lead, reply in seconds, follow up, and ask for the review. So that’s what we built.",
    "Today we run that system for local and service businesses, and we measure ourselves the way owners do: calls, bookings and revenue.",
  ],
};

export const founders = [
  // TODO: add surnames if you want them shown, and photos in /public/team/ (e.g. "/team/shehroz.webp")
  { name: "Shehroz", role: "Co-founder & CEO", photo: "" },
  { name: "Mehroz", role: "Co-founder & CEO", photo: "" },
];
export const foundersNote = "Every free audit is reviewed personally by one of us, not by an automated tool.";

/** Blog author and the person named in structured data. */
export const founder = founders[0];

export const values = [
  { title: "Results over vanity", text: "We report calls, bookings and revenue. Not likes, impressions or jargon.", color: "#1fae55" },
  { title: "One system, not ten tools", text: "Website, Google, follow-up and automation connected and working together.", color: "#4d8dff" },
  { title: "Plain English", text: "You always know what we’re doing, why, and what it’s doing for your business.", color: "#f29a00" },
  { title: "You own everything", text: "Your website, domain, content and data stay yours. No hostage situations.", color: "#8b6bff" },
];

export const versus = [
  { topic: "What they report", them: "Rankings, clicks, impressions", us: "Calls, bookings and revenue" },
  { topic: "Contracts", them: "6–12 month lock-in", us: "Month to month" },
  { topic: "Tools", them: "Separate apps you pay for", us: "One app, included" },
  { topic: "Lead follow-up", them: "Your problem", us: "Automatic, in under a minute" },
  { topic: "Who you talk to", them: "A new account manager every few months", us: "The people doing the work" },
  { topic: "Ownership", them: "They keep the site and accounts", us: "You own everything" },
];

// TODO: real team (or remove this section until you have one)
export const team = [
  { name: "Team member", role: "Web Design & Development", color: "#1fae55", icon: "website", photo: "" },
  { name: "Team member", role: "SEO & Local Search", color: "#4d8dff", icon: "seo", photo: "" },
  { name: "Team member", role: "Ads & Content", color: "#ff6a4a", icon: "ads", photo: "" },
  { name: "Team member", role: "Automation & CRM", color: "#8b6bff", icon: "ai", photo: "" },
];
