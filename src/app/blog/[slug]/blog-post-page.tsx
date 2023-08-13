"use client";

import Image from "next/legacy/image";
import { FiTag } from "react-icons/fi";

import { useContentfulInspectorMode } from "@contentful/live-preview/react";

import Body from "@/components/BlogPost/Body";
import FetchError from "@/components/Global/FetchError";
import { ContentfulResource } from "@/graphql/Resources";
import { useContentfulUpdatedData } from "@/hooks/useContentfulUpdatedData";
import { BlogPost } from "@/utils/types";

import { convertDateToFullString } from "../blog-page";

type ProfileHeaderProps = {
  publishDate: string;
};

const ProfileHeader = ({ publishDate }: ProfileHeaderProps) => (
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-slate-700 dark:text-slate-300 space-y-2 md:space-y-0">
    <div className="flex items-center space-x-4">
      <div className="w-10 h-10 overflow-hidden rounded-full">
        <Image src="/img/casual.png" alt="casual pic of me" width={1162} height={1378} />
      </div>
      <div>
        <h1 className="lg:text-lg font-medium">Duke Tran</h1>
        <p className="text-sm lg:text-base">Published on {convertDateToFullString(publishDate)}</p>
      </div>
    </div>
    <div>
      <p>Also Published:</p>
    </div>
  </div>
);

type BlogPostProps = {
  blogPost: BlogPost | null;
};

const BlogPostPage = ({ blogPost }: BlogPostProps) => {
  const inspectorProps = useContentfulInspectorMode();
  const updatedBlogPost = useContentfulUpdatedData<BlogPost | null>(ContentfulResource.BlogPost, blogPost);

  if (!updatedBlogPost) {
    return (
      <div className="max-w-lg lg:max-w-2xl xl:max-w-4xl bg-gray-200 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 dark-transition rounded-xl shadow-lg mx-6 md:mx-auto mt-8 md:mt-10">
        <FetchError />
      </div>
    );
  }

  const { title, publishDate, topicTags, heroBanner, body } = updatedBlogPost;

  return (
    <div className="max-w-lg lg:max-w-2xl xl:max-w-4xl bg-gray-200 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 dark-transition rounded-xl shadow-lg mx-6 md:mx-auto mt-8 md:mt-10">
      <div className="overflow-hidden w-full h-48 md:h-56 lg:h-64 flex items-center rounded-t-xl mb-6">
        {heroBanner.url && (
          <Image src={heroBanner.url} alt={heroBanner.title} width={heroBanner.width} height={heroBanner.height} />
        )}
      </div>
      <div className="space-y-12 lg:space-y-16 px-4 md:px-12 pb-12">
        <div className="space-y-4">
          <div className="space-y-8">
            {publishDate && <ProfileHeader publishDate={publishDate} />}
            <h1 className="text-5xl lg:text-5xl font-bold">{title}</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            {topicTags?.map((tag) => (
              <div key={tag} className="flex items-center text-white bg-secondary rounded-full space-x-2 px-4 py-1">
                <FiTag size={21} />
                <p className=" lg:text-base">{tag}</p>
              </div>
            ))}
          </div>
        </div>
        <Body document={body.json} links={body?.links} />
      </div>
    </div>
  );
};

export default BlogPostPage;
