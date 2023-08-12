import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

import BlogPostQuery from "@/graphql/BlogPostQuery";
import { queryContentful } from "@/utils/Contentful";
import { logger } from "@/utils/Logger";
import { Err, Ok, Option } from "@/utils/ReturnTypes";
import { BlogPost } from "@/utils/types";

export interface BlogPostQR {
  blogPosts: BlogPost[];
}

const getPostBySlug = async (slug: string) => {
  const response = await queryContentful<BlogPostQR>(BlogPostQuery, { postId: slug }, true);

  if (response.isErr()) {
    const err = (response as Err<Error>).unwrap();
    logger.error(`Something went wrong with fetching blog post: ${err.message}`);
    return Option<BlogPost>(null);
  }

  const {
    blogPosts: [blogPost],
  } = (response as Ok<BlogPostQR>).unwrap();

  return Option<BlogPost>(blogPost);
};

export async function GET(req: Request) {
  // Parse query string parameters
  const { searchParams } = new URL(req.url);
  const secret = Option<string>(searchParams.get("secret"));
  const slug = Option<string>(searchParams.get("slug"));

  if (secret.isNone() || slug.isNone()) {
    return new Response("Missing token", { status: 401 });
  }

  // Check the secret and next parameters
  // This secret should only be known to this route handler and the CMS
  if (secret.coalesce() !== process.env.PREVIEW_SECRET_KEY || typeof slug.coalesce() !== "string") {
    return new Response("Invalid token", { status: 401 });
  }

  // Fetch the headless CMS to check if the provided `slug` exists
  // getPostBySlug would implement the required fetching logic to the headless CMS
  const post = await getPostBySlug(slug.coalesce());

  // If the slug doesn't exist prevent draft mode from being enabled
  if (post.isNone()) {
    return new Response("Invalid slug", { status: 401 });
  }

  // Enable Draft Mode by setting the cookie
  draftMode().enable();

  // Redirect to the path from the fetched post
  // We don't redirect to searchParams.slug as that might lead to open redirect vulnerabilities
  redirect(`/blog/${post.coalesce().postId}`);
}
