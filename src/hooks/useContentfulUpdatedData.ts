import { gql } from "graphql-tag";

import { useContentfulLiveUpdates } from "@contentful/live-preview/react";

import BlogPostQuery from "@/graphql/BlogPostQuery";
import { ContentfulResource } from "@/graphql/Resources";
import { ContentfulQuery } from "@/utils/Contentful";
import { ContentfulEntity } from "@/utils/types";

const getQuery = (resource: ContentfulResource): ContentfulQuery => {
  switch (resource) {
    case ContentfulResource.BlogPost:
      return BlogPostQuery;
    default:
      return {
        resources: [],
        query: gql``,
      };
  }
};

type ContentfulData = ContentfulEntity | ContentfulEntity[] | null | undefined;

export const useContentfulUpdatedData = <T extends ContentfulData>(resource: ContentfulResource, data: T) => {
  const { query } = getQuery(resource);

  const updatedData = useContentfulLiveUpdates<T>(data, { query });

  if (!query) {
    return data;
  }

  return updatedData;
};
