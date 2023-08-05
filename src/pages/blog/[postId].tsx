import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { FiTag } from "react-icons/fi";

import Body from "@/components/BlogPost/Body";
import FetchError from "@/components/Global/FetchError";
import BlogPostQuery from "@/graphql/BlogPostQuery";
import BlogPostsQuery from "@/graphql/BlogPostsQuery";
import MainLayout from "@/layouts/MainLayout";
import { queryContentful } from "@/lib/ContentfulUtil";
import { logger } from "@/lib/Logger";
import { Err, Ok } from "@/lib/ReturnTypes";
import { BlogPost } from "@/lib/types";

import { BlogPostQR } from "../api/blogPostPreview";
import { convertDateToFullString } from "../blog";

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
  blogPost: BlogPost;
};

const BlogPostPage = ({ blogPost }: BlogPostProps) => {
  if (!blogPost) {
    return (
      <MainLayout rootPage="Blog">
        <div className="max-w-lg lg:max-w-2xl xl:max-w-4xl bg-gray-200 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 dark-transition rounded-xl shadow-lg mx-6 md:mx-auto mt-8 md:mt-10">
          <FetchError />
        </div>
      </MainLayout>
    );
  }

  const {
    title,
    publishDate,
    topicTags: tags,
    heroBanner: { title: imgTitle, url, width, height },
    body,
  } = blogPost;

  return (
    <MainLayout rootPage="Blog" pageTitle={title}>
      <div className="max-w-lg lg:max-w-2xl xl:max-w-4xl bg-gray-200 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 dark-transition rounded-xl shadow-lg mx-6 md:mx-auto mt-8 md:mt-10">
        <div className="overflow-hidden w-full h-48 md:h-56 lg:h-64 flex items-center rounded-t-xl mb-6">
          <Image src={url} alt={imgTitle} {...{ width, height }} />
        </div>
        <div className="space-y-12 lg:space-y-16 px-4 md:px-12 pb-12">
          <div className="space-y-4">
            <div className="space-y-8">
              <ProfileHeader {...{ publishDate }} />
              <h1 className="text-5xl lg:text-5xl font-bold">{title}</h1>
            </div>
            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => (
                <div key={tag} className="flex items-center text-white bg-secondary rounded-full space-x-2 px-4 py-1">
                  <FiTag size={21} />
                  <p className=" lg:text-base">{tag}</p>
                </div>
              ))}
            </div>
          </div>
          <Body document={body.json} links={body.links} />
        </div>
      </div>
    </MainLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await queryContentful<BlogPostQR>(BlogPostsQuery);

  if (response.isErr()) {
    const err = (response as Err<Error>).unwrap();
    logger.error(`Something went wrong with fetching blog posts: ${err.message}`);
    return {
      paths: [],
      fallback: true,
    };
  }

  const { blogPosts } = (response as Ok<BlogPostQR>).unwrap();

  const paths = blogPosts.map(({ postId }) => ({
    params: { postId },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  BlogPostProps,
  {
    postId: string;
  }
> = async ({ preview = false, params: { postId } }) => {
  const response = await queryContentful<BlogPostQR>(BlogPostQuery, { preview, postId }, preview);

  if (response.isErr()) {
    const err = (response as Err<Error>).unwrap();
    logger.error(`Something went wrong with fetching blog post: ${err.message}`);
    return {
      props: {
        blogPost: null,
      },
    };
  }

  const {
    blogPosts: [blogPost],
  } = (response as Ok<BlogPostQR>).unwrap();

  return {
    props: {
      blogPost,
    },
  };
};

export default BlogPostPage;
