import { notFound } from "next/navigation";
import { getPost, posts } from "@/lib/blog";
import { featureImage, featureSize } from "@/lib/featureImage";

// Each post's feature image: the blog cover on the site and the link preview when shared.
export const size = featureSize;
export const contentType = "image/png";
export const alt = "Blog post feature image";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  return featureImage(post);
}
