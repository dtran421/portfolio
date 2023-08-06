import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Project } from "@/lib/types";

import ProjectCardLabel from "./ProjectCardLabel";

type ProjectCardProps = Project & {
  name: string;
};

const ProjectCard = ({ name, link, accentColor, darkText, thumbnail, width, height }: ProjectCardProps) => {
  const [isHovered, setHovered] = useState(false);

  return (
    <Link href={`/projects/${link}`} passHref>
      <button
        type="button"
        className="w-full h-56 md:h-64 lg:h-72 xl:h-80 relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="z-10 absolute top-0 overflow-hidden w-full h-full flex flex-col justify-center items-center bg-white rounded-xl shadow-xl p-10">
          <div className="w-3/4 md:w-full flex justify-center items-center p-4 md:p-0">
            <Image alt={name.toLowerCase()} src={thumbnail} width={width} height={height} layout="intrinsic" priority />
          </div>
        </div>
        <ProjectCardLabel name={name} isHovered={isHovered} accentColor={accentColor} darkText={darkText} />
      </button>
    </Link>
  );
};

export default ProjectCard;
