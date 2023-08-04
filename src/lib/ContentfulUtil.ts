import axios, { AxiosError } from "axios";

import { ContentfulResource } from "@/graphql/Resources";
import { logger } from "@/lib/Logger";

import { Result } from "./ReturnTypes";

const getBaseContentfulUrl = () =>
  `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/`;

export interface ContentfulQuery {
  resources: ContentfulResource[];
  query: string;
}

export const queryContentful = async <T>(
  gqlQuery: ContentfulQuery,
  variables?: {
    preview?: boolean;
    postId: string;
  },
  preview = false
): Promise<Result<T, Error>> => {
  const { resources, query } = gqlQuery;

  try {
    const { data, status, statusText } = await axios.post<{
      data: T;
    }>(
      getBaseContentfulUrl(),
      { query, variables },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            preview ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN : process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN
          }`,
        },
      }
    );

    if (status !== 200) {
      return Result<T, Error>(new Error(`[${status}] ${statusText}`));
    }

    if (!data.data) {
      return Result<T, Error>(new Error("no data returned"));
    }

    const { data: qr } = data;

    return Result<T, Error>(
      resources.reduce(
        (map, r) => ({ ...map, [`${ContentfulResource[r]}s`]: qr[`${ContentfulResource[r]}Collection`].items }),
        {}
      ) as T
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      logger.error("Something went wrong with axios: ", error.toJSON());
    }

    return Result<T, Error | AxiosError>(error);
  }
};
