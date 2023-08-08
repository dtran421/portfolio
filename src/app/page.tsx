import { cache } from "react";
import { Metadata } from "next";

import TimelineAndLanguageQuery from "@/graphql/TimelineAndLanguageQuery";
import { queryContentful } from "@/utils/Contentful";
import { logger } from "@/utils/Logger";
import { Err, Ok } from "@/utils/ReturnTypes";

import { openGraph } from "./layout";
import PortfolioPage, { IndexProps } from "./portfolio-page";

export const metadata: Metadata = {
  title: "Duke Tran | Portfolio",
  openGraph,
};

type IndexQR = IndexProps;

export const revalidate = 3600; // revalidate the data at most every hour

export const getIndexData = cache(async () => {
  const response = await queryContentful<IndexQR>(TimelineAndLanguageQuery);

  if (response.isErr()) {
    const err = (response as Err<Error>).unwrap();
    logger.error(`Something went wrong with fetching index data: ${err.message}`);
    return {
      timelineEvents: null,
      languageGroups: null,
    };
  }

  const { timelineEvents, languageGroups } = (response as Ok<IndexQR>).unwrap();

  return {
    timelineEvents,
    languageGroups,
  };
});

export default async function Page() {
  const { timelineEvents, languageGroups } = await getIndexData();
  return <PortfolioPage timelineEvents={timelineEvents} languageGroups={languageGroups} />;
}
