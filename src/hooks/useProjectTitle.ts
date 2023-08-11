import { useMemo } from "react";

import { Project } from "@/utils/types";

import projects from "@/public/json/projects.json";

export const useProjectData = (link: string | null) => {
  const routeDataMap = useMemo(
    () =>
      Object.values(projects as Record<string, Record<string, Project>>).reduce(
        (map, data) => ({ ...map, ...data }),
        {}
      ),
    []
  );

  if (!link) {
    return null;
  }

  return {
    ...routeDataMap[link],
    link,
  };
};
