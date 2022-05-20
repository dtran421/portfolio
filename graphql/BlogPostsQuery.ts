const BlogPostsQuery = /* GraphQL */ `
    query {
        blogPostCollection(order: publishDate_DESC) {
            items {
                postId
                title
                body {
                    json
                }
                heroBanner {
                    title
                    url(transform: { width: 1000, resizeStrategy: SCALE })
                    width
                    height
                }
                publishDate
                topicTags
            }
        }
    }
`;

export default BlogPostsQuery;
