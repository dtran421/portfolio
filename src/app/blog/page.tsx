import { cache } from "react";
import { Metadata } from "next";

import BlogPostsQuery from "@/graphql/BlogPostsQuery";
import { queryContentful } from "@/utils/Contentful";
import { logger } from "@/utils/Logger";
import { Err, Ok } from "@/utils/ReturnTypes";

import { openGraph } from "../layout";

import BlogPage, { BlogProps } from "./blog-page";

export const metadata: Metadata = {
  title: "Blog",
  openGraph,
};

type BlogQR = BlogProps;

export const getBlogPosts = cache(async () => {
  const response = await queryContentful<BlogQR>(BlogPostsQuery);

  if (response.isErr()) {
    const err = (response as Err<Error>).unwrap();
    logger.error(`Something went wrong with fetching blog posts: ${err.message}`);
    return [];
  }

  const { blogPosts } = (response as Ok<BlogQR>).unwrap();

  return blogPosts;
});

export default async function Page() {
  const blogPosts = await getBlogPosts();
  return <BlogPage blogPosts={blogPosts} />;
}
