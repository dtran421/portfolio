import { cn } from "utils-toolkit";

import GithubLink from "./GithubLink";

interface ProjectsBannerProps {
  pageTitle?: string;
  accentColor?: string;
  darkText?: boolean;
  github?: string;
}

const ProjectsBanner = ({
  pageTitle = "Project not found",
  accentColor = "#FFF",
  darkText = true,
  github,
}: ProjectsBannerProps) => (
  <div
    style={{ backgroundColor: accentColor }}
    className="w-full xl:h-60 flex flex-col xl:flex-row justify-between items-center xl:items-end space-y-6 px-5 xl:px-12 py-6"
  >
    <h1
      className={cn(
        "w-full text-center xl:text-left text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold",
        github && "xl:w-1/2",
        darkText ? "text-black" : "text-white"
      )}
    >
      {pageTitle}
    </h1>
    {github && <GithubLink github={github} darkText={darkText} />}
  </div>
);

export default ProjectsBanner;
