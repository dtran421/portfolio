import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

import DarkModeToggle from "./DarkModeToggle";
import { ResponsiveNavbarProps } from "./DesktopNavbar";
import NavLink, { TABS } from "./NavLink";

const navLinkVariants = {
  expanded: (order: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      delay: 0.1 * (TABS.length - order),
    },
  }),
  collapsed: (order: number) => ({
    y: -150 * (order + 1),
    opacity: 0,
    transition: {
      duration: 0.3,
      delay: 0.05 * (order + 1),
    },
  }),
};

const navLinkListVariants = {
  expanded: {
    height: "auto",
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.1,
    },
  },
  collapsed: {
    height: 0,
    opacity: 0,
    y: -150,
    transition: {
      delay: 0.5,
      duration: 0.1,
    },
  },
};

const MobileNavbar = ({ sticky }: ResponsiveNavbarProps) => {
  const [isExpanded, toggleExpanded] = useState(false);

  return (
    <motion.header
      animate={isExpanded ? "expanded" : "collapsed"}
      className={`w-full sticky top-0 z-50 flex lg:hidden flex-col bg-neutral-300 dark:bg-neutral-800 border-b
                border-b-neutral-300 dark:border-b-neutral-700 dark-transition ${
                  sticky ? "bg-opacity-80 backdrop-blur-lg" : ""
                } shadow-lg`}
    >
      <div className="relative z-40 grid grid-cols-3 px-6 py-2">
        <div className="flex justify-start items-center">
          <button
            type="button"
            className="flex justify-center items-end dark:text-white dark-transition rounded-full"
            onClick={() => toggleExpanded(!isExpanded)}
          >
            {isExpanded ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
        <div className="flex justify-center items-end">
          <p className="font-Oxygen text-3xl text-center bg-clip-text text-transparent bg-gradient-to-tr from-primary to-secondary font-bold">
            DT
          </p>
        </div>
        <div className="flex justify-end items-center">
          <DarkModeToggle />
        </div>
      </div>
      <div className="overflow-hidden bg-transparent">
        <AnimatePresence>
          {isExpanded ? (
            <motion.ul
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              variants={navLinkListVariants}
              className="flex flex-col items-center space-y-2 px-4 mt-4 mb-2"
            >
              {TABS.map((link, idx) => (
                <motion.li
                  key={link}
                  custom={idx + 1}
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                  variants={navLinkVariants}
                  className="w-full flex justify-center"
                >
                  <NavLink link={link} mobile />
                </motion.li>
              ))}
            </motion.ul>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default MobileNavbar;
