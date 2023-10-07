import { cache } from "react";
import { Metadata } from "next";
import Image from "next/image";
import { FaFacebookF, FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa";

import Emoji from "@/components/Global/Emoji";
import FetchError from "@/components/Global/FetchError";
import Carousel from "@/components/Portfolio/Carousel";
import Greeting from "@/components/Portfolio/Greeting";
import LangGroup from "@/components/Portfolio/LangGroup";
import LearnMore from "@/components/Portfolio/LearnMore";
import SocialProfile from "@/components/Portfolio/SocialProfile";
import Timeline from "@/components/Portfolio/Timeline";
import TimelineAndLanguageQuery from "@/graphql/TimelineAndLanguageQuery";
import { queryContentful } from "@/utils/Contentful";
import { Err, Ok } from "@/utils/ReturnTypes";
import { logger } from "@/utils/ServerUtil";
import { LanguageGroup, TimelineEvent } from "@/utils/types";

import PortfolioContent from "@/public/json/index.json";

import { openGraph } from "../shared-metadata";

export const metadata: Metadata = {
  title: "Portfolio",
  openGraph,
};

type PortfolioQR = {
  timelineEvents: TimelineEvent[];
  languageGroups: LanguageGroup[];
};

export const revalidate = 3600; // revalidate the data at most every hour

export const getPortfolioData = cache(async () => {
  const response = await queryContentful<PortfolioQR>(TimelineAndLanguageQuery);

  if (response.isErr()) {
    const err = (response as Err<Error>).unwrap();
    logger.error(`Something went wrong with fetching index data: ${err.message}`);
    return {
      timelineEvents: null,
      languageGroups: null,
    };
  }

  const { timelineEvents, languageGroups } = (response as Ok<PortfolioQR>).unwrap();

  return {
    timelineEvents,
    languageGroups,
  };
});

const PortfolioPage = async () => {
  const { timelineEvents, languageGroups } = await getPortfolioData();

  const {
    intro,
    aboutMe: { section1, section2 },
  } = PortfolioContent;

  return (
    <>
      <section id="page1" className="w-5/6 h-screen flex flex-col justify-start md:justify-around mx-auto">
        <div className="h-4/5 lg:h-2/3 flex flex-col lg:flex-row justify-between md:justify-center items-center lg:space-x-8 space-y-14 lg:space-y-0 mt-10 md:mt-0">
          <div className="w-full lg:w-1/2 flex flex-col justify-start items-start mx-4">
            <Greeting />
            <div className="w-full flex flex-col text-zinc-800 dark:text-zinc-200 lg:text-lg space-y-4">
              <p>{intro}</p>
              <p>Below are some of my socials. Feel free to check them out and connect with me there!</p>
              <div className="w-full flex justify-center md:px-4 lg:px-0">
                <div className="w-full lg:w-2/3 xl:w-full grid grid-cols-2 xl:flex xl:justify-center gap-x-8 lg:gap-x-4 xl:gap-x-2 gap-y-4">
                  <SocialProfile name="dtran421" link="https://github.com/dtran421" icon={<FaGithub />} />
                  <SocialProfile name="duketran" link="https://www.linkedin.com/in/duketran/" icon={<FaLinkedinIn />} />
                  <SocialProfile name="dtran421" link="https://www.facebook.com/dtran421" icon={<FaFacebookF />} />
                  <SocialProfile name="dtran421" link="https://www.twitter.com/dtran421" icon={<FaTwitter />} />
                </div>
              </div>
            </div>
          </div>
          <Carousel />
        </div>
        <LearnMore />
      </section>
      <section id="page2" className="lg:h-screen flex flex-col justify-center items-center py-28">
        <div className="w-3/4 md:max-w-xl lg:max-w-4xl xl:max-w-6xl space-y-28 lg:space-y-16">
          <div className="flex flex-col lg:flex-row items-center space-y-10 lg:space-y-0 lg:space-x-10">
            <div className="w-full lg:w-1/2 flex justify-center">
              <Image
                alt="about me pic 1"
                src={section1.pic_props.src}
                className="rounded-xl"
                width={section1.pic_props.width}
                height={section1.pic_props.height}
                priority
              />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col justify-between rounded-xl space-y-8">
              <div>
                <h1 className="text-2xl lg:text-3xl dark:text-white dark-transition rounded-md font-semibold space-x-2 mb-4">
                  <span>About Me</span>
                  <Emoji label="waving guy" symbol="🙋🏻‍♂️" />
                </h1>
                <p className="lg:text-lg text-zinc-800 dark:text-zinc-200 dark-transition leading-snug">
                  {section1.paragraph}
                </p>
              </div>
              <div className="flex flex-col items-between bg-zinc-300/50 dark:bg-zinc-700/50 dark-transition rounded-xl shadow-lg space-y-2 px-5 py-3">
                <p className="text-lg lg:text-xl text-center italic">
                  &quot;We can not solve our problems with the same level of thinking that created them.&quot;
                </p>
                <div className="flex justify-center items-center">
                  <div className="w-full border-b-2 border-black/50 dark:border-white/50 dark-transition" />
                  <p className="whitespace-nowrap lg:text-lg text-center mx-2">Albert Einstein</p>
                  <div className="w-full border-b-2 border-black/50 dark:border-white/50 dark-transition" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col-reverse lg:flex-row justify-center items-center lg:space-x-10">
            <div className="w-full lg:w-1/2 flex items-center">
              <p className="lg:text-lg text-zinc-800 dark:text-zinc-200 dark-transition leading-snug mt-10 lg:mt-0">
                {section2.paragraph}
              </p>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center">
              <Image
                alt="about me pic 2"
                src={section2.pic_props.src}
                className="rounded-xl"
                width={section2.pic_props.width}
                height={section2.pic_props.height}
                priority
              />
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-xl md:max-w-4xl px-8 lg:px-0 mx-auto my-10">
        <h1 className="text-2xl lg:text-3xl dark:text-white dark-transition text-center font-semibold mb-8">
          My Journey
        </h1>
        {timelineEvents ? <Timeline timelineEvents={timelineEvents} /> : <FetchError />}
      </section>
      <section className="max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl flex flex-col justify-center px-6 mx-auto mt-48 mb-20 rounded-xl">
        <h1 className="text-2xl lg:text-3xl text-center dark:text-white dark-transition font-semibold mb-4">
          Technologies
        </h1>
        <p className="lg:text-lg text-zinc-800 dark:text-zinc-200 dark-transition pb-6">
          As the digital world evolves, technologies and frameworks are constantly being developed and pushed to the
          forefront of our ever-advancing society. As a developer, it is my lifelong mission and ambition to stay on top
          of these incredible innovations and strive for mastery of these powerful tools that will enable me to explore
          my passions and perform my career functions to the best of my ability.
        </p>
        <div className="space-y-8">
          {languageGroups?.map(
            ({ heading, description, emoji, emojiLabel, languagesCollection: { items: languages } }) => (
              <LangGroup
                key={heading}
                heading={heading}
                description={description}
                emoji={emoji}
                emojiLabel={emojiLabel}
                languages={languages}
              />
            )
          ) ?? <FetchError />}
        </div>
      </section>
    </>
  );
};

export default PortfolioPage;
