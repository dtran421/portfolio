import { Project } from "@/utils/types";

import projects from "@/public/json/projects.json";

export const useProjectData = (link: string | null, type: "coding" | "finance") => {
  if (!link) {
    return null;
  }

  if (!type) {
    return null;
  }

  const data = (
    projects as {
      coding: {
        [key: string]: Project;
      };
      finance: {
        [key: string]: Project;
      };
    }
  )[type][link];

  return {
    ...data,
    link,
  };
};
