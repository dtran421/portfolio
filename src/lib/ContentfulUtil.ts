import axios, { AxiosError } from "axios";

import { logger } from "@/lib/Logger";

import { err, ok } from "./ReturnTypes";

const getBaseContentfulUrl = () =>
  `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/`;

export const queryContentful = async <T>(query: string) => {
  try {
    const { data, status, statusText } = await axios.post<{
      data: T;
    }>(
      getBaseContentfulUrl(),
      { query },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN}`,
        },
      }
    );

    if (status !== 200) {
      return err(new Error(`[${status}] ${statusText}`));
    }

    if (!data.data) {
      return err(new Error("no data returned"));
    }

    return ok({
      ...data.data,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      logger.error("Something went wrong with axios: ", error.toJSON());
    }

    return err<Error | AxiosError>(error);
  }
};
