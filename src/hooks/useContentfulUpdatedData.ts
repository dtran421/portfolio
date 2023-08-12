import { DocumentNode } from "graphql";
import { gql } from "graphql-tag";

import { useContentfulLiveUpdates } from "@contentful/live-preview/react";

import BlogPostQuery from "@/graphql/BlogPostQuery";
import { ContentfulResource } from "@/graphql/Resources";
import { ContentfulEntity } from "@/utils/types";

const getQuery = (resource: ContentfulResource): DocumentNode => {
  switch (resource) {
    case ContentfulResource.BlogPost:
      return gql(BlogPostQuery.query);
    default:
      return gql``;
  }
};

type ContentfulData = ContentfulEntity | ContentfulEntity[] | null | undefined;

export const useContentfulUpdatedData = <T extends ContentfulData>(resource: ContentfulResource, data: T) => {
  const query = getQuery(resource);

  const updatedData = useContentfulLiveUpdates<T>(data, { query });

  if (!query) {
    return data;
  }

  return updatedData;
};
