import Emoji from "@/components/Global/Emoji";
import ProjectCard from "@/components/Projects/ProjectCard";
import MainLayout from "@/layouts/MainLayout";

import projects from "@/public/json/projects.json";

const Projects = () => {
  const { coding, finance } = projects;

  const preloadColors = ["border-[#a6cee3]", "border-[#ff7f0e]"];
  const preloadClass = `hidden ${preloadColors.join(" ")}`;

  return (
    <MainLayout page="Projects">
      <div className="min-h-screen pb-10">
        <div className="w-3/5 max-w-sm md:w-full md:max-w-xl lg:max-w-3xl xl:w-3/4 xl:max-w-none flex flex-col gap-y-10 mx-auto mt-8">
          <h1 className="text-3xl md:text-4xl xl:text-5xl font-semibold text-center md:text-left">
            CODING <Emoji label="desktop computer" symbol="🖥️" />
          </h1>
          <div className="w-full flex justify-center">
            <div className="w-full flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-x-4 xl:gap-x-8 gap-y-20">
              {Object.keys(coding).map((name) => (
                <ProjectCard
                  key={name}
                  name={name}
                  link={coding[name].link}
                  accentColor={coding[name].accentColor}
                  darkText={coding[name].darkText}
                  thumbnail={coding[name].thumbnail}
                  width={coding[name].width}
                  height={coding[name].height}
                />
              ))}
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl xl:text-5xl font-semibold text-center md:text-left mt-16">
            FINANCE <Emoji label="chart increasing" symbol="📈" />
          </h1>
          <div className="w-full flex justify-center">
            <div className="w-full flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-x-4 xl:gap-x-8 gap-y-20">
              {Object.keys(finance).map((name) => (
                <ProjectCard
                  key={name}
                  name={name}
                  link={coding[name].link}
                  accentColor={coding[name].accentColor}
                  darkText={coding[name].darkText}
                  thumbnail={coding[name].thumbnail}
                  width={coding[name].width}
                  height={coding[name].height}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={preloadClass} />
    </MainLayout>
  );
};

export default Projects;
