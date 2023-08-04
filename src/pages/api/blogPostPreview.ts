import { NextApiRequest, NextApiResponse } from "next";

import BlogPostQuery from "@/graphql/BlogPostQuery";
import { queryContentful } from "@/lib/ContentfulUtil";
import { logger } from "@/lib/Logger";
import { isNone, isOk, unwrap } from "@/lib/ReturnTypes";
import { BlogPost } from "@/lib/types";

export interface BlogPostQR {
  blogPostCollection: {
    items: BlogPost[];
  };
}

const getPost = async (postId) => {
  const response = await queryContentful<BlogPostQR>(BlogPostQuery, { postId }, true);

  if (!isOk(response)) {
    logger.error(`Something went wrong with fetching blog post: ${response.error.message}`);
    return null;
  }

  const {
    blogPostCollection: {
      items: [postData],
    },
  } = unwrap(response);

  return postData;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (req.query.secret !== process.env.PREVIEW_SECRET_KEY || isNone(req.query.postId)) {
    return res.status(401).json({ message: "Invalid token" });
  }

  if (typeof req.query.postId !== "string") {
    return res.status(401).json({ message: "Invalid postId" });
  }

  // Fetch the headless CMS to check if the provided `postId` exists
  // getPost implements the required fetching logic to the headless CMS
  const post = await getPost(req.query.postId);

  // If the postId doesn't exist prevent preview mode from being enabled
  if (isNone(post)) {
    return res.status(401).json({ message: "Invalid postId" });
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({
    preview: true,
    postId: req.query.postId,
  });

  // Redirect to the path from the fetched post
  // Don't redirect to req.query.postId as that might lead to open redirect vulnerabilities
  return res.redirect(`/blog/${post.postId}`);
};

export default handler;
