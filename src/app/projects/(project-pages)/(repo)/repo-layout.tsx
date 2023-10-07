"use client";

import { ReactNode } from "react";
import { useSelectedLayoutSegment } from "next/navigation";

import ClassProfile from "@/components/Projects/ClassProfile";
import RepoCard from "@/components/Projects/Repo/RepoCard";
import { useProjectData } from "@/hooks/useProjectData";

import dataMiningData from "@/public/json/data-mining.json";
import machineLearningData from "@/public/json/machine-learning.json";

const getClassProfile = (segment: string | null) => {
  switch (segment) {
    case "data-mining":
      return {
        heading: "[CSCI 420] Data Mining",
        dateString: "Spring 2022",
      };
    case "machine-learning":
      return {
        heading: "[CSCI 416] Intro to Machine Learning",
        dateString: "Fall 2021",
      };
    default:
      return {
        heading: "",
        dateString: "",
      };
  }
};

const getRepoData = (segment: string | null) => {
  switch (segment) {
    case "data-mining":
      return dataMiningData;
    case "machine-learning":
      return machineLearningData;
    default:
      return {
        data: [],
      };
  }
};

type RepoPageProps = {
  children: ReactNode;
};

const RepoLayout = ({ children }: RepoPageProps) => {
  const segment = useSelectedLayoutSegment();
  const { accentColor } = useProjectData(segment) || { accentColor: "#fff" };

  const { heading, dateString } = getClassProfile(segment);
  const { data } = getRepoData(segment);

  return (
    <main className="md:max-w-xl lg:max-w-4xl xl:max-w-6xl flex flex-col mx-8 md:mx-auto">
      <ClassProfile heading={heading} dateString={dateString}>
        {children}
      </ClassProfile>
      <div className="w-full flex flex-col lg:grid lg:grid-cols-2 gap-y-10 lg:gap-6 md:px-10 lg:px-0 mt-20">
        {data.map(({ name, url, tags }) => (
          <RepoCard key={name} name={name} url={url} tags={tags} accentColor={accentColor} />
        ))}
      </div>
    </main>
  );
};

export default RepoLayout;
