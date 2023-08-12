import { ContentfulQuery } from "@/utils/Contentful";

import { ContentfulResource } from "./Resources";

const BlogPostQuery = /* GraphQL */ `
  query ($preview: Boolean, $postId: String) {
    blogPostCollection(preview: $preview, limit: 1, where: { postId: $postId }) {
      items {
        __typename
        sys {
          id
        }
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

const q: ContentfulQuery = {
  resources: [ContentfulResource.BlogPost],
  query: BlogPostQuery,
};

export default q;
