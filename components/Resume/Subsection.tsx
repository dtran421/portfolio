import { FC, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronRight } from "react-icons/fi";

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

const Subsection: FC<SubsectionProps> = ({ content: { title, organization, date, description }, style }) => {
   const lgScreen = useMediaQuery(lgScreenQuery);

   const [isExpanded, setExpanded] = useState(false);

   return (
      <div className={`flex space-x-2 lg:space-x-4 ${style}`}>
         <div className="flex flex-col items-center">
            <motion.button
               initial={false}
               animate={isExpanded ? { rotate: 90 } : { rotate: 0 }}
               transition={{ duration: 0.25, ease: "linear" }}
               className="h-min hover:bg-zinc-400/25 dark:hover:bg-zinc-600/75 dark-transition rounded-full p-1"
               onClick={() => setExpanded(!isExpanded)}>
               <FiChevronRight size={20} />
            </motion.button>
            <AnimatePresence initial={false}>
               {isExpanded && (
                  <motion.div
                     initial={{ height: "0%" }}
                     animate={{ height: "100%" }}
                     exit={{ height: "0%" }}
                     transition={{ duration: 0.3, ease: "linear" }}
                     className="h-full border-r-2 border-zinc-400/75 dark:border-zinc-600 dark-transition my-2"
                  />
               )}
            </AnimatePresence>
         </div>
         <div className="w-full overflow-hidden">
            <div className="w-full flex justify-between">
               <div className="flex flex-col">
                  <p className="max-w-md text-lg lg:text-xl font-medium text-secondary">{title}</p>
                  <p className="lg:text-lg text-zinc-700 dark:text-zinc-300 dark-transition">{organization}</p>
                  {!lgScreen && <p className="lg:text-lg text-zinc-700 dark:text-zinc-300 dark-transition">{date}</p>}
               </div>
               {lgScreen && <p className="lg:text-lg text-zinc-700 dark:text-zinc-300 dark-transition">{date}</p>}
            </div>
            <AnimatePresence initial={false}>
               {isExpanded && (
                  <motion.div
                     initial="collapsed"
                     animate="open"
                     exit="collapsed"
                     variants={expandVariants}
                     transition={{ duration: 0.25, ease: "linear" }}>
                     <p className="lg:text-lg text-zinc-800 dark:text-zinc-200 dark-transition space-y-4 pt-4">
                        {description.split("\n").map((text, idx) => {
                           return <p key={idx}>{text}</p>;
                        })}
                     </p>
                  </motion.div>
               )}
            </AnimatePresence>
         </div>
      </div>
   );
};

export default Subsection;
