import { ReactNode } from "react";

import ProjectsBackButton from "@/components/Projects/ProjectsBackButton";
import ProjectsBanner from "@/components/Projects/ProjectsBanner";

import projects from "@/public/json/projects.json";

import MainLayout from "./MainLayout";

type ProjectLayoutProps = {
  pageTitle: string;
  type: "coding" | "finance";
  github?: string;
  children: ReactNode;
};

const ProjectLayout = ({ pageTitle, type, github, children }: ProjectLayoutProps) => {
  const { accentColor, darkText } = projects[type][pageTitle];

  return (
    <MainLayout rootPage="Projects" pageTitle={pageTitle}>
      <ProjectsBanner pageTitle={pageTitle} accentColor={accentColor} darkText={darkText} github={github} />
      <ProjectsBackButton />
      {children}
    </MainLayout>
  );
};

export default ProjectLayout;
