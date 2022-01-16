import { FC, Dispatch, SetStateAction, useState, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

import { ThemeContext } from "../../pages/_app";
import { lgScreenQuery } from "./configs/Breakpoints";
import Navlink from "./Navlink";
import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";

const navlinkVariants = {
   expanded: {
      height: "auto",
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, staggerChildren: 1, delayChildren: 0.5 }
   },
   collapsed: {
      height: 0,
      opacity: 0,
      y: -150,
      transition: { when: "afterChildren", duration: 0.3, staggerChildren: 1, staggerDirection: -1 }
   }
};

interface NavbarProps {
   page: string;
   sticky: boolean;
}

const Navbar: FC<NavbarProps> = ({ page, sticky }) => {
   const lgScreen = useMediaQuery(lgScreenQuery);
   const tabs = ["Portfolio", "Resume", "Projects", "Contact"];

   const { darkMode, toggleDarkMode } = useContext(ThemeContext);

   const [isExpanded, toggleExpanded] = useState(false);

   return lgScreen ? (
      <div
         className={`w-full fixed z-20 bg-transparent lg:bg-zinc-100 lg:dark:bg-zinc-900 dark-transition ${
            sticky ? "bg-opacity-80 backdrop-blur-lg" : "translate-y-1/2"
         } transition-transform duration-200 ease-linear`}>
         <div className="relative flex items-center mx-6">
            <p className="absolute font-Oxygen text-4xl bg-clip-text text-transparent bg-gradient-to-tr from-primary to-secondary font-bold">
               DT
            </p>
            <div className="w-full flex justify-center space-x-6">
               {tabs.map((link, idx) => {
                  return <Navlink key={idx} active={page === link} {...{ link, idx }} mobile={false} />;
               })}
            </div>
            <DarkModeToggle {...{ darkMode, toggleDarkMode }} mobile={false} />
         </div>
      </div>
   ) : (
      <motion.div
         animate={isExpanded ? "expanded" : "collapsed"}
         className={`w-full fixed z-20 flex flex-col bg-slate-200 dark:bg-slate-800 dark-transition ${
            sticky && "bg-opacity-80 backdrop-blur-lg"
         } rounded-b-2xl pt-2`}>
         <div className={`relative z-10 flex justify-between items-center ${isExpanded && "shadow-lg"} px-6 py-2`}>
            <button
               className="flex justify-center items-end dark-transition rounded-full"
               onClick={() => toggleExpanded(!isExpanded)}>
               {isExpanded ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
            <DarkModeToggle {...{ darkMode, toggleDarkMode }} mobile={true} />
         </div>
         <div className="w-full absolute flex justify-center py-2">
            <p className="font-Oxygen text-4xl bg-clip-text text-transparent bg-gradient-to-tr from-primary to-secondary font-bold">
               DT
            </p>
         </div>
         <div className="overflow-hidden bg-transparent">
            <AnimatePresence>
               {isExpanded && (
                  <motion.ul
                     initial="collapsed"
                     animate="expanded"
                     exit="collapsed"
                     variants={navlinkVariants}
                     layout
                     className="flex flex-col items-center space-y-2 mt-4 mb-2">
                     {tabs.map((link, idx) => {
                        return <Navlink key={idx} active={page === link} {...{ link, idx }} mobile={true} />;
                     })}
                  </motion.ul>
               )}
            </AnimatePresence>
         </div>
      </motion.div>
   );
};

interface DarkModeToggleProps {
   darkMode: boolean;
   toggleDarkMode: Dispatch<SetStateAction<boolean>>;
   mobile: boolean;
}

const DarkModeToggle: FC<DarkModeToggleProps> = ({ darkMode, toggleDarkMode, mobile }) => {
   return (
      <div
         className={`w-16 ${
            !mobile && "absolute right-0"
         } flex justify-start dark:justify-end bg-slate-800/75 dark:bg-slate-200/75 dark-transition rounded-full p-1 cursor-pointer`}
         onClick={() => toggleDarkMode(!darkMode)}>
         <motion.div
            className="w-6 h-6 flex justify-center items-center text-black bg-white rounded-full"
            layout
            transition={{
               type: "spring",
               stiffness: 500,
               damping: 30
            }}>
            {darkMode ? <FiMoon size={16} /> : <FiSun size={16} />}
         </motion.div>
      </div>
   );
};

export default Navbar;
