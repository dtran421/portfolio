import { ReactNode } from "react";
import { Metadata } from "next";

import { truncateString } from "@/utils/CommonUtil";

import ProjectsLayoutComponent from "./projects-layout";

export const metadata: Metadata = {
  title: {
    template: truncateString("Projects | %s"),
    default: "Duke Tran | Projects",
  },
};

const ProjectsLayout = ({ children }: { children: ReactNode }) => (
  <ProjectsLayoutComponent>{children}</ProjectsLayoutComponent>
);

export default ProjectsLayout;
