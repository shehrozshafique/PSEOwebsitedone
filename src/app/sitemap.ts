import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { servicesData } from "@/lib/services";
import { cases } from "@/lib/cases";
import { areas } from "@/lib/areas";
import { categoryKeys, posts } from "@/lib/blog";

/** /sitemap.xml: every public page. The thank-you page is left out on purpose. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });

  return [
    page("", 1, "weekly"),
    page("/free-audit", 0.9),
    page("/pricing", 0.8),
    page("/work", 0.8, "weekly"),
    page("/about", 0.6),
    page("/contact", 0.6),
    ...servicesData.map((s) => page(`/services/${s.slug}`, 0.9)),
    ...cases.map((c) => page(`/work/${c.slug}`, 0.7)),
    page("/blog", 0.8, "weekly"),
    ...categoryKeys.map((k) => page(`/blog/category/${k}`, 0.5, "weekly")),
    ...posts.map((p) => ({ ...page(`/blog/${p.slug}`, 0.7), lastModified: new Date(p.updated ?? p.date) })),
    page("/areas", 0.7),
    // example cities are noindex until real local content is added
    ...areas.filter((a) => !a.example).map((a) => page(`/areas/${a.slug}`, 0.8)),
    page("/privacy", 0.2, "yearly"),
    page("/terms", 0.2, "yearly"),
    page("/sms-terms", 0.2, "yearly"),
  ];
}
