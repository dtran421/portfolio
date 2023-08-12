import { draftMode } from "next/headers";

import { BlogPostQR } from "@/app/api/blog/draft/route";
import BlogPostQuery from "@/graphql/BlogPostQuery";
import { queryContentful } from "@/utils/Contentful";
import { logger } from "@/utils/Logger";
import { Err, Ok } from "@/utils/ReturnTypes";

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
