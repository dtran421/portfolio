"use client";

import Emoji from "@/components/Global/Emoji";
import ProjectCard from "@/components/Projects/ProjectCard";
import { Project } from "@/utils/types";

import projects from "@/public/json/projects.json";

const Projects = () => {
  const {
    coding,
    finance,
  }: {
    coding: {
      [name: string]: Project;
    };
    finance: {
      [name: string]: Project;
    };
  } = projects;

  const preloadColors = ["border-[#a6cee3]", "border-[#ff7f0e]"];
  const preloadClass = `hidden ${preloadColors.join(" ")}`;

  return (
    <>
      <div className="w-3/5 max-w-sm md:w-full md:max-w-xl lg:max-w-3xl xl:w-3/4 xl:max-w-none mx-auto">
        <div className="flex flex-col gap-y-10 mx-auto mt-8">
          <h1 className="text-3xl md:text-4xl xl:text-5xl font-semibold text-center md:text-left">
            CODING <Emoji label="desktop computer" symbol="🖥️" />
          </h1>
          <div className="w-full flex justify-center">
            <div className="w-full flex flex-col md:grid md:grid-cols-2 xl:grid-cols-3 md:gap-x-4 xl:gap-x-8 gap-y-20">
              {Object.entries(coding).map(([link, data]) => (
                <ProjectCard
                  key={link}
                  title={data.title}
                  link={link}
                  accentColor={data.accentColor}
                  darkText={data.darkText}
                  thumbnail={data.thumbnail}
                  width={data.width}
                  height={data.height}
                />
              ))}
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl xl:text-5xl font-semibold text-center md:text-left mt-16">
            FINANCE <Emoji label="chart increasing" symbol="📈" />
          </h1>
          <div className="w-full flex justify-center mb-20">
            <div className="w-full flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-x-4 xl:gap-x-8 gap-y-20">
              {Object.entries(finance).map(([link, data]) => (
                <ProjectCard
                  key={link}
                  title={data.title}
                  link={link}
                  accentColor={data.accentColor}
                  darkText={data.darkText}
                  thumbnail={data.thumbnail}
                  width={data.width}
                  height={data.height}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={preloadClass} />
    </>
  );
};

export default Projects;
