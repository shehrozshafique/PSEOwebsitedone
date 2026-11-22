import type { Post } from "../blog";

export const gbpRanking: Post = {
  slug: "rank-higher-on-google-maps",
  title: "How to rank higher on Google Maps: a plain-English guide for local businesses",
  description:
    "What actually moves your business into the Google Maps top 3: your Business Profile, reviews, your website and consistency. A step-by-step guide for owners.",
  category: "local-seo",
  date: "2026-11-18",
  services: ["local-seo", "website-design"],
  takeaways: [
    "Google ranks Maps results on three things: how relevant you are, how close you are, and how well-known and trusted you are.",
    "Your primary category is the single most important setting in your Business Profile.",
    "A steady flow of fresh reviews beats a burst of reviews once a year.",
    "Your website and your profile have to tell Google the same story.",
  ],
  blocks: [
    { type: "p", text: "When someone near you searches “plumber near me” or “dentist open Saturday”, the three businesses in the map box get most of the calls. Getting into that box isn’t luck. Google tells us what it looks at, and almost all of it is in your control." },
    { type: "h2", text: "How Google decides who shows up" },
    { type: "p", text: "Google’s own help pages name three factors: **relevance** (does your business match the search?), **distance** (how close are you to the searcher?) and **prominence** (how well-known and trusted are you, online and off?). You can’t move your office, so the work is all about relevance and prominence." },
    { type: "h2", text: "Step 1: get your Business Profile exactly right" },
    { type: "list", items: [
      "**Primary category.** Pick the one that describes your main money-making service, not your whole business. “Roofing contractor” beats “Contractor”.",
      "**Secondary categories.** Add every other category you truly offer. Each one is another set of searches you can show up for.",
      "**Services and description.** List your services in the words customers use, and mention the towns you serve once, naturally.",
      "**Hours, phone and website.** Make them match your website exactly, including holiday hours.",
      "**Photos.** Real photos of your team, vehicles, work and location. Add a few every month.",
    ] },
    { type: "callout", tone: "warning", title: "Don’t stuff your business name", text: "Adding keywords to your name (“Joe’s Plumbing – Best Plumber Austin”) can get your profile suspended. Use your real-world business name only." },
    { type: "h2", text: "Step 2: build a steady stream of reviews" },
    { type: "p", text: "Reviews feed prominence, and they decide whether people call you or the business next to you. What matters is a **steady pace** of new reviews, good star ratings, and reviews that mention the service and the town in the customer’s own words." },
    { type: "p", text: "The easiest way to get there is to ask every happy customer at the moment they’re happiest, usually right after the job, with a direct link that opens the review box. This is something we [automate for clients](/services/ai-automation) so nobody has to remember to ask." },
    { type: "checklist", title: "Review habits that work", items: [
      "Send the review link by text within an hour of finishing the job",
      "Reply to every review, good or bad, within two days",
      "Never offer discounts or gifts for reviews (it breaks Google’s rules)",
      "Mention the service in your reply, the way a person would",
    ] },
    { type: "cta" },
    { type: "h2", text: "Step 3: make your website back up your profile" },
    { type: "p", text: "Google cross-checks your profile against your website. Every main service should have its **own page** that explains it, shows your work, and mentions where you do it. If you serve several towns, a genuinely useful page for each one helps too. Thin copy-and-paste town pages don’t." },
    { type: "p", text: "Your name, address and phone number should appear the same way on your website, your profile and the big directories. Small differences (“St.” vs “Street” is fine, an old phone number is not) make Google less sure who you are. Our guide to [service pages that rank](/blog/service-pages-that-rank) goes deeper on this." },
    { type: "h2", text: "Step 4: stay active every week" },
    { type: "p", text: "Profiles that look alive tend to do better: new photos, posts about recent jobs and offers, answered questions and fast review replies. Fifteen minutes a week is enough if you do it every week." },
    { type: "h2", text: "How long does it take?" },
    { type: "p", text: "Fixing your profile can show results within a few weeks. Climbing past established competitors in a busy area usually takes three to six months of steady reviews, content and website work. Anyone promising the #1 spot in a week is guessing, or breaking the rules." },
  ],
  faqs: [
    { q: "Do I need a physical address to rank on Google Maps?", a: "No. Service-area businesses can hide their address and list the areas they serve. You do need a real location where you can receive mail for verification." },
    { q: "Does posting on my Business Profile help ranking?", a: "Posts mostly help people choose you once they see you. Regular activity is a good sign, but categories, reviews and your website matter more for ranking." },
    { q: "Why does my ranking change depending on where I search from?", a: "Distance is one of the three ranking factors, so results change street by street. That’s why we track rankings on a grid across your whole service area, not from one spot." },
  ],
};
