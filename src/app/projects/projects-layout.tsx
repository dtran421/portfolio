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
  const projectData = useProjectData(segment);

  // display main layout for root project page
  return (
    <>
      {projectData && (
        <ProjectsBanner
          pageTitle={projectData.title}
          accentColor={projectData.accentColor}
          darkText={projectData.darkText}
          github={projectData.github}
        />
      )}
      {segment && projectData && <ProjectsBackButton />}
      {children}
    </>
  );
};

export default ProjectLayout;
