import { cache } from "react";
import { Metadata } from "next";

import ResumeSectionsQuery from "@/graphql/ResumeSectionsQuery";
import { queryContentful } from "@/utils/Contentful";
import { logger } from "@/utils/Logger";
import { Err, Ok } from "@/utils/ReturnTypes";
import { ResumeBubblesSection, ResumeTabSection } from "@/utils/types";

import { openGraph } from "../shared-metadata";

import ResumePage from "./resume-page";

export const metadata: Metadata = {
  title: "Resume",
  openGraph,
};

interface ResumeQR {
  resumeTabSections: ResumeTabSection[];
  resumeBubblesSections: ResumeBubblesSection[];
}

export const getResumeData = cache(async () => {
  const response = await queryContentful<ResumeQR>(ResumeSectionsQuery);

  if (response.isErr()) {
    const err = (response as Err<Error>).unwrap();
    logger.error(`Something went wrong with fetching resume data: ${err.message}`);
    return {
      resumeTabSections: null,
      resumeBubblesSections: null,
    };
  }

  const { resumeTabSections, resumeBubblesSections } = (response as Ok<ResumeQR>).unwrap();

  return {
    resumeTabSections: resumeTabSections.reduce(
      (map, { heading, subsectionsCollection: { items: subsections } }) => ({
        ...map,
        [heading]: subsections,
      }),
      {}
    ),
    resumeBubblesSections: resumeBubblesSections.reduce(
      (map, { heading, items }) => ({
        ...map,
        [heading]: items,
      }),
      {}
    ),
  };
});

export default async function Page() {
  const { resumeTabSections, resumeBubblesSections } = await getResumeData();
  return <ResumePage resumeTabSections={resumeTabSections} resumeBubblesSections={resumeBubblesSections} />;
}
