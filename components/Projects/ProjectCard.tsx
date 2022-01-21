import { FC, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import { lgScreenQuery } from "../Global/configs/Breakpoints";

const cardVariants = {
   inactive: {
      y: 0
   },
   hover: {
      y: "80%"
   }
};

interface ProjectCardProps {
   link: string;
   name: string;
   thumbnail: string;
   width: number;
   height: number;
}

const ProjectCard: FC<ProjectCardProps> = ({ link, name, thumbnail, width, height }) => {
   const lgScreen = useMediaQuery(lgScreenQuery);

   const [isHovered, setHovered] = useState(false);

   return (
      <Link href={`/projects/${link}`} passHref={true}>
         <button
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="w-full h-96 relative">
            <div className="z-10 absolute top-0 overflow-hidden w-full h-full flex flex-col justify-center items-center bg-white rounded-xl shadow-xl p-10">
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
               <div className="w-full absolute -bottom-10 md:-bottom-12 z-0 bg-primary rounded-b-xl transition duration-200 ease-linear px-4 pt-6 pb-2">
                  <p className="flex justify-center items-center text-xl md:text-2xl text-white font-medium transition duration-200 ease-linear">
                     {name}
                  </p>
               </div>
            )}
         </button>
      </Link>
   );
};

export default ProjectCard;
