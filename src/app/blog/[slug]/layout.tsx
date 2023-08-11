import { ReactNode } from "react";
import { Metadata } from "next";
import { draftMode } from "next/headers";

import { BlogPostQR } from "@/app/api/blog/draft/route";
import { openGraph } from "@/app/shared-metadata";
import BlogPostQuery from "@/graphql/BlogPostQuery";
import { queryContentful } from "@/utils/Contentful";
import { logger } from "@/utils/Logger";
import { Err, Ok } from "@/utils/ReturnTypes";

type Props = {
  params: { slug: string };
};

export const getBlogPost = async (slug: string) => {
  const { isEnabled } = draftMode();

  const response = await queryContentful<BlogPostQR>(BlogPostQuery, { postId: slug }, isEnabled);

  if (response.isErr()) {
    const err = (response as Err<Error>).unwrap();
    logger.error(`Something went wrong with fetching blog post: ${err.message}`);
    return null;
  }

  const {
    blogPosts: [blogPost],
  } = (response as Ok<BlogPostQR>).unwrap();

  return blogPost;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const { slug } = params;

  // fetch data
  const blogPost = await getBlogPost(slug);

  return {
    title: blogPost?.title ?? "Not Found",
    openGraph,
  };
}

const BlogPostLayout = ({ children }: { children: ReactNode }) => children;

export default BlogPostLayout;
