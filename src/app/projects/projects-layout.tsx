"use client";

import { ReactNode } from "react";
import { useSelectedLayoutSegments } from "next/navigation";

import ProjectsBackButton from "@/components/Projects/ProjectsBackButton";
import ProjectsBanner from "@/components/Projects/ProjectsBanner";
import { useProjectData } from "@/hooks/useProjectTitle";

type ProjectLayoutProps = {
  children: ReactNode;
};

const ProjectLayout = ({ children }: ProjectLayoutProps) => {
  const segment = useSelectedLayoutSegments().at(-1) ?? null;
  const projectData = useProjectData(segment, "coding");

  // display main layout for root project page
  if (segment === null || projectData === null) {
    return children;
  }

  const { title, accentColor, darkText, github } = projectData;

  return (
    <>
      <ProjectsBanner pageTitle={title} accentColor={accentColor} darkText={darkText} github={github} />
      <ProjectsBackButton />
      {children}
    </>
  );
};

export default ProjectLayout;
