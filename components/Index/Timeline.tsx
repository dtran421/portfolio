import { FC, Dispatch, SetStateAction, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowDownCircle, FiArrowUpCircle } from "react-icons/fi";
import { MdSchool } from "react-icons/md";

export const expandVariants = {
   open: { opacity: 1, height: "auto" },
   collapsed: { opacity: 0, height: 0 }
};

const Timeline: FC<{}> = () => {
   return (
      <div className="container mx-auto w-full h-full">
         <div className="relative wrap overflow-hidden h-full">
            <div className="absolute left-1/2 h-full border border-gray-600/75 dark:border-gray-400/75 dark-transition" />
            <div className="space-y-8">
               <Event side="L" />
               <Event side="R" />
               <Event side="L" />
               <Event side="R" />
            </div>
         </div>
      </div>
   );
};

interface EventProps {
   side: string;
}

const Event: FC<EventProps> = ({ side }) => {
   const [isExpanded, setExpanded] = useState(false);

   return (
      <div className={`flex ${side === "R" && "flex-row-reverse"} justify-between items-center w-full`}>
         <Card {...{ side, isExpanded, setExpanded }} />
         <div className="z-10 w-8 h-8 flex items-center order-1 bg-gray-700 dark:bg-gray-300 dark-transition backdrop-blur-lg rounded-full">
            <h1 className="mx-auto font-semibold">
               <MdSchool className="text-gray-200 dark:text-gray-800 dark-transition" size={20} />
            </h1>
         </div>
         <div className={`order-1 w-5/12 flex ${side === "L" ? "justify-start" : "justify-end"}`}>
            <AnimatePresence initial={false}>
               {isExpanded && (
                  <motion.p
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     transition={{ duration: 0.4, ease: "linear" }}
                     className="bg-gray-700 dark:bg-gray-300 lg:text-lg text-white dark:text-black dark-transition rounded-lg px-4 py-1">
                     May 2019
                  </motion.p>
               )}
            </AnimatePresence>
         </div>
      </div>
   );
};

interface CardProps {
   side: string;
   isExpanded: boolean;
   setExpanded: Dispatch<SetStateAction<boolean>>;
}

const Card: FC<CardProps> = ({ side, isExpanded, setExpanded }) => {
   const iconClass = { size: 24, className: "text-white" };

   return (
      <div
         className={`overflow-hidden order-1 ${
            side === "L" ? "bg-primary" : "bg-secondary"
         } rounded-lg shadow-xl w-5/12 px-4 py-2 lg:px-6 md:py-4`}>
         <div className="flex justify-between">
            <h3 className="font-bold text-white text-lg lg:text-xl">Lorem Ipsum</h3>
            <button onClick={() => setExpanded(!isExpanded)}>
               {isExpanded ? <FiArrowUpCircle {...iconClass} /> : <FiArrowDownCircle {...iconClass} />}
            </button>
         </div>
         <AnimatePresence initial={false}>
            {isExpanded && (
               <motion.div
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={expandVariants}
                  transition={{ duration: 0.4, ease: "linear" }}>
                  <p className="text-xs lg:text-sm font-medium leading-snug tracking-wide text-white text-opacity-100 mt-3">
                     Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                     industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                     and scrambled it to make a type specimen book.
                  </p>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
};

export default Timeline;
