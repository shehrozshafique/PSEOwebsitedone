import { posts, categories } from "@/lib/blog";
import { site } from "@/lib/site";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** /blog/rss.xml */
export function GET() {
  const items = posts
    .map(
      (p) => `<item>
  <title>${esc(p.title)}</title>
  <link>${site.url}/blog/${p.slug}</link>
  <guid>${site.url}/blog/${p.slug}</guid>
  <pubDate>${new Date(`${p.date}T12:00:00Z`).toUTCString()}</pubDate>
  <category>${esc(categories[p.category].name)}</category>
  <description>${esc(p.description)}</description>
</item>`,
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
<title>${esc(site.name)} blog</title>
<link>${site.url}/blog</link>
<description>Guides on SEO, Google Maps, ads and automation for local businesses and online stores.</description>
${items}
</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
