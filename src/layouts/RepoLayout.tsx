import { ReactNode } from "react";

import ClassProfile from "@/components/Projects/ClassProfile";
import RepoCard from "@/components/Projects/Repo/RepoCard";

import projects from "@/public/json/projects.json";

import ProjectLayout from "./ProjectLayout";

type RepoPageProps = {
  bannerHeading: string;
  heading: string;
  dateString: string;
  data: {
    name: string;
    url: string;
    tags: string[];
  }[];
  children: ReactNode;
};

const RepoLayout = ({ bannerHeading, heading, dateString, data, children }: RepoPageProps) => {
  const { accentColor } = projects.coding[bannerHeading];

  return (
    <ProjectLayout pageTitle={bannerHeading} type="coding">
      <div className="md:max-w-xl lg:max-w-3xl xl:max-w-5xl flex flex-col mx-8 md:mx-auto">
        <ClassProfile {...{ heading, dateString }}>{children}</ClassProfile>
        <div className="w-full flex flex-col lg:grid lg:grid-cols-2 gap-y-10 lg:gap-6 md:px-10 lg:px-0 mt-20">
          {data.map(({ name, url, tags }) => (
            <RepoCard
              key={name}
              {...{
                name,
                url,
                tags,
                accentColor,
              }}
            />
          ))}
        </div>
      </div>
    </ProjectLayout>
  );
};

export default RepoLayout;
