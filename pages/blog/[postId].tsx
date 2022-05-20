import Image from "next/image";
import { FiTag } from "react-icons/fi";

import BlogPostsQuery from "../../graphql/BlogPostsQuery";
import BlogPostQuery from "../../graphql/BlogPostQuery";
import { BlogPost } from "../../types";

import MainLayout from "../../components/Global/layouts/MainLayout";
import { convertDateToFullString } from "../blog";
import Body from "../../components/BlogPost/Body";

type ProfileHeaderProps = {
    publishDate: string;
};

const ProfileHeader = ({ publishDate }: ProfileHeaderProps) => (
    <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
        <div className="flex items-center space-x-4">
            <div className="w-10 h-10 overflow-hidden rounded-full">
                <Image
                    src="/img/casual.png"
                    alt="casual pic of me"
                    width={1162}
                    height={1378}
                />
            </div>
            <h1 className="text-xl font-medium">Duke Tran</h1>
        </div>
        <p>Published on {convertDateToFullString(publishDate)}</p>
    </div>
);

type BlogPostProps = {
    postData: BlogPost;
};

const BlogPostPage = ({
    postData: {
        title,
        publishDate,
        topicTags: tags,
        heroBanner: { title: imgTitle, url, width, height },
        body
    }
}: BlogPostProps) => (
    <MainLayout page={title} rootPage="Blog">
        <div className="max-w-lg lg:max-w-2xl xl:max-w-4xl bg-gray-200 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 dark-transition rounded-xl shadow-lg mx-auto mt-10">
            <div className="overflow-hidden w-full h-64 flex items-center rounded-t-xl mb-6">
                <Image src={url} alt={imgTitle} {...{ width, height }} />
            </div>
            <div className="px-12 pb-12">
                <div className="space-y-4 mb-16">
                    <ProfileHeader {...{ publishDate }} />
                    <h1 className="text-6xl font-bold">{title}</h1>
                    <div className="flex flex-wrap space-x-3">
                        {tags.map((tag) => (
                            <div
                                key={tag}
                                className="flex items-center text-white bg-secondary rounded-full space-x-2 px-4 py-1"
                            >
                                <FiTag size={21} />
                                <p className="text-lg">{tag}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <Body document={body.json} links={body.links} />
            </div>
        </div>
    </MainLayout>
);

export async function getStaticPaths() {
    try {
        const response = await fetch(
            `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`
                },
                body: JSON.stringify({ query: BlogPostsQuery })
            }
        );
        const {
            data: {
                blogPostCollection: { items: blogPosts }
            }
        } = await response.json();

        const paths = blogPosts.map(({ postId }) => ({
            params: { postId }
        }));

        return {
            paths,
            fallback: false
        };
    } catch (exception) {
        console.error(
            `Something went wrong with fetching blog posts ${exception.message}`
        );
        return {
            paths: [],
            fallback: true
        };
    }
}

export async function getStaticProps({ params: { postId } }) {
    try {
        const response = await fetch(
            `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`
                },
                body: JSON.stringify({
                    query: BlogPostQuery,
                    variables: { postId }
                })
            }
        );
        const {
            data: {
                blogPostCollection: { items: postData }
            }
        } = await response.json();

        return {
            props: {
                postData: postData[0]
            }
        };
    } catch (exception) {
        console.error(
            `Something went wrong with fetching blog posts ${exception.message}`
        );
        return {
            props: {
                postData: {}
            }
        };
    }
}

export default BlogPostPage;
