import { FC, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";

import { lgScreenQuery } from "../Global/configs/Breakpoints";
import { expandVariants } from "../Index/Timeline";

export interface SubsectionType {
   title: string;
   organization: string;
   date: string;
   description: string;
}

interface SubsectionProps {
   content: SubsectionType;
   style: string;
}

const Subsection: FC<SubsectionProps> = ({ content, style }) => {
   const lgScreen = useMediaQuery(lgScreenQuery);

   const [isExpanded, setExpanded] = useState(false);

   return (
      <div className={`flex space-x-2 lg:space-x-4 ${style}`}>
         <div className="flex flex-col items-center">
            <button
               className="h-min hover:bg-gray-400/25 dark:hover:bg-gray-600/75 dark-transition rounded-full p-1"
               onClick={() => setExpanded(!isExpanded)}>
               {isExpanded ? <FiChevronDown size={20} /> : <FiChevronRight size={20} />}
            </button>
            <AnimatePresence initial={false}>
               {isExpanded && (
                  <motion.div
                     initial={{ height: "0%" }}
                     animate={{ height: "100%" }}
                     exit={{ height: "0%" }}
                     transition={{ duration: 0.3, ease: "linear" }}
                     className="h-full border-r-2 border-gray-400/75 dark:border-gray-600 dark-transition my-2"
                  />
               )}
            </AnimatePresence>
         </div>
         <div className="w-full overflow-hidden">
            <div className="w-full flex justify-between">
               <div className="flex flex-col">
                  <p className="max-w-md text-lg lg:text-xl font-medium text-secondary">{content.title}</p>
                  <p className="lg:text-lg text-gray-700 dark:text-gray-300 dark-transition">{content.organization}</p>
                  {!lgScreen && (
                     <p className="lg:text-lg text-gray-700 dark:text-gray-300 dark-transition">{content.date}</p>
                  )}
               </div>
               {lgScreen && (
                  <p className="lg:text-lg text-gray-700 dark:text-gray-300 dark-transition">{content.date}</p>
               )}
            </div>
            <AnimatePresence initial={false}>
               {isExpanded && (
                  <motion.div
                     initial="collapsed"
                     animate="open"
                     exit="collapsed"
                     variants={expandVariants}
                     transition={{ duration: 0.25, ease: "linear" }}>
                     <p className="lg:text-lg text-gray-800 dark:text-gray-200 dark-transition pt-4">
                        {content.description}
                     </p>
                  </motion.div>
               )}
            </AnimatePresence>
         </div>
      </div>
   );
};

export default Subsection;
