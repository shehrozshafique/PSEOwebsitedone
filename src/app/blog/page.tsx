import type { Metadata } from "next";
import BlogIndex from "@/components/blog/BlogIndex";
import { site } from "@/lib/site";
import { posts } from "@/lib/blog";

export const metadata: Metadata = {
  title: `Blog: SEO, Google Maps, ads and automation guides | ${site.name}`,
  description: "Practical guides on SEO, Google Maps, ads, websites and automation for local businesses and online stores.",
  alternates: { canonical: "/blog", types: { "application/rss+xml": "/blog/rss.xml" } },
};

export default function BlogPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${site.name} blog`,
    url: `${site.url}/blog`,
    blogPost: posts.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: `${site.url}/blog/${p.slug}`, datePublished: p.date })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogIndex />
    </>
  );
}
