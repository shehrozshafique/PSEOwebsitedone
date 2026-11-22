import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogIndex from "@/components/blog/BlogIndex";
import { categories, categoryKeys, type CategoryKey } from "@/lib/blog";
import { site } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return categoryKeys.map((category) => ({ category }));
}

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const key = (await params).category as CategoryKey;
  const c = categories[key];
  if (!c) return {};
  return {
    title: `${c.name} guides | ${site.name} blog`,
    description: c.blurb,
    alternates: { canonical: `/blog/category/${key}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const key = (await params).category as CategoryKey;
  if (!categories[key]) notFound();
  return <BlogIndex active={key} />;
}
