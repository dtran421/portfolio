import { startCase } from "lodash";

import { Project } from "@/utils/types";

import projects from "@/public/json/projects.json";

export const useProjectData = (title: string | null, type: "coding" | "finance") => {
  if (!title) {
    return null;
  }

  if (!type) {
    return null;
  }

  const pageTitle = startCase(title);

  const data = (
    projects as {
      coding: {
        [key: string]: Project;
      };
      finance: {
        [key: string]: Project;
      };
    }
  )[type][pageTitle];

  return {
    ...data,
    title: pageTitle,
  };
};
