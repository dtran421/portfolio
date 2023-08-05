import Image from "next/image";

import AppProjectLayout from "@/layouts/AppProjectLayout";

import collegetalkData from "@/public/json/collegetalk.json";

const CollegeTalk = () => (
  <AppProjectLayout
    pageTitle="CollegeTalk"
    github="https://github.com/CollegeTalk/CollegeTalk"
    projectData={collegetalkData}
    placeholder={
      <div className="absolute left-0 top-0 w-full h-full flex justify-center items-start p-2">
        <Image
          alt="splash screen"
          src="/img/projects/collegetalk/splash_screen.png"
          className="relative rounded-3xl transition duration-200 ease-linear"
          width={1170}
          height={2532}
        />
      </div>
    }
  >
    This project was completed as our semester-long project for my CSCI 425 Entrepreneurship in CS class, taken in
    Spring 2022. We wanted to create a mobile platform for college students to connect with one another, ask questions,
    provide helpful answers and comments to others, and promote academic discourse. Moreover, the platform would provide
    anonymity features to prevent students from being discouraged from voicing their ideas. Hence, CollegeTalk was
    created.
  </AppProjectLayout>
);

export default CollegeTalk;
