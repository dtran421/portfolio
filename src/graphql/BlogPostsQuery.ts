import { gql } from "graphql-tag";

import { ContentfulQuery } from "@/utils/Contentful";

import { ContentfulResource } from "./Resources";

const BlogPostsQuery = gql`
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

const q: ContentfulQuery = {
  resources: [ContentfulResource.BlogPost],
  query: BlogPostsQuery,
};

export default q;
