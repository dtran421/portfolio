import { draftMode } from "next/headers";

import { BlogPostQR } from "@/app/api/blog/draft/route";
import BlogPostQuery from "@/graphql/BlogPostQuery";
import { queryContentful } from "@/utils/Contentful";
import { logger } from "@/utils/ServerUtil";

export const getBlogPost = async (slug: string) => {
  const { isEnabled } = draftMode();

  const response = await queryContentful<BlogPostQR>(BlogPostQuery, { postId: slug }, isEnabled);

  if (!response.ok) {
    const err = response.unwrap();
    logger.error(`Something went wrong with fetching blog post: ${err.message}`);
    return null;
  }

  const {
    blogPosts: [blogPost],
  } = response.unwrap();

  return blogPost;
};
