import { ReactNode } from "react";
import { Metadata } from "next";

import { openGraph } from "@/app/shared-metadata";
import { truncateString } from "@/utils/CommonUtil";

import { getBlogPost } from "./query";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const { slug } = params;

  // fetch data
  const blogPost = await getBlogPost(slug);

  return {
    title: blogPost ? truncateString(blogPost.title) : "Not Found",
    openGraph,
  };
}

const BlogPostLayout = ({ children }: { children: ReactNode }) => children;

export default BlogPostLayout;
