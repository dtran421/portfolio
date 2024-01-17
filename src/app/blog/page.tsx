import { cache } from "react";

import BlogPostCard from "@/components/Blog/BlogPostCard";
import Emoji from "@/components/Global/Emoji";
import FetchError from "@/components/Global/FetchError";
import BlogPostsQuery from "@/graphql/BlogPostsQuery";
import { queryContentful } from "@/utils/Contentful";
import { logger } from "@/utils/ServerUtil";
import { BlogPost } from "@/utils/types";

type BlogQR = {
  blogPosts: BlogPost[];
};

export const revalidate = 3600; // revalidate the data at most every hour

const getBlogPosts = cache(async () => {
  const response = await queryContentful<BlogQR>(BlogPostsQuery);

  if (!response.ok) {
    const err = response.unwrap();
    logger.error(`Something went wrong with fetching blog posts: ${err.message}`);
    return [];
  }

  const { blogPosts } = response.unwrap();

  return blogPosts;
});

const BlogPage = async () => {
  const blogPosts = await getBlogPosts();
  return (
    <main className="max-w-lg lg:max-w-2xl xl:max-w-4xl space-y-8 px-8 mx-auto mt-10">
      <h1 className="text-5xl font-semibold mb-10">
        devDeque <Emoji label="fountain pen" symbol="✒️" />
      </h1>
      {!blogPosts && <FetchError />}
      {!!blogPosts?.length && (
        <>
          <BlogPostCard
            postId={blogPosts[0].postId}
            title={blogPosts[0].title}
            publishDate={blogPosts[0].publishDate}
            topicTags={blogPosts[0].topicTags}
            heroBanner={blogPosts[0].heroBanner}
            body={blogPosts[0].body}
            featured
          />
          <div className="flex flex-col md:grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {blogPosts.slice(1).map((blogPost: BlogPost) => (
              <BlogPostCard
                key={blogPost.postId}
                postId={blogPost.postId}
                title={blogPost.title}
                publishDate={blogPost.publishDate}
                topicTags={blogPost.topicTags}
                heroBanner={blogPost.heroBanner}
                body={blogPost.body}
              />
            ))}
          </div>
        </>
      )}
    </main>
  );
};

export default BlogPage;
