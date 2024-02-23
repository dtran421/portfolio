"use client";

import { ReactNode } from "react";
import { useSelectedLayoutSegments } from "next/navigation";

import ProjectsBackButton from "@/components/Projects/ProjectsBackButton";
import ProjectsBanner from "@/components/Projects/ProjectsBanner";
import { useProjectData } from "@/hooks/useProjectData";

type ProjectLayoutProps = {
  children: ReactNode;
};

const ProjectLayout = ({ children }: ProjectLayoutProps) => {
  const segment = useSelectedLayoutSegments().at(-1);
  const projectData = useProjectData(segment);

  return (
    <>
      <ProjectsBanner
        pageTitle={projectData?.title}
        accentColor={projectData?.accentColor}
        darkText={projectData?.darkText}
        github={projectData?.github}
      />
      <ProjectsBackButton />
      {children}
    </>
  );
};

export default ProjectLayout;
