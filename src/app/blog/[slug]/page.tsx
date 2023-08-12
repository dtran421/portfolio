import { notFound } from "next/navigation";

import { BlogPostQR } from "@/app/api/blog/draft/route";
import BlogPostsQuery from "@/graphql/BlogPostsQuery";
import { queryContentful } from "@/utils/Contentful";
import { Err, Ok } from "@/utils/ReturnTypes";
import { logger } from "@/utils/ServerUtil";

import BlogPostPage from "./blog-post-page";
import { getBlogPost } from "./query";

export async function generateStaticParams() {
  const response = await queryContentful<BlogPostQR>(BlogPostsQuery);

  if (response.isErr()) {
    const err = (response as Err<Error>).unwrap();
    logger.error(`Something went wrong with fetching blog posts: ${err.message}`);
    return [];
  }

  const { blogPosts } = (response as Ok<BlogPostQR>).unwrap();

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
