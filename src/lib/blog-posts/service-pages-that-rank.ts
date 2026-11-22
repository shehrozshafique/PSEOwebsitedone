import type { Post } from "../blog";

export const servicePages: Post = {
  slug: "service-pages-that-rank",
  title: "Service pages that rank: the page structure we use for every client",
  description:
    "One page per service, written for the customer and clear to Google. The exact structure we use, what to put in each section, and the mistakes to avoid.",
  category: "seo",
  date: "2026-11-04",
  services: ["seo", "website-design"],
  takeaways: [
    "Each main service deserves its own page. One “Services” page can’t rank for everything.",
    "Write for the person deciding, then make sure Google understands the page.",
    "Proof (photos, reviews, results) and a clear next step turn visitors into calls.",
    "Thin copy-and-paste pages hurt more than they help.",
  ],
  blocks: [
    { type: "p", text: "If all your services sit on one page, Google has to guess which one to show you for. Usually it shows a competitor instead. A dedicated page for each service is the single biggest SEO upgrade most small business websites can make." },
    { type: "h2", text: "The structure" },
    { type: "table", head: ["Section", "What goes in it"], rows: [
      ["Headline", "The service and the place, in plain words: “Roof repair in Austin”"],
      ["First paragraph", "Who it’s for, the problem you solve and the result they get"],
      ["What’s included", "The steps or options, in the words customers use"],
      ["Proof", "Photos of real jobs, reviews that mention this service, a short case study"],
      ["Pricing guide", "A range, or what affects the price. Customers look for this first"],
      ["Questions", "The 4–6 questions you hear on every call, answered honestly"],
      ["Next step", "One clear action: call, book or request a quote"],
    ] },
    { type: "h2", text: "Write for the person deciding" },
    { type: "p", text: "Someone reading a service page wants three answers fast: **can you fix my problem, can I trust you, and what happens next?** Short paragraphs, real photos and a phone number they can tap answer all three. Fancy wording doesn’t." },
    { type: "callout", tone: "tip", title: "Use your customers’ words", text: "Listen to how people describe the problem on the phone. If they say “leaking roof” and your page says “roof membrane remediation”, you won’t show up for what they type." },
    { type: "h2", text: "Make it clear to Google" },
    { type: "list", items: [
      "One page per service, with the service in the page title and main heading",
      "A clean address like /roof-repair rather than /services?id=12",
      "Links between related services, and from your homepage to every service",
      "**Structured data** (schema) that describes the service and your business",
      "Fast loading on phones, since most of your visitors are on one",
    ] },
    { type: "cta" },
    { type: "h2", text: "Mistakes we fix all the time" },
    { type: "list", items: [
      "**Copy-paste town pages.** Fifty pages that only swap the city name look like spam. Write fewer pages with real local detail.",
      "**No proof.** A page with no photos, reviews or examples doesn’t convince anyone.",
      "**Burying the phone number.** On a phone, the call button should be one tap away at all times.",
      "**Writing for search engines.** Repeating a keyword ten times makes the page worse for people and doesn’t fool Google.",
    ] },
    { type: "h2", text: "How many service pages do you need?" },
    { type: "p", text: "Start with the services that bring in the most money and the ones customers search for most. For most local businesses that’s five to ten pages. Add more as you see which searches bring calls. That’s exactly what we plan in our [SEO service](/services/seo)." },
  ],
  faqs: [
    { q: "How long should a service page be?", a: "Long enough to answer the customer’s questions, which is usually 600 to 1,200 words with photos. Length alone doesn’t rank; usefulness does." },
    { q: "Should I create a page for every town I serve?", a: "Only if you can make each one genuinely useful, with local projects, reviews and details. Otherwise one strong service page plus your Google Business Profile does the job." },
    { q: "How soon will a new service page rank?", a: "New pages are usually picked up within days to a few weeks. Climbing to the top for competitive searches takes longer and depends on your site’s overall strength." },
  ],
};
