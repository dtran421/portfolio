// * Don't remove this, it's needed for contentful live updates
/* eslint-disable react/jsx-props-no-spreading */

"use client";

import Image from "next/image";
import moment from "moment";
import { FiTag } from "react-icons/fi";

import { useContentfulInspectorMode, useContentfulLiveUpdates } from "@contentful/live-preview/react";

import Body from "@/components/BlogPost/Body";
import FetchError from "@/components/Global/FetchError";
import { BlogPost } from "@/utils/types";

interface ProfileHeaderProps {
  publishDate: string;
  inspectorProps: ReturnType<
    typeof useContentfulInspectorMode<{
      entryId: string;
    }>
  >;
}

const ProfileHeader = ({ publishDate, inspectorProps }: ProfileHeaderProps) => (
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-slate-700 dark:text-slate-300 space-y-2 md:space-y-0">
    <div className="flex items-center space-x-4">
      <figure className="w-10 h-10 overflow-hidden rounded-full">
        <Image src="/img/casual.png" alt="casual pic of me" width={1162} height={1378} />
      </figure>
      <section>
        <h1 className="lg:text-lg font-medium">Duke Tran</h1>
        <p className="text-sm lg:text-base">
          Published on{" "}
          <span
            {...inspectorProps({
              fieldId: "publishDate",
            })}
          >
            {moment(publishDate).format("MMMM Do, YYYY")}
          </span>
        </p>
      </section>
    </div>
    {/* // TODO: implement this */}
    {/* <div>
      <p>Also Published:</p>
    </div> */}
  </div>
);

interface BlogPostProps {
  blogPost: BlogPost;
}

const BlogPostPage = ({ blogPost }: BlogPostProps) => {
  const inspectorProps = useContentfulInspectorMode({ entryId: blogPost.sys.id });
  const updatedBlogPost = useContentfulLiveUpdates(blogPost);

  if (!updatedBlogPost) {
    return (
      <div className="max-w-lg lg:max-w-2xl xl:max-w-4xl bg-gray-200 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 dark-transition rounded-xl shadow-lg mx-6 md:mx-auto mt-8 md:mt-10">
        <FetchError />
      </div>
    );
  }

  const { title, publishDate, topicTags, heroBanner, body } = updatedBlogPost;

  return (
    <main className="max-w-lg lg:max-w-2xl xl:max-w-4xl bg-gray-200 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 dark-transition rounded-xl shadow-lg mx-6 md:mx-auto mt-8 md:mt-10">
      <figure className="overflow-hidden w-full h-48 md:h-56 lg:h-64 flex items-center rounded-t-xl mb-6">
        {heroBanner.url && (
          <Image
            src={heroBanner.url}
            alt={heroBanner.title}
            width={heroBanner.width}
            height={heroBanner.height}
            {...inspectorProps({
              fieldId: "heroBanner",
            })}
          />
        )}
      </figure>
      <div className="space-y-12 lg:space-y-16 px-4 md:px-12 pb-12">
        <div className="space-y-4">
          <div className="space-y-8">
            {publishDate && <ProfileHeader publishDate={publishDate} inspectorProps={inspectorProps} />}
            <h1
              {...inspectorProps({
                fieldId: "title",
              })}
              className="text-5xl lg:text-5xl font-bold"
            >
              {title}
            </h1>
          </div>
          <div className="flex flex-wrap gap-3">
            {topicTags?.map((tag) => (
              <div
                key={tag}
                {...inspectorProps({
                  fieldId: "topicTags",
                })}
                className="flex items-center text-white bg-secondary rounded-full space-x-2 px-4 py-1"
              >
                <FiTag size={21} />
                <p className=" lg:text-base">{tag}</p>
              </div>
            ))}
          </div>
        </div>
        <Body document={body?.json} links={body?.links} />
      </div>
    </main>
  );
};

export default BlogPostPage;
