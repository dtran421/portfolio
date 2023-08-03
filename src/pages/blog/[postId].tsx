import { GetStaticProps } from "next";
import Image from "next/image";
import { FiTag } from "react-icons/fi";
import SquareLoader from "react-spinners/SquareLoader";

import Body from "@/components/BlogPost/Body";
import MainLayout from "@/layouts/MainLayout";
import getContentfulAccessToken from "@/lib/getContentfulAccessToken";
import { BlogPost } from "@/lib/types";

import BlogPostQuery from "@/graphql/BlogPostQuery";
import BlogPostsQuery from "@/graphql/BlogPostsQuery";
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
  postData: BlogPost;
};

const BlogPostPage = ({ postData }: BlogPostProps) => {
  if (!postData) {
    return (
      <MainLayout page="" rootPage="Blog">
        <div className="max-w-lg lg:max-w-2xl xl:max-w-4xl bg-gray-200 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 dark-transition rounded-xl shadow-lg mx-6 md:mx-auto mt-8 md:mt-10">
          <div className="w-full flex justify-center items-center py-10">
            <SquareLoader color="#9333ea" />
          </div>
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
  } = postData;

  return (
    <MainLayout page={title} rootPage="Blog">
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

export const getStaticPaths = async ({ preview }) => {
  try {
    const accessToken = getContentfulAccessToken(preview);

    const response = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ query: BlogPostsQuery }),
      }
    );
    const {
      data: {
        blogPostCollection: { items: blogPosts },
      },
    } = await response.json();

    const paths = blogPosts.map(({ postId }) => ({
      params: { postId },
    }));

    return {
      paths,
      fallback: false,
    };
  } catch (exception) {
    console.error(`Something went wrong with fetching blog posts: ${exception.message}`);
    return {
      paths: [],
      fallback: true,
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ preview, params: { postId } }) => {
  try {
    const accessToken = getContentfulAccessToken(preview);

    const response = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          query: BlogPostQuery,
          variables: { preview, postId },
        }),
      }
    );
    const {
      data: {
        blogPostCollection: { items: postData },
      },
    } = await response.json();

    return {
      props: {
        postData: postData[0],
      },
    };
  } catch (exception) {
    console.error(`Something went wrong with fetching blog post: ${exception.message}`);
    return {
      props: {
        postData: null,
      },
    };
  }
};

export default BlogPostPage;
