"use client";

import { ReactNode } from "react";
import Image from "next/image";
import { useSelectedLayoutSegment } from "next/navigation";
import { cn } from "utils-toolkit";

import BackgroundMotivation from "@/components/Projects/AppDemo/BackgroundMotivation";
import MenuBar from "@/components/Projects/AppDemo/MenuBar";
import MobileImage from "@/components/Projects/AppDemo/MobileImage";
import Paragraph from "@/components/Projects/AppDemo/Paragraph";
import PhoneDemo from "@/components/Projects/AppDemo/PhoneDemo";
import useAppDemoControl from "@/hooks/useAppDemoControl";
import collegetalkSplashScreen from "@/public/img/projects/collegetalk/splash_screen.png";

import collegetalkData from "@/public/json/collegetalk.json";
import whispearringsData from "@/public/json/whispearrings.json";

const CollegeTalkSplashScreen = ({ visible }: { visible: boolean }) => (
  <div
    className={cn(
      "absolute left-0 top-0 rounded-3xl p-2 transition duration-200 ease-linear",
      visible ? "opacity-100" : "opacity-0"
    )}
  >
    <figure className="relative rounded-3xl overflow-hidden">
      <Image
        alt="splash screen"
        src={collegetalkSplashScreen}
        className="left-0 top-0 rounded-3xl"
        placeholder="blur"
      />
    </figure>
  </div>
);

const getParagraphs = (segment: string) => {
  switch (segment) {
    case "collegetalk":
      return collegetalkData.data;
    case "whispearrings":
      return whispearringsData.data;
    default:
      return [];
  }
};

const SplashScreen = (segment: string) => {
  switch (segment) {
    case "collegetalk":
      return CollegeTalkSplashScreen;
    default:
      return undefined;
  }
};

interface Props {
  children: ReactNode;
}

const AppDemoLayout = ({ children }: Props) => {
  const segment = useSelectedLayoutSegment() as string;

  const paragraphs = getParagraphs(segment);

  const { activeRef, activeParagraph, setParagraphPosition, isScrolling, scrollToParagraph } = useAppDemoControl(
    paragraphs.length
  );

  return (
    <div className="md:max-w-xl lg:max-w-3xl xl:max-w-5xl relative flex flex-col items-center gap-y-20 mx-10 md:mx-auto mt-10">
      <BackgroundMotivation>{children}</BackgroundMotivation>
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
              <MobileImage page={segment} num={idx + 1} />
            </Paragraph>
          ))}
        </div>
        <PhoneDemo
          page={segment}
          activeParagraph={activeParagraph}
          active={!isScrolling && activeParagraph !== -1}
          ImagePlaceholder={SplashScreen(segment)}
        />
      </div>
    </div>
  );
};

export default AppDemoLayout;
