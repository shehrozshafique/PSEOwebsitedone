import type { Post } from "../blog";

export const callTracking: Post = {
  slug: "google-ads-call-tracking",
  title: "Are your Google Ads working? How to track calls, forms and booked jobs",
  description:
    "Clicks don’t pay the bills. How to track every call, form and booking from your ads, so you know exactly which campaigns bring customers and which waste money.",
  category: "ads",
  date: "2026-10-28",
  services: ["google-meta-ads"],
  takeaways: [
    "Clicks and impressions don’t tell you if ads are working. Calls, bookings and sales do.",
    "Track phone calls from ads and from your website, not just form fills.",
    "Feed real outcomes (booked, sold) back to Google so it finds more people like your best customers.",
    "Review search terms weekly and cut the ones that never turn into customers.",
  ],
  blocks: [
    { type: "p", text: "Many business owners spend thousands on ads and get a monthly report full of clicks, impressions and “engagement”. None of that answers the only question that matters: **how many customers did this money bring in?**" },
    { type: "h2", text: "What you should be tracking" },
    { type: "table", head: ["Track this", "Why it matters"], rows: [
      ["Calls from ads", "Many local customers call instead of filling out a form"],
      ["Calls from your website", "People often click an ad, read your site, then call"],
      ["Form submissions and bookings", "Your clearest sign of intent"],
      ["Booked jobs and sales", "What actually pays for the ads"],
      ["Cost per booked job", "The number to judge every campaign by"],
    ] },
    { type: "h2", text: "How call tracking works" },
    { type: "p", text: "Call tracking shows a special number to people who come from an ad, then forwards those calls to your normal phone. You see which campaign, ad and search led to each call, how long it lasted, and whether it turned into a booking. Customers notice nothing different." },
    { type: "callout", tone: "tip", title: "Count real calls only", text: "Set a minimum call length (for example 60 seconds) before a call counts as a lead. That keeps wrong numbers and quick hang-ups out of your results." },
    { type: "cta" },
    { type: "h2", text: "Close the loop: tell Google who became a customer" },
    { type: "p", text: "Google’s bidding gets smarter when it knows which leads turned into real jobs. When your CRM marks a lead as **booked** or **sold**, that result can be sent back to Google Ads. Over time, your budget shifts toward the searches and people that bring paying customers, not just clicks." },
    { type: "h2", text: "A weekly 15-minute check" },
    { type: "checklist", title: "Every week", items: [
      "Read the search terms report and exclude anything irrelevant",
      "Compare cost per booked job across campaigns",
      "Listen to a few call recordings to check lead quality",
      "Pause ads that spend money without bringing bookings",
    ] },
    { type: "h2", text: "What good reporting looks like" },
    { type: "p", text: "Your monthly report should fit on one page: money spent, calls and forms, booked jobs, revenue where you know it, and cost per booked job, compared with last month. If your current report can’t tell you that, the tracking needs fixing before the budget goes up. It’s the first thing we set up in our [ads service](/services/google-meta-ads)." },
  ],
  faqs: [
    { q: "Will a tracking number confuse my customers or hurt my Google listing?", a: "No. Tracking numbers on your website and ads forward to your real number, and your main number stays on your Google Business Profile, set up the way Google recommends." },
    { q: "How much should I spend on Google Ads?", a: "Start with a budget you can keep for at least two to three months, then decide based on cost per booked job. If each job is profitable at that cost, increase spend gradually." },
    { q: "Should I run Meta (Facebook and Instagram) ads too?", a: "Google catches people already searching. Meta builds demand and works well for offers, ecommerce and retargeting. Many businesses start with Google, then add Meta." },
  ],
};
