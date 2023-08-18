"use client";

import { ReactNode, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { IconContext } from "react-icons";

const logoMotion = {
  inactive: { x: 0, zIndex: 1 },
  hover: {
    x: -15,
    zIndex: 1,
  },
};

const textMotion = {
  inactive: { opacity: 0, x: -25, zIndex: 0, ease: "easeOut", duration: 0.2 },
  hover: {
    opacity: 1,
    x: 10,
    zIndex: 0,
    ease: "easeIn",
    duration: 0.5,
  },
};

type SocialProfileProps = {
  name: string;
  link: string;
  icon: ReactNode;
};

const SocialProfile = ({ name, link, icon }: SocialProfileProps) => {
  const [isHovered, setHovered] = useState(false);

  const iconContext = useMemo(
    () => ({
      className: "w-full h-full",
    }),
    []
  );

  return (
    <IconContext.Provider value={iconContext}>
      <motion.a
        className="hidden lg:flex justify-center items-center cursor-pointer"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        initial="inactive"
        animate={isHovered ? "hover" : "inactive"}
      >
        <motion.div variants={logoMotion} className="relative flex items-center">
          <div className="z-10 flex justify-center items-center text-white bg-primary rounded-full shadow-lg p-2">
            {icon}
          </div>
          <motion.p variants={textMotion} className="text-zinc-800 dark:text-zinc-200 dark-transition text-xl">
            {name}
          </motion.p>
        </motion.div>
      </motion.a>
      <a
        className="h-full flex lg:hidden md:justify-center items-center"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="relative flex items-center space-x-4 md:space-x-3">
          <div className="z-10 flex justify-center items-center text-white bg-primary rounded-full shadow-lg p-2">
            {icon}
          </div>
          <p className="text-zinc-800 dark:text-zinc-200 dark-transition text-lg">{name}</p>
        </div>
      </a>
    </IconContext.Provider>
  );
};

export default SocialProfile;
