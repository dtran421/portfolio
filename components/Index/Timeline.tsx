import { FC, Dispatch, SetStateAction, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowDownCircle } from "react-icons/fi";
import { MdSchool, MdWork, MdDesktopMac } from "react-icons/md";

import timelineData from "../../public/json/timeline.json";

export const expandVariants = {
   open: { opacity: 1, height: "auto" },
   collapsed: { opacity: 0, height: 0 }
};

const tagVariants = {
   open: { opacity: 1, x: 0 },
   collapsed: (side) => {
      return { opacity: 0, x: (side === "L" ? -1 : 1) * 50 };
   }
};

const Timeline: FC<{}> = () => {
   const events = timelineData.events;
   return (
      <div className="container mx-auto w-full h-full">
         <div className="relative wrap overflow-hidden h-full">
            <div className="absolute left-1/2 h-full border border-gray-600/75 dark:border-gray-400/75 dark-transition" />
            <div className="space-y-8">
               {events.map((event, idx) => {
                  return <Event key={idx} side={idx % 2 == 0 ? "L" : "R"} data={event} />;
               })}
            </div>
         </div>
      </div>
   );
};

interface EventType {
   heading: string;
   type: string;
   date: string;
   body: string;
}

interface EventProps {
   side: string;
   data: EventType;
}

const Event: FC<EventProps> = ({ side, data: { heading, type, date, body } }) => {
   const [isExpanded, setExpanded] = useState(false);

   const iconProps = {
      className: "text-gray-200 dark:text-gray-800 dark-transition",
      size: 20
   };

   let icon;
   if (type === "Education") {
      icon = <MdSchool {...iconProps} />;
   } else if (type === "Internship") {
      icon = <MdDesktopMac {...iconProps} />;
   } else if (type === "Work") {
      icon = <MdWork {...iconProps} />;
   }

   return (
      <div className={`flex ${side === "R" && "flex-row-reverse"} justify-between items-center w-full`}>
         <Card {...{ side, isExpanded, setExpanded, heading, body }} />
         <div className="z-10 w-8 h-8 flex items-center order-1 bg-gray-700 dark:bg-gray-300 dark-transition backdrop-blur-lg rounded-full">
            <h1 className="mx-auto font-semibold">{icon}</h1>
         </div>
         <div className={`order-1 w-5/12 flex ${side === "L" ? "justify-start" : "justify-end"}`}>
            <AnimatePresence>
               {isExpanded && (
                  <motion.p
                     custom={side}
                     initial="collapsed"
                     animate="open"
                     exit="collapsed"
                     variants={tagVariants}
                     transition={{ duration: 0.4, ease: "linear" }}
                     className="bg-gray-700 dark:bg-gray-300 lg:text-lg text-white dark:text-black dark-transition rounded-lg px-4 py-1">
                     {date}
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
   heading: string;
   body: string;
}

const Card: FC<CardProps> = ({ side, isExpanded, setExpanded, heading, body }) => {
   const iconClass = { size: 24, className: "text-white" };

   return (
      <div
         className={`overflow-hidden order-1 ${
            side === "L" ? "bg-primary" : "bg-secondary"
         } rounded-lg shadow-xl w-5/12 px-4 py-2 lg:px-6 md:py-4`}>
         <div className="flex justify-between">
            <h3 className="font-bold text-white text-lg lg:text-xl">{heading}</h3>
            <motion.button
               initial={false}
               animate={isExpanded ? { rotate: -180 } : { rotate: 0 }}
               transition={{ duration: 0.25, ease: "linear" }}
               onClick={() => setExpanded(!isExpanded)}>
               <FiArrowDownCircle {...iconClass} />
            </motion.button>
         </div>
         <AnimatePresence initial={false}>
            {isExpanded && (
               <motion.div
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={expandVariants}
                  transition={{ duration: 0.25, ease: "linear" }}>
                  <p className="text-xs lg:text-sm font-medium leading-snug tracking-wide text-white text-opacity-100 mt-3">
                     {body}
                  </p>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
};

export default Timeline;
