import { useState } from "react";

import GithubLink from "../GithubLink";

type RepoCardProps = {
  name: string;
  url: string;
  tags: string[];
  accentColor: string;
};

const RepoCard = ({ name, url, tags, accentColor }: RepoCardProps) => {
  const [isHovered, setHovered] = useState(false);

  return (
    <div className="w-full flex justify-center xl:px-10 xl:py-4">
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`w-full flex flex-col justify-between bg-slate-300/50 dark:bg-slate-700/50 border-2 border-[${accentColor}] ${
          isHovered ? `hover:border-[${accentColor}]` : "lg:border-slate-600/60"
        } dark-transition backdrop-blur-lg rounded-xl gap-y-3 lg:gap-y-4 p-4`}
      >
        <h1 className="text-lg dark:text-white md:text-xl font-medium text-left">{name}</h1>
        <GithubLink github={url} compact />
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p
              key={tag}
              className="font-semibold text-sm xl:text-base text-gray-200 bg-purple-600 rounded-full px-4 py-1"
            >
              {tag}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RepoCard;
