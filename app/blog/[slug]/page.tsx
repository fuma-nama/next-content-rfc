import { blog } from "@/content";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = await blog.get();

  const post = posts.find((item) => item.slug === slug);
  if (!post) notFound();

  const compiled = await post.compile();
  return <div>{compiled}</div>;
}

export async function generateStaticParams() {
  const posts = await blog.get();

  return posts.map((item) => ({
    slug: item.slug,
  }));
}
