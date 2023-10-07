import { Metadata } from "next";

import { truncateString } from "@/utils/CommonUtil";

import { openGraph } from "../shared-metadata";

export const metadata: Metadata = {
  title: {
    template: truncateString("Blog | %s"),
    default: "Blog",
  },
  openGraph,
};

const BlogLayout = ({ children }: { children: React.ReactNode }) => children;

export default BlogLayout;
