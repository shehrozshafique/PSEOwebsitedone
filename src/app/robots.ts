import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/** /robots.txt: allow everything public, keep the API and thank-you page out of search. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/thank-you"] }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
