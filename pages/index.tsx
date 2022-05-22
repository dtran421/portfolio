import { useEffect, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import { motion, useAnimation } from "framer-motion";
import { FaGithub, FaLinkedinIn, FaFacebookF, FaTwitter } from "react-icons/fa";
import SquareLoader from "react-spinners/SquareLoader";

import { lgScreenQuery } from "../configs/Breakpoints";
import { EventObject, LanguageGroup } from "../types";
import IndexContent from "../public/json/index.json";
import TimelineAndLanguageQuery from "../graphql/TimelineAndLanguageQuery";

import Emoji from "../components/Global/Emoji";
import Timeline from "../components/Index/Timeline";
import LangGroup from "../components/Index/LangGroup";
import MainLayout from "../components/Global/layouts/MainLayout";
import Carousel from "../components/Index/Carousel";

const SocialProfile = dynamic(import("../components/Index/SocialProfile"), {
    ssr: false
});
const LearnMore = dynamic(import("../components/Index/LearnMore"), {
    ssr: false
});

export function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        // rect.top >= 0 ||
        // rect.left >= 0 ||
        // rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) ||
        // rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        rect.bottom >= 0
    );
}

type IndexProps = {
    timelineData: EventObject[];
    languageGroupsData: LanguageGroup[];
};

