import { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogPostQR } from "@/app/api/blog/draft/route";
import { openGraph } from "@/app/shared-metadata";
import BlogPostsQuery from "@/graphql/BlogPostsQuery";
import { truncateString } from "@/utils/CommonUtil";
import { queryContentful } from "@/utils/Contentful";
import { logger } from "@/utils/ServerUtil";

import BlogPostPage from "./blog-post-page";
import { getBlogPost } from "./query";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const { slug } = params;

  // fetch data
  const blogPost = await getBlogPost(slug);

  return {
    title: `${blogPost ? truncateString(blogPost.title) : "Not Found"}`,
    openGraph,
  };
}

export async function generateStaticParams() {
  const response = await queryContentful<BlogPostQR>(BlogPostsQuery);

  if (!response.ok) {
    const err = response.unwrap();
    logger.error(`Something went wrong with fetching blog posts: ${err.message}`);
    return [];
  }

  const { blogPosts } = response.unwrap();

  return blogPosts.map(({ postId: slug }) => ({
    slug,
  }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const blogPost = await getBlogPost(params.slug);

  if (!blogPost) {
    notFound();
  }

  return <BlogPostPage blogPost={blogPost} />;
}
