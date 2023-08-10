"use client";

import Image from "next/image";

import BackgroundMotivation from "@/components/Projects/AppProject/BackgroundMotivation";
import MenuBar from "@/components/Projects/AppProject/MenuBar";
import MobileImage from "@/components/Projects/AppProject/MobileImage";
import Paragraph from "@/components/Projects/AppProject/Paragraph";
import PhoneDemo from "@/components/Projects/AppProject/PhoneDemo";
import useAppDemoControl from "@/hooks/useAppDemoControl";
import splashScreen from "@/public/img/projects/collegetalk/splash_screen.png";

import collegetalkData from "@/public/json/collegetalk.json";

const DESCRIPTION = `
    This project was completed as our semester-long project for my CSCI 425 Entrepreneurship in CS class, taken in
    Spring 2022. We wanted to create a mobile platform for college students to connect with one another, ask questions,
    provide helpful answers and comments to others, and promote academic discourse. Moreover, the platform would provide
    anonymity features to prevent students from being discouraged from voicing their ideas. Hence, CollegeTalk was
    created.
  `;

const CollegeTalk = () => {
  const { data: paragraphs } = collegetalkData;
  const { activeRef, activeParagraph, setParagraphPosition, isScrolling, scrollToParagraph } = useAppDemoControl(
    paragraphs.length
  );

  return (
    <>
      <BackgroundMotivation description={DESCRIPTION} />
      <MenuBar
        paragraphs={paragraphs.map((p) => p.heading)}
        activeParagraph={activeParagraph}
        scrollToParagraph={scrollToParagraph}
      />
      <div className="flex mt-10">
        <div className="w-full lg:w-1/2 flex flex-col items-center">
          {paragraphs.map((paragraph, idx) => (
            <Paragraph
              key={paragraph.heading}
              ref={activeParagraph === idx || activeParagraph === -1 ? activeRef : null}
              heading={paragraph.heading}
              idx={idx}
              setParagraphPosition={setParagraphPosition}
              body={paragraph.body}
            >
              <MobileImage page="collegetalk" num={idx + 1} />
            </Paragraph>
          ))}
        </div>
        <PhoneDemo
          page="collegetalk"
          ImagePlaceholder={
            <div className="absolute left-0 top-0 bg-zinc-800 dark:bg-zinc-200 dark-transition rounded-3xl p-2">
              <div className="relative rounded-3xl overflow-hidden">
                <Image
                  alt="splash screen"
                  src={splashScreen}
                  className="left-0 top-0 rounded-3xl transition duration-200 ease-linear"
                  placeholder="blur"
                />
              </div>
            </div>
          }
          activeParagraph={activeParagraph}
          active={!isScrolling && activeParagraph !== -1}
        />
      </div>
    </>
  );
};
export default CollegeTalk;