const Index = ({ timelineData, languageGroupsData }: IndexProps) => {
    const lgScreen = useMediaQuery(lgScreenQuery);
    const learnMoreAnimations = useAnimation();

    const page1 = useRef(null);
    const scrollListener = () => {
        if (page1.current) {
            const page1Visible = isInViewport(page1.current);
            if (page1Visible) {
                learnMoreAnimations.start("visible");
            } else {
                learnMoreAnimations.start("hidden");
            }
        }
    };

    useEffect(() => {
        document.addEventListener("scroll", scrollListener);

        return () => {
            document.removeEventListener("scroll", scrollListener);
        };
    });

    const waveControls = useAnimation();
    const waveAnimation = useMemo(
        () => ({
            scale: [1, 1.3, 1.3, 1.3, 1.3, 1.3, 1.3, 1],
            rotate: [0, 10, 110, -90, 110, -90, 10, 0]
        }),
        []
    );

    useEffect(() => {
        waveControls.start(waveAnimation);
    }, [waveAnimation, waveControls]);

    const socialIconProps = {
        size: lgScreen ? 24 : 20
    };

    const {
        intro,
        aboutMe: { section1, section2 }
    } = IndexContent;

    return (
        <MainLayout page="Portfolio">
            <div
                ref={page1}
                className="w-5/6 flex flex-col items-center xl:space-y-28 mx-auto"
            >
                <div className="flex flex-col lg:flex-row justify-center items-center lg:space-x-8 space-y-14 lg:space-y-0 mt-20 lg:mt-2 xl:mt-16">
                    <div className="w-full lg:w-1/2 flex flex-col justify-start items-start mx-4">
                        <div className="flex justify-start py-5 text-2xl lg:text-3xl text-center">
                            <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row items-start md:items-center lg:items-start xl:items-center space-y-2 md:space-y-0 lg:space-y-2 xl:space-y-0">
                                <p className="inline dark:text-white dark-transition">
                                    Hi there! My name is{" "}
                                </p>
                                <div className="flex items-center space-x-3">
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{
                                            duration: 0.5,
                                            ease: "linear"
                                        }}
                                        className="font-medium text-white bg-gradient-to-tr from-primary to-secondary rounded-lg px-3 py-1 md:ml-3 lg:ml-0 xl:ml-3"
                                    >
                                        Duke Tran
                                    </motion.p>
                                    <motion.div
                                        animate={waveControls}
                                        transition={{
                                            duration: 1.5,
                                            times: [
                                                0, 0.1, 0.3, 0.5, 0.7, 0.9,
                                                0.95, 1
                                            ]
                                        }}
                                        onHoverStart={() =>
                                            waveControls.start(waveAnimation)
                                        }
                                        className="transition origin-bottom-right ease-in-out duration-300 hover:scale-110 hover:rotate-12 cursor-default"
                                    >
                                        <Emoji label="wave" symbol="👋🏼" />
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex flex-col text-zinc-800 dark:text-zinc-200 lg:text-lg space-y-4">
                            <p>{intro}</p>
                            <p>
                                Below are some of my socials. Feel free to check
                                them out and connect with me there!
                            </p>
                            <div className="w-full flex justify-center md:px-4 lg:px-0">
                                <div className="w-full lg:w-2/3 xl:w-full grid grid-cols-2 xl:flex xl:justify-center gap-x-8 lg:gap-x-4 xl:gap-x-2 gap-y-4">
                                    <SocialProfile
                                        name="dtran421"
                                        link="https://github.com/dtran421"
                                    >
                                        <FaGithub {...socialIconProps} />
                                    </SocialProfile>
                                    <SocialProfile
                                        name="duketran"
                                        link="https://www.linkedin.com/in/duketran/"
                                    >
                                        <FaLinkedinIn {...socialIconProps} />
                                    </SocialProfile>
                                    <SocialProfile
                                        name="dtran421"
                                        link="https://www.facebook.com/dtran421"
                                    >
                                        <FaFacebookF {...socialIconProps} />
                                    </SocialProfile>
                                    <SocialProfile
                                        name="dtran421"
                                        link="https://www.twitter.com/dtran421"
                                    >
                                        <FaTwitter {...socialIconProps} />
                                    </SocialProfile>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Carousel />
                </div>
                {lgScreen && <LearnMore {...{ learnMoreAnimations }} />}
            </div>
            <div id="page2" className="flex flex-col items-center py-28">
                <div className="w-3/4 md:max-w-xl lg:max-w-4xl xl:max-w-6xl space-y-28 lg:space-y-16 mx-auto">
                    <div className="flex flex-col lg:flex-row items-center space-y-10 lg:space-y-0 lg:space-x-10">
                        <div className="w-full lg:w-1/2 flex justify-center">
                            <Image
                                alt="about me pic 1"
                                {...section1.pic_props}
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
                                    &quot;We can not solve our problems with the
                                    same level of thinking that created
                                    them.&quot;
                                </p>
                                <div className="flex justify-center items-center">
                                    <div className="w-full border-b-2 border-black/50 dark:border-white/50 dark-transition" />
                                    <p className="whitespace-nowrap lg:text-lg text-center mx-2">
                                        Albert Einstein
                                    </p>
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
                                {...section2.pic_props}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-xl md:max-w-4xl px-8 lg:px-0 mx-auto">
                <h1 className="text-2xl lg:text-3xl dark:text-white dark-transition text-center font-semibold mb-8">
                    My Journey
                </h1>
                <div className="mb-20">
                    {timelineData ? (
                        <Timeline {...{ timelineData }} />
                    ) : (
                        <div className="w-full flex justify-center items-center pt-10">
                            <SquareLoader color="#9333ea" />
                        </div>
                    )}
                </div>
            </div>
            <div className="max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl flex flex-col justify-center px-6 mx-auto mt-32 rounded-xl">
                <h1 className="text-2xl lg:text-3xl text-center dark:text-white dark-transition font-semibold mb-4">
                    Technologies
                </h1>
                <p className="lg:text-lg text-zinc-800 dark:text-zinc-200 dark-transition pb-6">
                    As the digital world evolves, technologies and frameworks
                    are constantly being developed and pushed to the forefront
                    of our ever-advancing society. As a developer, it is my
                    lifelong mission and ambition to stay on top of these
                    incredible innovations and strive for mastery of these
                    powerful tools that will enable me to explore my passions
                    and perform my career functions to the best of my ability.
                </p>
                <div className="space-y-4">
                    {languageGroupsData ? (
                        languageGroupsData.map(
                            ({
                                heading,
                                description,
                                emoji,
                                emojiLabel,
                                languagesCollection: { items: languages }
                            }) => (
                                <LangGroup
                                    key={heading}
                                    {...{
                                        heading,
                                        description,
                                        emoji,
                                        emojiLabel,
                                        languages
                                    }}
                                />
                            )
                        )
                    ) : (
                        <div className="w-full flex justify-center items-center pt-10">
                            <SquareLoader color="#9333ea" />
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
};

export const getStaticProps = async () => {
    try {
        const response = await fetch(
            `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN}`
                },
                body: JSON.stringify({ query: TimelineAndLanguageQuery })
            }
        );

        const {
            data: {
                timelineEventCollection: { items: timelineData },
                languageGroupCollection: { items: languageGroupsData }
            }
        } = await response.json();

        return {
            props: {
                timelineData,
                languageGroupsData
            }
        };
    } catch (exception) {
        console.error(
            `Something went wrong with fetching index data: ${exception.message}`
        );
        return {
            props: {
                timelineData: null,
                languageGroupsData: null
            }
        };
    }
};

export default Index;
