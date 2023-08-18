"use client";

import { ReactNode } from "react";
import { useSelectedLayoutSegment } from "next/navigation";

import ProjectsBackButton from "@/components/Projects/ProjectsBackButton";
import ProjectsBanner from "@/components/Projects/ProjectsBanner";
import { Project } from "@/utils/types";

import projects from "@/public/json/projects.json";

const getProjectData = (link: string | null) => {
  if (!link) {
    return null;
  }

  const routeDataMap = Object.values(projects as Record<string, Record<string, Project>>).reduce(
    (map, data) => ({ ...map, ...data }),
    {}
  );

  return {
    ...routeDataMap[link],
    link,
  };
};

type ProjectLayoutProps = {
  children: ReactNode;
};

const ProjectLayout = ({ children }: ProjectLayoutProps) => {
  const segment = useSelectedLayoutSegment();
  const projectData = getProjectData(segment);

  return (
    <>
      <ProjectsBanner
        pageTitle={projectData?.title ?? "Project not found"}
        accentColor={projectData?.accentColor ?? "#FFF"}
        darkText={projectData?.darkText ?? true}
        github={projectData?.github}
      />
      <ProjectsBackButton />
      {children}
    </>
  );
};

export default ProjectLayout;
