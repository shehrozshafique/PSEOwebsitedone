/**
 * Blog: categories, post types and helpers.
 * Posts live in src/lib/blog-posts/*.ts, one file per post, and are registered in `posts` below.
 *
 * Writing a post: copy an existing file, change the fields, add it to the list. Text supports
 * **bold** and [links](/services/seo). Reading time and the table of contents are worked out for you.
 */
import { gbpRanking } from "./blog-posts/google-business-profile-ranking";
import { missedCallTextBack } from "./blog-posts/missed-call-text-back";
import { servicePages } from "./blog-posts/service-pages-that-rank";
import { callTracking } from "./blog-posts/google-ads-call-tracking";
import { abandonedCart } from "./blog-posts/abandoned-cart-flows";
import { mobileWebsite } from "./blog-posts/mobile-website-checklist";

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "checklist"; title: string; items: string[] }
  | { type: "callout"; tone: "tip" | "warning"; title: string; text: string }
  | { type: "quote"; text: string; by?: string }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "cta" }; // inline "free audit" box

export type CategoryKey = "local-seo" | "seo" | "ads" | "automation" | "ecommerce" | "websites";

export type Post = {
  slug: string;
  title: string;
  description: string; // meta description, also the excerpt on cards
  category: CategoryKey;
  date: string; // ISO yyyy-mm-dd
  updated?: string;
  takeaways: string[];
  blocks: Block[];
  faqs?: { q: string; a: string }[];
  services: string[]; // service slugs this post sells
};

export const categories: Record<CategoryKey, { name: string; blurb: string; color: string; tint: string; icon: string }> = {
  "local-seo": { name: "Local SEO & Maps", blurb: "Rank in the Google Maps top 3 and get more calls from your area.", color: "#1d4ed8", tint: "#dbeafe", icon: "local" },
  seo: { name: "SEO", blurb: "Pages and content that rank for what your customers actually search.", color: "#0f7a36", tint: "#d7f8e1", icon: "seo" },
  ads: { name: "Google & Meta Ads", blurb: "Ads that bring booked jobs and sales, tracked to the dollar.", color: "#c2391b", tint: "#ffe1d6", icon: "ads" },
  automation: { name: "AI & Automation", blurb: "Reply in seconds, follow up on autopilot, never lose a lead.", color: "#5b3fd6", tint: "#e7e0ff", icon: "ai" },
  ecommerce: { name: "Ecommerce", blurb: "More orders, bigger carts and customers who come back.", color: "#b0246f", tint: "#ffd9ec", icon: "shop" },
  websites: { name: "Websites", blurb: "Fast, mobile-first websites that turn visitors into customers.", color: "#0a0b0a", tint: "#eceee8", icon: "website" },
};
export const categoryKeys = Object.keys(categories) as CategoryKey[];

/** Newest first. */
export const posts: Post[] = [gbpRanking, missedCallTextBack, servicePages, callTracking, abandonedCart, mobileWebsite].sort((a, b) =>
  b.date.localeCompare(a.date),
);

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
export const postsIn = (c: CategoryKey) => posts.filter((p) => p.category === c);

/** Other posts to read next: same category first, then newest. */
export function relatedTo(post: Post, n = 3) {
  const same = posts.filter((p) => p.slug !== post.slug && p.category === post.category);
  const rest = posts.filter((p) => p.slug !== post.slug && p.category !== post.category);
  return [...same, ...rest].slice(0, n);
}

/** Plain text of a block, for reading time and search snippets. */
function blockText(b: Block): string {
  switch (b.type) {
    case "list":
      return b.items.join(" ");
    case "checklist":
      return `${b.title} ${b.items.join(" ")}`;
    case "callout":
      return `${b.title} ${b.text}`;
    case "table":
      return [...b.head, ...b.rows.flat()].join(" ");
    case "cta":
      return "";
    default:
      return b.text;
  }
}

export function readingMinutes(p: Post) {
  const words = [p.title, ...p.takeaways, ...p.blocks.map(blockText), ...(p.faqs ?? []).flatMap((f) => [f.q, f.a])]
    .join(" ")
    .split(/\s+/).length;
  return Math.max(2, Math.round(words / 220));
}

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/\*\*|\[|\]\([^)]*\)/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const toc = (p: Post) => p.blocks.filter((b): b is { type: "h2"; text: string } => b.type === "h2").map((b) => ({ id: slugify(b.text), text: b.text }));

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
