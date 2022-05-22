import dynamic from "next/dynamic";

import projects from "../public/json/projects.json";

import MainLayout from "../components/Global/layouts/MainLayout";

const ProjectCard = dynamic(import("../components/Projects/ProjectCard"), {
    ssr: false
});

const Projects = () => (
    <MainLayout page="Projects">
        <div className="flex justify-center mt-36">
            <div className="w-3/4 md:max-w-lg lg:max-w-7xl xl:w-3/4 flex flex-col lg:grid lg:grid-cols-2 gap-24 md:gap-32 lg:gap-x-10 xl:gap-x-20 lg:gap-y-20 mx-auto">
                {projects.projectList.map((project) => (
                    <ProjectCard key={project.name} {...project} />
                ))}
            </div>
        </div>
    </MainLayout>
);

export default Projects;
