"use client";

import { ReactNode } from "react";
import Image from "next/image";
import { useSelectedLayoutSegment } from "next/navigation";
import { FaApple } from "react-icons/fa";

import BackgroundMotivation from "@/components/Projects/AppProject/BackgroundMotivation";
import MenuBar from "@/components/Projects/AppProject/MenuBar";
import MobileImage from "@/components/Projects/AppProject/MobileImage";
import Paragraph from "@/components/Projects/AppProject/Paragraph";
import PhoneDemo from "@/components/Projects/AppProject/PhoneDemo";
import useAppDemoControl from "@/hooks/useAppDemoControl";
import collegetalkSplashScreen from "@/public/img/projects/collegetalk/splash_screen.png";

import collegetalkData from "@/public/json/collegetalk.json";
import whispearringsData from "@/public/json/whispearrings.json";

const CollegeTalkSplashScreen = ({ visible }: { visible: boolean }) => (
  <div
    className={`absolute ${
      visible ? "opacity-100" : "opacity-0"
    } left-0 top-0 rounded-3xl p-2 transition duration-200 ease-linear`}
  >
    <div className="relative rounded-3xl overflow-hidden">
      <Image
        alt="splash screen"
        src={collegetalkSplashScreen}
        className="left-0 top-0 rounded-3xl"
        placeholder="blur"
      />
    </div>
  </div>
);

const DefaultPlaceholder = ({ visible }: { visible: boolean }) => (
  <div
    className={`w-full h-full absolute ${
      visible ? "opacity-100" : "opacity-0"
    } top-0 bg-zinc-800 dark:bg-zinc-200 dark-transition rounded-3xl transition duration-200 ease-linear`}
  >
    <div className="w-full h-full relative">
      <FaApple size={64} className="absolute left-1/2 top-1/4 -translate-x-1/2" />
    </div>
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
      return DefaultPlaceholder;
  }
};

type AppProjectLayoutProps = {
  children: ReactNode;
};

const AppProjectLayout = ({ children }: AppProjectLayoutProps) => {
  const segment = useSelectedLayoutSegment();

  const paragraphs = getParagraphs(segment as string);

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
          ImagePlaceholder={SplashScreen(segment as string)}
          activeParagraph={activeParagraph}
          active={!isScrolling && activeParagraph !== -1}
        />
      </div>
    </div>
  );
};

export default AppProjectLayout;
