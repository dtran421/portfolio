const BlogPostQuery = /* GraphQL */ `
    query ($postId: String) {
        blogPostCollection(limit: 1, where: { postId: $postId }) {
            items {
                postId
                title
                body {
                    json
                    links {
                        entries {
                            block {
                                sys {
                                    id
                                }
                                __typename
                                ... on CodeSnippet {
                                    code
                                    language
                                }
                            }
                        }
                    }
                }
                heroBanner {
                    title
                    url
                    width
                    height
                }
                publishDate
                topicTags
            }
        }
    }
`;

export default BlogPostQuery;
