import { cache } from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FiHome, FiMail, FiPhone } from "react-icons/fi";

import FetchError from "@/components/Global/FetchError";
import CheckMark from "@/components/Resume/CheckMark";
import ContactLabel from "@/components/Resume/ContactLabel";
import Section from "@/components/Resume/Section";
import ResumeSectionsQuery from "@/graphql/ResumeSectionsQuery";
import { queryContentful } from "@/utils/Contentful";
import { Err, Ok } from "@/utils/ReturnTypes";
import { logger } from "@/utils/ServerUtil";
import { ResumeBubblesSection, ResumeSubsection, ResumeTabSection } from "@/utils/types";

import { openGraph } from "../shared-metadata";

export const metadata: Metadata = {
  title: "Resume",
  openGraph,
};

interface ResumeQR {
  resumeTabSections: ResumeTabSection[];
  resumeBubblesSections: ResumeBubblesSection[];
}

export const revalidate = 3600; // revalidate the data at most every hour

export const getResumeData = cache(
  async (): Promise<{
    resumeTabSections: {
      [heading: string]: ResumeSubsection[];
    } | null;
    resumeBubblesSections: {
      [heading: string]: string[];
    } | null;
  }> => {
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
  }
);

export default async function Page() {
  const { resumeTabSections, resumeBubblesSections } = await getResumeData();
  return (
    <main>
      <div className="md:max-w-2xl lg:max-w-4xl xl:max-w-6xl h-48 lg:h-64 mx-auto">
        <figure
          className="h-full overflow-hidden bg-no-repeat bg-auto lg:bg-cover bg-center "
          style={{ backgroundImage: "url(/img/city_night.jpg)" }}
        />
        <figure className="relative w-full h-full flex justify-center lg:justify-start px-10">
          <div className="absolute bottom-32 lg:bottom-48 overflow-hidden w-48 h-48 lg:w-56 lg:h-56 border-8 border-slate-100 dark:border-zinc-900 dark-transition rounded-full">
            <Image
              alt="headshot"
              src="/img/profile.jpeg"
              width={1080}
              height={1616}
              className="-translate-y-14 brightness-110"
            />
          </div>
        </figure>
      </div>
      <div className="w-3/4 md:max-w-2xl lg:max-w-4xl xl:max-w-6xl flex flex-col items-start space-y-2 mx-auto mt-16 lg:mt-20">
        <div className="z-10 flex items-center space-x-2 lg:space-x-4">
          <h1 className="text-2xl lg:text-3xl dark:text-white font-bold">Duke Tran</h1>
          <CheckMark />
        </div>
        <div className="z-10 flex flex-col md:flex-row justify-between text-lg text-zinc-800 dark:text-zinc-200 dark-transition">
          <div className="flex flex-col justify-between space-y-4 lg:space-y-6 mb-10 lg:mb-0">
            <h2 className="md:w-5/6 lg:w-2/3 xl:w-4/5 font-medium text-sm lg:text-lg">
              Full Stack Software Engineer @ Arch
            </h2>
            <Link href="/contact">
              <button
                type="button"
                className="w-full md:w-min bg-primary text-lg lg:text-xl text-white dark:text-zinc-200 dark-transition font-semibold rounded-full px-8 py-1 lg:py-2"
              >
                Contact
              </button>
            </Link>
          </div>
          <div className="lg:w-1/3 space-y-2">
            <ContactLabel label="duketran2001@gmail.com" icon={<FiMail />} />
            <ContactLabel label="(703)-409-3681" icon={<FiPhone />} />
            <ContactLabel label="Please contact me personally if you need my address" special icon={<FiHome />} />
          </div>
        </div>
      </div>
      <div className="w-3/4 md:max-w-xl lg:max-w-3xl xl:max-w-5xl space-y-20 mx-auto mt-10 lg:mt-20">
        {resumeTabSections ? (
          Object.entries(resumeTabSections).map(([heading, tabs]) => (
            <Section key={heading} type="Tabs" heading={heading} body={tabs} />
          ))
        ) : (
          <FetchError />
        )}
        {resumeBubblesSections ? (
          Object.entries(resumeBubblesSections).map(([heading, bubbles]) => (
            <Section key={heading} type="Bubbles" heading={heading} body={bubbles} />
          ))
        ) : (
          <FetchError />
        )}
      </div>
    </main>
  );
}
