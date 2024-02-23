"use client";

import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import { FiTag } from "react-icons/fi";
import { cn } from "utils-toolkit";

import useEstimateReadingTime from "@/hooks/useEstimateReadingTime";
import { BlogPost } from "@/utils/types";

type TagsProps = {
  tags: string[];
};

const Tags = ({ tags }: TagsProps) => (
  <div className="flex flex-wrap gap-2">
    {tags.map((tag) => (
      <p key={tag} className="w-min flex items-center text-sm text-white bg-secondary rounded-full space-x-1 px-3 py-1">
        <FiTag size={20} />
        <span>{tag}</span>
      </p>
    ))}
  </div>
);

type BlogPostCardProps = Omit<BlogPost, "sys"> & {
  featured?: boolean;
};

const BlogPostCard = ({
  postId,
  title,
  publishDate,
  topicTags: tags,
  heroBanner: { title: imgTitle, url, width, height },
  body: {
    json: { content },
  },
  featured = false,
}: BlogPostCardProps) => {
  const { readTimeEstimate } = useEstimateReadingTime(content);

  return (
    <Link href={`/blog/${postId}`} passHref>
      <button
        type="button"
        className={cn(
          "overflow-hidden border-2 border-transparent hover:border-primary/75 dark-transition rounded-xl space-y-4",
          featured && "flex flex-col lg:grid lg:grid-cols-3"
        )}
      >
        <div
          className={cn(
            "flex items-center overflow-hidden rounded-lg",
            featured ? "lg:col-span-2 md:h-48 lg:h-72" : "lg:h-40 xl:h-44"
          )}
        >
          <Image src={url} alt={imgTitle} width={width} height={height} layout="intrinsic" className="rounded-lg" />
        </div>
        <div className={cn("w-full space-y-2 lg:space-y-3", featured ? "p-3 lg:p-4" : "px-3 lg:px-4 pb-3 lg:pb-4")}>
          <div>
            <div className="flex lg:flex-col xl:flex-row justify-between lg:items-start text-gray-700 dark:text-gray-300">
              <p className="text-sm lg:text-base">{moment(publishDate).format("MMMM Do, YYYY")}</p>
              <p className="text-sm lg:text-base">{readTimeEstimate} min read</p>
            </div>
            <h2 className="text-left text-xl lg:text-2xl dark:text-white dark-transition font-semibold">{title}</h2>
          </div>
          <Tags tags={tags} />
        </div>
      </button>
    </Link>
  );
};

export default BlogPostCard;
