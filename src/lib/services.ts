/**
 * Content for every service page (/services/[slug]).
 * One object = one page. Add a service by adding an object; the template does the rest.
 * Words are client-facing: outcomes and plain language, no internal jargon.
 */

export type Service = {
  slug: string;
  name: string;
  icon: string; // file in /public/graphics/icons
  color: string;
  stage: "Get Found" | "Get Leads" | "Close Fast" | "Automate" | "Scale";
  metaTitle: string;
  metaDescription: string;
  headline: string;
  headlineLite: string;
  intro: string;
  facts: { value: string; label: string }[];
  pains: { title: string; text: string }[];
  included: { title: string; text: string }[];
  steps: { title: string; time: string; text: string }[];
  caseIndex: number; // which case study from site.ts to show
  faqs: { q: string; a: string }[];
  related: string[]; // slugs
};

export const servicesData: Service[] = [
  {
    slug: "website-design",
    name: "Website Design",
    icon: "website",
    color: "#1fae55",
    stage: "Get Leads",
    metaTitle: "Website & Store Design for Local Businesses and Online Brands",
    metaDescription: "Fast, mobile-first websites built to rank on Google and turn visitors into calls and bookings. You own everything.",
    headline: "A website that brings you customers",
    headlineLite: "Not just compliments",
    intro: "We design and build fast, mobile-first websites and Shopify stores with one job: turning visitors into calls, bookings and orders. Built for Google from day one.",
    facts: [
      { value: "3–6 wks", label: "from kickoff to live" },
      { value: "< 2.5s", label: "load time target on mobile" },
      { value: "100%", label: "yours: site, domain, content" },
    ],
    pains: [
      { title: "It looks dated", text: "Customers judge you in seconds. An old site makes a great business look small." },
      { title: "Nobody calls from it", text: "Traffic comes in, but the phone stays quiet because the next step isn’t clear." },
      { title: "It’s slow on phones", text: "Most of your visitors are on mobile. Every extra second loses people." },
    ],
    included: [
      { title: "Custom design", text: "Built around your brand and your customers, not a template." },
      { title: "Copy that sells", text: "We write the words: clear, local, focused on what customers want." },
      { title: "Mobile-first build", text: "Tap-to-call, sticky booking button and fast pages on every phone." },
      { title: "SEO foundations", text: "Page structure, schema, speed and service pages Google understands." },
      { title: "Lead capture", text: "Quote forms, booking and chat that send every lead straight to you." },
      { title: "Tracking", text: "See which pages, ads and searches bring calls and bookings." },
      { title: "Hosting & security", text: "Fast hosting, SSL and backups handled for you." },
      { title: "Easy updates", text: "Change text and photos yourself, or ask us and it’s done." },
    ],
    steps: [
      { title: "Discovery", time: "Week 1", text: "We learn your services, customers and competitors, and plan every page." },
      { title: "Design", time: "Weeks 2–3", text: "You see the homepage design first, then we roll the style out to every page." },
      { title: "Build", time: "Weeks 3–5", text: "We build, write and connect forms, booking and tracking." },
      { title: "Launch & grow", time: "Week 6+", text: "We go live, submit to Google and keep improving based on real data." },
    ],
    caseIndex: 0,
    faqs: [
      { q: "How much does a website cost?", a: "It depends on the number of pages and features. You get a fixed price after your free audit, before any work starts." },
      { q: "Do I own the website?", a: "Yes. The site, domain and content are yours." },
      { q: "Can you redesign my current site?", a: "Yes. We keep what works (like pages that already rank) and rebuild the rest." },
      { q: "Will I be able to edit it?", a: "Yes. You can update text and photos yourself, and we’re one message away for anything bigger." },
    ],
    related: ["seo", "local-seo", "ai-automation"],
  },
  {
    slug: "ecommerce-growth",
    name: "Ecommerce Growth",
    icon: "shop",
    color: "#e0459b",
    stage: "Scale",
    metaTitle: "Ecommerce Growth for Shopify & Online Stores",
    metaDescription: "Shopify stores, product SEO, Google Shopping, Meta ads and email & SMS flows that grow online revenue and repeat orders.",
    headline: "More orders. Bigger carts",
    headlineLite: "More customers coming back",
    intro: "We help online stores grow with fast Shopify stores, product SEO, ads that pay back, and email and SMS flows that recover carts and bring customers back again and again.",
    facts: [
      { value: "Day 1", label: "abandoned-cart flows live" },
      { value: "ROAS", label: "every ad judged on return, not clicks" },
      { value: "Shopify", label: "and WooCommerce experts" },
    ],
    pains: [
      { title: "Traffic but few sales", text: "Visitors browse and leave. A slow store or a confusing checkout costs orders every day." },
      { title: "Ads stopped paying back", text: "Costs keep rising and you’re not sure which campaigns actually make money." },
      { title: "One-time buyers", text: "Most customers buy once and never hear from you again, so you keep paying to win them." },
    ],
    included: [
      { title: "Store design & speed", text: "A fast, mobile-first Shopify store with product pages built to convert." },
      { title: "Product & category SEO", text: "Rank your products and collections for the searches buyers type." },
      { title: "Google Shopping & PMax", text: "Product ads on Google, tuned for return on ad spend." },
      { title: "Meta & TikTok ads", text: "Creative and targeting that turn scrollers into customers." },
      { title: "Abandoned cart & checkout", text: "Email and SMS reminders that recover lost sales automatically." },
      { title: "Post-purchase flows", text: "Thank-you, review, cross-sell and replenishment messages." },
      { title: "Win-back campaigns", text: "Bring past customers back with timely offers." },
      { title: "Revenue reporting", text: "Sales by channel, ROAS and repeat rate in one clear report." },
    ],
    steps: [
      { title: "Store audit", time: "Week 1", text: "Speed, checkout, product pages, ads and email: what’s costing you sales." },
      { title: "Quick wins", time: "Weeks 1–2", text: "Cart recovery, welcome flow and checkout fixes go live first." },
      { title: "Grow traffic", time: "Weeks 3–6", text: "Product SEO, Shopping ads and social campaigns launch and get tuned." },
      { title: "Scale & retain", time: "Monthly", text: "Scale winning ads, add new flows and grow repeat orders." },
    ],
    caseIndex: 3,
    faqs: [
      { q: "Do you only work with Shopify?", a: "Shopify is our specialty, and we also work with WooCommerce and other platforms." },
      { q: "Can you work with my existing email tool?", a: "Yes. We can build flows in the tool you use, or set you up in our platform." },
      { q: "How do you measure success?", a: "Revenue, return on ad spend, conversion rate and repeat purchase rate, reported every month." },
      { q: "Is ad spend included?", a: "No. Ad spend goes straight to Google, Meta or TikTok. Our fee covers strategy, creative direction and management." },
    ],
    related: ["google-meta-ads", "seo", "website-design"],
  },
  {
    slug: "seo",
    name: "SEO",
    icon: "seo",
    color: "#4d8dff",
    stage: "Get Found",
    metaTitle: "SEO Services for Local and Service Businesses",
    metaDescription: "Rank higher on Google for the searches that bring buyers. Technical SEO, content and links, with clear monthly reports.",
    headline: "Show up when customers search",
    headlineLite: "Before your competitors do",
    intro: "We get your website ranking on Google for the searches your customers actually type, so you get steady calls without paying for every click.",
    facts: [
      { value: "3–6 mo", label: "typical time to strong rankings" },
      { value: "Monthly", label: "plain-English ranking report" },
      { value: "0", label: "long-term contracts" },
    ],
    pains: [
      { title: "You’re on page 2", text: "Almost nobody clicks past the first page. If you’re not there, you’re invisible." },
      { title: "Ads cost too much", text: "Paying for every click adds up. Organic traffic keeps coming without the bill." },
      { title: "Past SEO didn’t work", text: "Reports full of jargon and no extra calls. You deserve to see real results." },
    ],
    included: [
      { title: "Keyword plan", text: "The exact searches that bring buyers in your area and industry." },
      { title: "Technical fixes", text: "Speed, indexing, structure and schema so Google can read your site." },
      { title: "Service pages", text: "A strong page for every service you want to rank for." },
      { title: "Content", text: "Helpful articles that answer customer questions and build trust." },
      { title: "Links & mentions", text: "Quality local and industry links that build authority." },
      { title: "AI search visibility", text: "Show up in Google’s AI answers, ChatGPT and other AI tools." },
      { title: "Competitor tracking", text: "See who ranks above you and what it takes to pass them." },
      { title: "Monthly report", text: "Rankings, traffic and calls, explained in plain words." },
    ],
    steps: [
      { title: "Audit", time: "Week 1", text: "Full check of your site, rankings and competitors." },
      { title: "Fix the foundation", time: "Weeks 2–4", text: "Technical fixes and on-page improvements that unlock quick wins." },
      { title: "Build authority", time: "Month 2+", text: "New pages, content and links every month." },
      { title: "Report & improve", time: "Every month", text: "We show results and double down on what brings calls." },
    ],
    caseIndex: 2,
    faqs: [
      { q: "How long does SEO take?", a: "Quick wins often show in the first 4–8 weeks. Strong rankings for competitive searches usually take 3–6 months." },
      { q: "Can you guarantee #1?", a: "No honest agency can guarantee a position, because Google decides. We guarantee the work, the reporting and clear communication." },
      { q: "Do I need a new website for SEO?", a: "Not always. If your site is slow or hard to change, we’ll tell you. Often we can work with what you have." },
      { q: "How will I know it’s working?", a: "A monthly report shows rankings, traffic and the calls and forms that came from Google." },
    ],
    related: ["local-seo", "website-design", "google-meta-ads"],
  },
  {
    slug: "local-seo",
    name: "Local SEO & Maps",
    icon: "local",
    color: "#f29a00",
    stage: "Get Found",
    metaTitle: "Local SEO & Google Maps Ranking",
    metaDescription: "Get into the top 3 on Google Maps in your area. Google Business Profile optimization, reviews, citations and local pages.",
    headline: "Get into the top 3 on Google Maps",
    headlineLite: "Where the calls are",
    intro: "When people search “near me”, the top 3 businesses on the map get most of the calls. We help you become one of them, in every area you serve.",
    facts: [
      { value: "Top 3", label: "the Maps spots that get most calls" },
      { value: "Weekly", label: "Google Business Profile posts" },
      { value: "Auto", label: "review requests after every job" },
    ],
    pains: [
      { title: "Competitors show up first", text: "Even if you’re better, the business on top of the map gets the call." },
      { title: "Few or old reviews", text: "Customers trust businesses with lots of recent reviews." },
      { title: "You serve many areas", text: "You only show up near your address, not in the towns you actually work in." },
    ],
    included: [
      { title: "Google Business Profile", text: "Fully optimized categories, services, photos and descriptions." },
      { title: "Review system", text: "Automatic review requests by text after every job." },
      { title: "Weekly posts", text: "Regular updates that keep your profile active and fresh." },
      { title: "Local listings", text: "Consistent name, address and phone on the directories that matter." },
      { title: "Area pages", text: "A page for each city or area you serve." },
      { title: "Map rank tracking", text: "See your position on a grid across your whole service area." },
      { title: "Review replies", text: "Professional replies to every review, good or bad." },
      { title: "Monthly report", text: "Calls, direction requests and rankings from Maps." },
    ],
    steps: [
      { title: "Profile audit", time: "Week 1", text: "We check your profile, reviews and Maps rankings across your area." },
      { title: "Optimize", time: "Weeks 1–2", text: "Fix and complete your profile, listings and area pages." },
      { title: "Reviews on autopilot", time: "Week 2", text: "Turn on automatic review requests after every job." },
      { title: "Grow every month", time: "Ongoing", text: "Posts, photos, listings and new area pages each month." },
    ],
    caseIndex: 0,
    faqs: [
      { q: "How fast can I move up on Maps?", a: "Profile fixes and reviews can move you within weeks. Competitive areas take a few months of steady work." },
      { q: "I don’t have a shop. Can I still rank?", a: "Yes. Service-area businesses can rank across the towns they serve." },
      { q: "Is buying reviews OK?", a: "No. Fake reviews break Google’s rules and can get your profile suspended. We only ask real customers." },
      { q: "Do you need access to my profile?", a: "Yes, we’ll ask to be added as a manager. You stay the owner." },
    ],
    related: ["seo", "ai-automation", "website-design"],
  },
  {
    slug: "google-meta-ads",
    name: "Google & Meta Ads",
    icon: "ads",
    color: "#ff6a4a",
    stage: "Get Leads",
    metaTitle: "Google Ads & Facebook Ads Management",
    metaDescription: "Ads that bring booked jobs, not just clicks. Google Ads, Local Services Ads, Facebook and Instagram, tracked to the dollar.",
    headline: "Ads that bring jobs and sales",
    headlineLite: "Not just clicks",
    intro: "We run Google, Facebook and Instagram ads that reach people ready to buy, send them to pages built to convert, and track every call back to the ad.",
    facts: [
      { value: "2–4 wks", label: "until leads start coming in" },
      { value: "Every $", label: "tracked to calls and bookings" },
      { value: "Your", label: "ad accounts, always" },
    ],
    pains: [
      { title: "Money in, nothing out", text: "You spend every month but can’t tell which ads bring customers." },
      { title: "Wrong people click", text: "Clicks from people who will never buy eat your budget." },
      { title: "Leads go cold", text: "By the time you call back, they’ve already booked someone else." },
    ],
    included: [
      { title: "Google Search Ads", text: "Show up at the top when people search for your service." },
      { title: "Local Services Ads", text: "The “Google Guaranteed” spots, where available." },
      { title: "Facebook & Instagram", text: "Reach local people with offers and retargeting." },
      { title: "Landing pages", text: "A page for each campaign, built to turn clicks into calls." },
      { title: "Call & form tracking", text: "Know exactly which ad and keyword brought each lead." },
      { title: "Instant follow-up", text: "Every ad lead gets a text reply within a minute." },
      { title: "Weekly optimization", text: "Cut what doesn’t work, scale what does." },
      { title: "Clear reports", text: "Cost per lead and cost per booked job, every month." },
    ],
    steps: [
      { title: "Plan", time: "Week 1", text: "Goals, budget, offers and the searches and audiences to target." },
      { title: "Build", time: "Week 2", text: "Campaigns, landing pages and tracking set up and tested." },
      { title: "Launch", time: "Week 3", text: "Ads go live, with every lead followed up instantly." },
      { title: "Optimize & scale", time: "Weekly", text: "Lower cost per lead, then scale the winners." },
    ],
    caseIndex: 1,
    faqs: [
      { q: "How much should I spend on ads?", a: "It depends on your area and service. We’ll recommend a starting budget in your free audit." },
      { q: "Is the ad spend included in your fee?", a: "No. Ad spend goes straight to Google or Meta from your card. Our fee covers the management." },
      { q: "Who owns the ad accounts?", a: "You do. We work inside your accounts, so you keep all the data." },
      { q: "How soon will I get leads?", a: "Usually in the first 2–4 weeks, then results improve as we optimize." },
    ],
    related: ["ecommerce-growth", "website-design", "ai-automation"],
  },
  {
    slug: "ai-automation",
    name: "AI Automation",
    icon: "ai",
    color: "#8b6bff",
    stage: "Automate",
    metaTitle: "AI Automation for Small Businesses",
    metaDescription: "AI chat and phone answering, instant lead replies, follow-ups, reminders and review requests that run 24/7.",
    headline: "Let the busywork run itself",
    headlineLite: "Day and night",
    intro: "An AI assistant answers chats and calls, every new lead gets a reply in seconds, and follow-ups, reminders and review requests go out on their own.",
    facts: [
      { value: "24/7", label: "answers on chat and phone" },
      { value: "60s", label: "reply to every new lead" },
      { value: "1 app", label: "for calls, texts, email and chat" },
    ],
    pains: [
      { title: "Missed calls = lost jobs", text: "When you’re busy on a job, callers just move on to the next business." },
      { title: "Follow-up falls through", text: "Quotes go out and nobody chases them. Money left on the table." },
      { title: "Hours of admin", text: "Reminders, confirmations and reviews eat time you could spend working." },
    ],
    included: [
      { title: "AI chat assistant", text: "Answers questions on your website and books appointments 24/7." },
      { title: "AI phone answering", text: "Picks up when you can’t, answers questions and books calls." },
      { title: "Missed-call text back", text: "Every missed call gets a text within seconds." },
      { title: "Instant lead reply", text: "Forms, ads and DMs get a reply in under a minute." },
      { title: "Booking & reminders", text: "Online booking with text and email reminders that cut no-shows." },
      { title: "Quote follow-ups", text: "Friendly nudges until the customer says yes or no." },
      { title: "Review & referral asks", text: "Sent automatically after every finished job." },
      { title: "Weekly report", text: "Leads, bookings and replies in your inbox every Monday." },
    ],
    steps: [
      { title: "Map your process", time: "Week 1", text: "We learn how leads come in and where time is lost today." },
      { title: "Build & train", time: "Weeks 2–3", text: "We set up the platform and train the AI on your business." },
      { title: "Test & launch", time: "Week 3", text: "We test every flow with you, then switch it on." },
      { title: "Improve", time: "Monthly", text: "We review conversations and keep making it smarter." },
    ],
    caseIndex: 1,
    faqs: [
      { q: "Will the AI sound like a robot?", a: "No. It’s trained on your business, speaks naturally and hands over to you when needed." },
      { q: "Do I need new software?", a: "It all runs in one app we set up for you, with a mobile app to reply and see leads on the go." },
      { q: "What if the AI doesn’t know an answer?", a: "It takes a message and alerts you right away, so nothing gets lost." },
      { q: "Can I keep my phone number?", a: "Yes. We can work with your current number or set up a new one." },
    ],
    related: ["website-design", "local-seo", "google-meta-ads"],
  },
  {
    slug: "video-content",
    name: "Video & Content",
    icon: "video",
    color: "#8b6bff",
    stage: "Scale",
    metaTitle: "Video & Content for Local Businesses",
    metaDescription: "Short videos, photos and posts that build trust before the first call. For your website, Google profile and social media.",
    headline: "Build trust before the first call",
    headlineLite: "With content people watch",
    intro: "Short videos, photos and posts that show the real people behind your business, used on your website, Google profile and social media.",
    facts: [
      { value: "Monthly", label: "batch of videos and posts" },
      { value: "Every", label: "channel: site, Google, social" },
      { value: "Real", label: "your team, your work, your customers" },
    ],
    pains: [
      { title: "Stock photos everywhere", text: "Customers can tell. Real faces and real work build trust much faster." },
      { title: "No time to post", text: "You know you should be on social media, but the work comes first." },
      { title: "Content that goes nowhere", text: "Posts get a few likes but never turn into calls." },
    ],
    included: [
      { title: "Short-form videos", text: "Reels and shorts that show your work and answer common questions." },
      { title: "Testimonial videos", text: "Happy customers telling their story, edited to be short and strong." },
      { title: "Photo shoots", text: "Real photos of your team, work and results for your site and Google." },
      { title: "Social posts", text: "A monthly plan of posts, written and scheduled for you." },
      { title: "Google profile content", text: "Photos and posts that keep your Maps profile active." },
      { title: "Website content", text: "Videos and photos placed on your pages to lift conversions." },
      { title: "Captions & hooks", text: "Words that make people stop scrolling and take action." },
      { title: "Monthly review", text: "See what got views and calls, and plan the next batch." },
    ],
    steps: [
      { title: "Plan", time: "Week 1", text: "Topics, shot list and schedule based on your customers’ questions." },
      { title: "Shoot", time: "Week 2", text: "One efficient session on site, or remote guidance for your team." },
      { title: "Edit", time: "Week 3", text: "Short, branded videos and photos ready for every channel." },
      { title: "Publish & learn", time: "Monthly", text: "We post, track what works and plan the next month." },
    ],
    caseIndex: 1,
    faqs: [
      { q: "Do I need to be on camera?", a: "It helps, but it’s not required. Your team, your work and your customers can be the stars." },
      { q: "Do you come on site?", a: "For local clients, yes. Otherwise we guide your team to film with a phone and we edit." },
      { q: "Which platforms do you post to?", a: "Usually Instagram, Facebook, TikTok, YouTube Shorts and your Google profile." },
      { q: "Who owns the videos?", a: "You do. Use them anywhere, forever." },
    ],
    related: ["local-seo", "google-meta-ads", "website-design"],
  },
];

export const getService = (slug: string) => servicesData.find((s) => s.slug === slug);
