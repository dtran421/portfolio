import Link from "next/link";
import Image from "next/image";
import { FiTag } from "react-icons/fi";

import { BlogPost } from "../types";
import BlogPostsQuery from "../graphql/BlogPostsQuery";

import MainLayout from "../components/Global/layouts/MainLayout";

type TagsProps = {
    tags: string[];
};

const Tags = ({ tags }: TagsProps) => (
    <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
            <p
                key={tag}
                className="w-min flex items-center text-sm text-white bg-secondary rounded-full space-x-1 px-3 py-1"
            >
                <FiTag size={20} />
                <span>{tag}</span>
            </p>
        ))}
    </div>
);

export const convertDateToFullString = (rawDateStr: string): string => {
    const fullMonths = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    const date = rawDateStr.split("T")[0].split("-");
    return `${fullMonths[parseInt(date[1], 10) - 1]} ${date[2]}, ${date[0]}`;
};

const estimateReadingTime = (content) => {
    const AVG_READ_SPEED = 250; // words per minute
    const AVG_WORD_LENGTH = 6; // letters

    const totalChars = content
        .map(({ content: bodyContent, nodeType }) => {
            if (nodeType === "paragraph") {
                return bodyContent
                    .map(({ value }) =>
                        value
                            .split(" ")
                            .map((word) => word.length / AVG_WORD_LENGTH)
                            .reduce(
                                (prevLength, currLength) =>
                                    prevLength + currLength
                            )
                    )
                    .reduce(
                        (prevLength, currLength) => prevLength + currLength
                    );
            }
            return 0;
        })
        .reduce((prevValue, currValue) => prevValue + currValue);

    return Math.ceil(totalChars / (AVG_READ_SPEED * AVG_WORD_LENGTH));
};

type BlogPostCardProps = BlogPost & {
    featured?: boolean;
};

const BlogPostCard = ({
    postId,
    title,
    publishDate,
    topicTags: tags,
    heroBanner: { title: imgTitle, url, width, height },
    body: {
        json: { content }
    },
    featured = false
}: BlogPostCardProps) => {
    const readTimeEstimate = estimateReadingTime(content);

    return (
        <Link href={`/blog/${postId}`} passHref>
            <button
                type="button"
                className={`overflow-hidden ${
                    featured ? "grid grid-cols-3" : ""
                } border-2 border-transparent hover:border-primary dark-transition rounded-xl space-y-4`}
            >
                <div
                    className={`w-full ${
                        featured ? "col-span-2 w-full h-72" : "h-44"
                    } overflow-hidden flex items-center rounded-lg`}
                >
                    <Image
                        src={url}
                        alt={imgTitle}
                        width={width}
                        height={height}
                        layout="intrinsic"
                    />
                </div>
                <div className={`space-y-3 ${featured ? "p-4" : "px-4 pb-4"}`}>
                    <div>
                        <div className="flex justify-between text-gray-700 dark:text-gray-300">
                            <p>{convertDateToFullString(publishDate)}</p>
                            <p>{readTimeEstimate} min read</p>
                        </div>
                        <h2 className="text-left text-2xl font-semibold">
                            {title}
                        </h2>
                    </div>
                    <Tags {...{ tags }} />
                </div>
            </button>
        </Link>
    );
};

type BlogProps = {
    blogPosts: BlogPost[];
};

const Blog = ({ blogPosts }: BlogProps) => (
    <MainLayout page="Blog">
        <div className="max-w-lg lg:max-w-2xl xl:max-w-4xl space-y-8 mx-auto mt-10">
            <h1 className="text-5xl font-semibold">devDeque</h1>
            <BlogPostCard {...blogPosts[0]} featured />
            <div className="grid grid-cols-3 gap-4">
                {blogPosts.slice(1).map((blogPost) => (
                    <BlogPostCard key={blogPost.postId} {...blogPost} />
                ))}
            </div>
        </div>
    </MainLayout>
);

export async function getStaticProps() {
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

        return {
            props: {
                blogPosts
            }
        };
    } catch (exception) {
        console.error(
            `Something went wrong with fetching blog posts ${exception.message}`
        );
        return {
            props: {
                blogPosts: []
            }
        };
    }
}

export default Blog;
