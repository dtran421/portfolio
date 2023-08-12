import { Metadata } from "next";

import { openGraph } from "../shared-metadata";

import ProjectsPage from "./projects-page";

export const metadata: Metadata = {
  title: "Projects",
  openGraph,
};

export default async function Page() {
  return <ProjectsPage />;
}
