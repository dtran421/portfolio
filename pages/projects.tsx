import { FC, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import Link from "next/link";

import { lgScreenQuery } from "../components/Global/configs/Breakpoints";
import projects from "../public/json/projects.json";

import MainLayout from "../components/Global/layouts/MainLayout";
import { AnimatePresence, motion } from "framer-motion";

const Projects: FC<null> = () => {
   return (
      <MainLayout page="Projects">
         <div className="flex justify-center mt-36">
            <div className="w-3/4 md:max-w-lg lg:max-w-7xl xl:w-3/4 flex flex-col lg:grid lg:grid-cols-2 gap-24 md:gap-32 lg:gap-x-10 xl:gap-x-20 lg:gap-y-20 mx-auto">
               {projects.projectList.map((project, idx) => {
                  return <ProjectCard key={idx} {...project} />;
               })}
            </div>
         </div>
      </MainLayout>
   );
};

const cardVariants = {
   inactive: {
      y: 0
   },
   hover: {
      y: "80%"
   }
};

interface ProjectCardProps {
   name: string;
   thumbnail: string;
   width: number;
   height: number;
}

const ProjectCard: FC<ProjectCardProps> = ({ name, thumbnail, width, height }) => {
   const lgScreen = useMediaQuery(lgScreenQuery);

   const [isHovered, setHovered] = useState(false);

   return (
      <Link href={`/projects/${name.toLowerCase()}`} passHref={true}>
         <button onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className="h-96 relative">
            <div className="w-full h-full relative z-10 flex flex-col justify-center items-center bg-white rounded-xl shadow-xl p-10">
               <Image alt={name.toLowerCase()} src={thumbnail} {...{ width, height }} layout="fixed" priority />
            </div>
            {lgScreen ? (
               <AnimatePresence initial={false}>
                  <motion.div
                     animate={isHovered ? "hover" : "inactive"}
                     variants={cardVariants}
                     transition={{ duration: 0.2, ease: "linear" }}
                     className="w-full absolute bottom-0 z-0 bg-primary rounded-b-xl transition duration-200 ease-linear px-4 pt-6 pb-2">
                     <p className="text-2xl text-white font-medium transition duration-200 ease-linear">{name}</p>
                  </motion.div>
               </AnimatePresence>
            ) : (
               <div className="w-full absolute -bottom-12 z-0 bg-primary rounded-b-xl transition duration-200 ease-linear px-4 pt-6 pb-2">
                  <p className="text-xl lg:text-2xl text-white font-medium transition duration-200 ease-linear">
                     {name}
                  </p>
               </div>
            )}
         </button>
      </Link>
   );
};

export default Projects;
