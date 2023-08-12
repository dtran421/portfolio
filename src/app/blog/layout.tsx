import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "Blog | %s",
    default: "Duke Tran | Blog",
  },
};

const BlogLayout = ({ children }: { children: ReactNode }) => children;

export default BlogLayout;
