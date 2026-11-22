import type { Post } from "../blog";

export const mobileWebsite: Post = {
  slug: "mobile-website-checklist",
  title: "The mobile website checklist: 12 fixes that turn phone visitors into calls",
  description:
    "Most of your visitors are on a phone. A practical checklist for speed, tap-to-call, forms and layout that makes it easy for mobile visitors to contact you.",
  category: "websites",
  date: "2026-10-14",
  services: ["website-design"],
  takeaways: [
    "Most local searches happen on a phone, so the phone version of your site is the real one.",
    "The call button should be visible and one tap away on every page.",
    "Short forms with the right keyboards get filled in; long ones get abandoned.",
    "Speed matters most on the first screen people see.",
  ],
  blocks: [
    { type: "p", text: "Open your website on your phone and try to call yourself, then try to request a quote. If either takes more than a few seconds, you’re losing customers who never tell you they were there. This checklist covers the fixes we make on almost every site." },
    { type: "h2", text: "Make contacting you effortless" },
    { type: "checklist", title: "Contact", items: [
      "A tap-to-call button that stays on screen while people scroll",
      "Your phone number as a real link, not an image",
      "A short quote form: name, phone and what they need is enough to start",
      "Phone fields that open the number keypad, email fields that open the email keyboard",
      "A clear thank-you message that says when you’ll reply",
    ] },
    { type: "h2", text: "Make it fast" },
    { type: "checklist", title: "Speed", items: [
      "Images sized for phones and saved in modern formats like WebP",
      "No auto-playing background videos on the first screen",
      "As few third-party scripts and chat widgets as possible",
      "Text you can read without zooming, and buttons big enough for a thumb",
    ] },
    { type: "callout", tone: "tip", title: "Test it the honest way", text: "Turn off Wi-Fi and load your site on mobile data. That’s how most of your customers see it, and it’s where slow pages show up." },
    { type: "cta" },
    { type: "h2", text: "Make it easy to trust you" },
    { type: "checklist", title: "Trust", items: [
      "Real photos of your team and work near the top",
      "Star rating and a few short reviews on every key page",
      "Service area and opening hours that are easy to find",
    ] },
    { type: "h2", text: "Check it every few months" },
    { type: "p", text: "Phones, browsers and your own content change. A quick check every quarter keeps small problems, like a broken form or a slow new image, from quietly costing you leads. Want a second pair of eyes? Our [website design team](/services/website-design) can review it, or start with a [free audit](/free-audit)." },
  ],
  faqs: [
    { q: "How fast should my website load?", a: "Aim for the main content to appear within about two to three seconds on mobile data. Google’s PageSpeed Insights shows how real visitors experience your site." },
    { q: "Do I need an app instead?", a: "Almost never for a local business. A fast mobile website does the job without asking customers to download anything." },
    { q: "Is a website builder good enough?", a: "It can be, if it’s fast and set up properly. The problems we see usually come from heavy themes, too many plugins and missing tracking, not from the builder itself." },
  ],
};
