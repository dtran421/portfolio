"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Project } from "@/utils/types";

import ProjectCardLabel from "./ProjectCardLabel";

type ProjectCardProps = Project & {
  link: string;
};

const ProjectCard = ({ title, link, accentColor, darkText, thumbnail, width, height }: ProjectCardProps) => {
  const [isHovered, setHovered] = useState(false);

  return (
    <Link href={`/projects/${link}`} passHref>
      <figure
        className="w-full h-56 md:h-64 lg:h-72 xl:h-96 relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="absolute z-10 top-0 overflow-hidden w-full h-full flex flex-col justify-center items-center bg-white rounded-xl shadow-xl p-10">
          <div className="w-3/4 md:w-full h-full flex justify-center items-center p-4 md:p-0">
            <Image alt={title.toLowerCase()} src={thumbnail} width={width} height={height} priority />
          </div>
        </div>
        <ProjectCardLabel title={title} isHovered={isHovered} accentColor={accentColor} darkText={darkText} />
      </figure>
    </Link>
  );
};

export default ProjectCard;
