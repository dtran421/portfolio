import axios, { AxiosError } from "axios";

import { BLOCKS } from "@contentful/rich-text-types";

import { ContentfulResource } from "@/graphql/Resources";
import { logger } from "@/lib/Logger";
import { Option, Result } from "@/lib/ReturnTypes";
import { RichText } from "@/lib/types";

export const generateRichTextStub = (text?: string): RichText => ({
  json: {
    nodeType: "document" as BLOCKS.DOCUMENT,
    data: {},
    content: [
      {
        nodeType: "paragraph" as BLOCKS.PARAGRAPH,
        data: {},
        content: [
          {
            nodeType: "text",
            value: text || "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            marks: [],
            data: {},
          },
        ],
      },
    ],
  },
});

const getBaseContentfulUrl = () => {
  if (!process.env.CONTENTFUL_SPACE_ID) {
    logger.error("CONTENTFUL_SPACE_ID is not set!");
    return Option<string>(null);
  }

  return Option<string>(`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/`);
};

const getContentfulAccessToken = (preview = false) => {
  if (preview && !process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN) {
    logger.error("CONTENTFUL_PREVIEW_ACCESS_TOKEN is not set!");
    return Option<string>(null);
  }

  if (!preview && !process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN) {
    logger.error("CONTENTFUL_DELIVERY_ACCESS_TOKEN is not set!");
    return Option<string>(null);
  }

  return Option<string>(
    preview ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN : process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN
  );
};

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

  const contentfulUrl = getBaseContentfulUrl();
  const contentfulAccessToken = getContentfulAccessToken(preview);

  if (contentfulUrl.isNone() || contentfulAccessToken.isNone()) {
    return Result<T, Error>(new Error("Env variables not set, this is a problem with the server"));
  }

  try {
    const { data, status, statusText } = await axios.post<{
      data: Record<
        `${ContentfulResource}Collection`,
        {
          items: T[keyof T][];
        }
      >;
    }>(
      contentfulUrl.coalesce(),
      { query, variables },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${contentfulAccessToken.coalesce()}`,
        },
      }
    );

    if (status !== 200) {
      return Result<T, Error>(new Error(`[${status}] ${statusText}`));
    }

    if (!data.data) {
      return Result<T, Error>(new Error("No data returned"));
    }

    const { data: qr } = data;

    // * this looks terrifying, but it just maps the resources to their respective collections, removing the intermediate `items` property
    return Result<T, Error>(resources.reduce((map, r) => ({ ...map, [`${r}s`]: qr[`${r}Collection`].items }), {}) as T);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      logger.error("Something went wrong with axios: ", error.toJSON());
    }

    return Result<T, Error | AxiosError>(error as Error);
  }
};
