import { FC, Dispatch, SetStateAction, useState, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

import { ThemeContext } from "../../pages/_app";
import { lgScreenQuery } from "./configs/Breakpoints";
import Navlink from "./Navlink";
import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";

const navlinkVariants = {
   expanded: {
      transition: {
         staggerChildren: 1,
         delayChildren: 2
      }
   },
   collapsed: {
      transition: {
         staggerChildren: 0.07,
         delayChildren: 0.2
      }
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
         className={`w-full fixed z-20 bg-slate-100 dark:bg-gray-900 dark-transition ${
            sticky ? "bg-opacity-80 backdrop-blur-lg" : "translate-y-1/2"
         } transition-transform duration-200 ease-linear`}>
         <div className="relative flex justify-between items-center mx-6">
            <p className="absolute font-Oxygen text-4xl bg-clip-text text-transparent bg-gradient-to-tr from-primary to-secondary font-bold">
               DT
            </p>
            <div className="w-full flex justify-center space-x-6">
               {tabs.map((link, idx) => {
                  return <Navlink key={idx} active={page === link} link={link} mobile={false} />;
               })}
            </div>
            <DarkModeToggle {...{ darkMode, toggleDarkMode }} mobile={false} />
         </div>
      </div>
   ) : (
      <div className="w-full fixed z-20 flex flex-col bg-slate-300 dark:bg-gray-700 dark-transition rounded-b-2xl">
         <div className="flex justify-between items-center mt-2 mx-3">
            <button
               className="flex justify-center items-center dark-transition rounded-full p-4"
               onClick={() => toggleExpanded(!isExpanded)}>
               {isExpanded ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
            <DarkModeToggle {...{ darkMode, toggleDarkMode }} mobile={true} />
         </div>
         {isExpanded && (
            <motion.div
               initial={"collapsed"}
               animate={"expanded"}
               exit={"collapsed"}
               variants={navlinkVariants}
               className="flex flex-col items-center space-y-2 mb-2">
               {tabs.map((link, idx) => {
                  return <Navlink key={idx} active={page === link} link={link} mobile={true} />;
               })}
            </motion.div>
         )}
      </div>
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
         } flex justify-start dark:justify-end bg-gray-800/75 dark:bg-gray-200/75 dark-transition rounded-full p-1 cursor-pointer`}
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
