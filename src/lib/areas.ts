/**
 * Location pages (/areas and /areas/[slug]).
 *
 * ⚠ TODO: replace the example cities with the cities you really serve.
 * Google penalises copy-paste city pages, so every city needs its OWN intro, local notes,
 * neighbourhoods and FAQs. Pages with `example: true` are hidden from Google (noindex)
 * and left out of the sitemap until you replace them.
 */

export type Area = {
  slug: string;
  city: string;
  state: string; // 2-letter code
  example: boolean;
  intro: string;
  neighborhoods: string[];
  nearby: string[];
  insights: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
  caseSlug?: string;
};

export const areas: Area[] = [
  {
    slug: "austin-tx",
    city: "Austin",
    state: "TX",
    example: true,
    intro:
      "Austin is one of the fastest-growing cities in the country, and that means more competition on Google every month. We help Austin businesses show up first, answer every lead fast and turn searches into booked jobs.",
    neighborhoods: ["Downtown", "South Congress", "East Austin", "Mueller", "Hyde Park", "Zilker", "North Loop", "Circle C"],
    nearby: ["Round Rock", "Cedar Park", "Pflugerville", "Georgetown", "Leander", "Kyle"],
    insights: [
      { title: "New residents search first", text: "People moving to the area don’t have a go-to business yet. They search Google Maps and choose from the top 3." },
      { title: "Suburbs are separate searches", text: "“Near me” results in Round Rock differ from downtown. Area pages help you show up where you actually work." },
      { title: "Speed wins the job", text: "In a busy market, the business that replies first usually gets booked. Instant replies make the difference." },
    ],
    faqs: [
      { q: "Do you work with businesses across the Austin metro?", a: "Yes. We help businesses rank in Austin and the surrounding suburbs, with a page and Maps strategy for each area you serve." },
      { q: "Do we need to meet in person?", a: "Not usually. Most work happens over video calls and in your client app. Local shoots can be arranged for video content." },
    ],
    caseSlug: "roofing-company-3x-calls",
  },
  {
    slug: "denver-co",
    city: "Denver",
    state: "CO",
    example: true,
    intro:
      "From downtown to the suburbs along the Front Range, Denver customers search on their phones and book whoever replies first. We build the websites, Maps rankings and follow-up that make that business you.",
    neighborhoods: ["LoDo", "RiNo", "Capitol Hill", "Highlands", "Cherry Creek", "Washington Park", "Stapleton", "Baker"],
    nearby: ["Aurora", "Lakewood", "Littleton", "Arvada", "Westminster", "Englewood"],
    insights: [
      { title: "Seasonal demand swings", text: "Weather drives demand for many local services. Ads and posts can scale up when searches spike." },
      { title: "Reviews decide close calls", text: "When several businesses look similar on the map, recent reviews usually win the click." },
      { title: "Mobile-first searches", text: "Most local searches happen on a phone. Tap-to-call and fast pages matter more than ever." },
    ],
    faqs: [
      { q: "Can you help us rank in the Denver suburbs too?", a: "Yes. We build area pages and track your Maps position across each suburb you serve." },
      { q: "How fast can we get more calls?", a: "Missed-call text back and instant replies help from day one. Maps and SEO gains usually build over 2–6 months." },
    ],
    caseSlug: "dental-clinic-142-bookings",
  },
  {
    slug: "tampa-fl",
    city: "Tampa",
    state: "FL",
    example: true,
    intro:
      "Tampa Bay is full of strong local businesses competing for the same searches. We help you stand out on Google, look great on mobile and follow up with every lead automatically, day or night.",
    neighborhoods: ["Downtown", "Hyde Park", "Ybor City", "Seminole Heights", "Westshore", "Channelside", "Carrollwood", "New Tampa"],
    nearby: ["St. Petersburg", "Clearwater", "Brandon", "Wesley Chapel", "Riverview", "Lutz"],
    insights: [
      { title: "A metro of many towns", text: "Customers search by their own town name. One page for “Tampa Bay” isn’t enough to show up everywhere." },
      { title: "After-hours leads", text: "Many leads come in evenings and weekends. AI replies and booking catch them while you’re off." },
      { title: "Trust through reviews", text: "Recent, detailed reviews help customers choose quickly in a crowded market." },
    ],
    faqs: [
      { q: "Do you serve all of Tampa Bay?", a: "Yes, including St. Petersburg, Clearwater, Brandon and nearby towns, with pages for each area you serve." },
      { q: "Can you take over our existing website?", a: "Yes. We keep what already ranks and improve the rest, so you don’t lose existing traffic." },
    ],
    caseSlug: "law-firm-rank-1",
  },
];

export const getArea = (slug: string) => areas.find((a) => a.slug === slug);
