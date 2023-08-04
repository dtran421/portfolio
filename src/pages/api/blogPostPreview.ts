import { NextApiRequest, NextApiResponse } from "next";

import BlogPostQuery from "@/graphql/BlogPostQuery";
import { queryContentful } from "@/lib/ContentfulUtil";
import { logger } from "@/lib/Logger";
import { Err, Ok, Option } from "@/lib/ReturnTypes";
import { BlogPost } from "@/lib/types";
import { isNullish } from "@/lib/Util";

export interface BlogPostQR {
  blogPosts: BlogPost[];
}

const getPost = async (postId): Promise<Option<BlogPost>> => {
  const response = await queryContentful<BlogPostQR>(BlogPostQuery, { postId }, true);

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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (req.query.secret !== process.env.PREVIEW_SECRET_KEY || isNullish(req.query.postId)) {
    return res.status(401).json({ message: "Invalid token" });
  }

  if (typeof req.query.postId !== "string") {
    return res.status(401).json({ message: "Invalid postId" });
  }

  // Fetch the headless CMS to check if the provided `postId` exists
  // getPost implements the required fetching logic to the headless CMS
  const post = await getPost(req.query.postId);

  // If the postId doesn't exist prevent preview mode from being enabled
  if (post.isNone()) {
    return res.status(401).json({ message: "Invalid postId" });
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({
    preview: true,
    postId: req.query.postId,
  });

  // Redirect to the path from the fetched post
  // Don't redirect to req.query.postId as that might lead to open redirect vulnerabilities
  return res.redirect(`/blog/${post.coalesce().postId}`);
};

export default handler;
