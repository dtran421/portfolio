import { Metadata } from "next";

import BackgroundMotivation from "@/components/Projects/AppDemo/BackgroundMotivation";
import AndroidSection from "@/components/Projects/Maze/AndroidSection";
import JavaSection from "@/components/Projects/Maze/JavaSection";

export const metadata: Metadata = {
  title: "Maze Game",
};

const MazePage = () => (
  <div className="md:max-w-xl lg:max-w-3xl xl:max-w-5xl flex mx-10 md:mx-auto">
    <main className="w-full flex flex-col items-center space-y-20">
      <BackgroundMotivation>
        This project was completed as a part of a semester-long project for my CSCI 301 Software Development course at
        William & Mary. The project is split into two parts, one implemented for desktop use and the other for an
        Android app. Both parts were coded in Java and thorougly documented through Github with periodic tags. Below,
        the two parts of the project are explained separately with details outlining the different aspects of the game.
      </BackgroundMotivation>
      <JavaSection />
      <AndroidSection />
    </main>
  </div>
);

export default MazePage;
