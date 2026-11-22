import type { Post } from "../blog";

export const abandonedCart: Post = {
  slug: "abandoned-cart-email-sms",
  title: "Abandoned cart emails and texts that bring shoppers back",
  description:
    "Most shoppers leave without buying. A simple sequence of cart-recovery emails and texts brings many of them back. Timing, wording and what not to do.",
  category: "ecommerce",
  date: "2026-10-21",
  services: ["ecommerce-growth"],
  takeaways: [
    "Cart recovery is usually the highest-earning automated flow an online store can run.",
    "Three messages over about two days is a strong starting point.",
    "Lead with help and the product, not a discount.",
    "Texts work best for shoppers who opted in and for quick reminders.",
  ],
  blocks: [
    { type: "p", text: "Shoppers add something to their cart, then get distracted: a phone call, shipping costs, a second thought. Many never come back on their own. A well-timed reminder brings a meaningful share of them back, and once it’s set up it runs every day without you." },
    { type: "h2", text: "A simple three-message flow" },
    { type: "table", head: ["When", "Channel", "What it says"], rows: [
      ["About 1 hour after", "Email (or text if they opted in)", "A friendly reminder with a photo of the product and a link straight back to the cart"],
      ["About 24 hours after", "Email", "Answers the usual doubts: delivery times, returns, reviews from other buyers"],
      ["About 48 hours after", "Email or text", "A last reminder. If you use an incentive at all, it goes here"],
    ] },
    { type: "callout", tone: "warning", title: "Don’t train people to wait for a discount", text: "If every abandoned cart gets 15% off in the first email, regular customers learn to leave their cart and wait. Save offers for the last message, or for first-time buyers only." },
    { type: "h2", text: "What makes the messages work" },
    { type: "list", items: [
      "**Show the exact product** they left, with its photo and price",
      "**One clear button** back to their cart, already filled in",
      "**Answer the real objections:** shipping cost, delivery time, returns",
      "**Social proof:** a short review of that product",
      "**A human tone,** written like a note from the shop, not a system alert",
    ] },
    { type: "cta" },
    { type: "h2", text: "Email or SMS?" },
    { type: "p", text: "Email carries more information and costs almost nothing per message. Texts get read fast and suit short, timely reminders, but they need **clear opt-in consent** and should be used sparingly. Most stores do best with email as the backbone and one well-placed text for subscribers who agreed to receive them." },
    { type: "h2", text: "The other flows worth setting up" },
    { type: "list", items: [
      "**Welcome series** for new subscribers, introducing your best sellers",
      "**Browse abandonment** for people who viewed a product but didn’t add it",
      "**Post-purchase** messages with care tips, a review request and a related product",
      "**Win-back** for customers who haven’t ordered in a while",
    ] },
    { type: "p", text: "Together these turn one-time buyers into repeat customers. We build and improve them as part of our [ecommerce growth service](/services/ecommerce-growth)." },
  ],
  faqs: [
    { q: "Which platform do I need?", a: "Shopify, WooCommerce and most store platforms connect to email and SMS tools that can run these flows. The structure matters more than the tool." },
    { q: "Can I send cart reminders to people who didn’t subscribe?", a: "For email, rules depend on your country, so check what applies to you. For texts, you need explicit opt-in consent before sending marketing messages." },
    { q: "How do I know if the flow is working?", a: "Look at revenue per recipient and how many recovered orders each message drives. Test one change at a time, such as subject line or timing." },
  ],
};
