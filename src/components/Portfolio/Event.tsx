import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconContext } from "react-icons";
import { FiArrowDownCircle } from "react-icons/fi";
import { MdDesktopMac, MdSchool, MdWork } from "react-icons/md";

import { convertDateToAbbrevString } from "@/utils/ClientUtil";
import { RichText, TimelineEvent } from "@/utils/types";

export const expandVariants = {
  open: { opacity: 1, height: "auto" },
  collapsed: { opacity: 0, height: 0 },
};

const tagVariants = {
  open: { opacity: 1, x: 0 },
  collapsed: (side: "L" | "R") => ({ opacity: 0, x: (side === "L" ? -1 : 1) * 50 }),
};

type CardProps = {
  side: string;
  isExpanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
  heading: string;
  description: RichText;
};

const Card = ({
  side,
  isExpanded,
  setExpanded,
  heading,
  description: {
    json: { content },
  },
}: CardProps) => (
  <div
    className={`overflow-hidden order-1 ${
      side === "L" ? "bg-primary" : "bg-secondary"
    } rounded-lg shadow-xl w-10/12 md:w-5/12 p-4`}
  >
    <div className="flex justify-between text-white space-x-2">
      <h3 className="font-bold text-lg">{heading}</h3>
      <motion.button
        initial={false}
        animate={isExpanded ? { rotate: -180 } : { rotate: 0 }}
        transition={{ duration: 0.25, ease: "linear" }}
        onClick={() => setExpanded(!isExpanded)}
      >
        <FiArrowDownCircle size={24} />
      </motion.button>
    </div>
    <AnimatePresence initial={false}>
      {isExpanded && (
        <motion.div
          initial="collapsed"
          animate="open"
          exit="collapsed"
          variants={expandVariants}
          transition={{ duration: 0.25, ease: "linear" }}
        >
          {content.map(({ content: [block] }) => {
            const { nodeType } = block;
            if (nodeType !== "text") {
              return null;
            }

            const { value } = block;
            return (
              <p
                key={value}
                className="text-xs lg:text-sm font-medium leading-snug tracking-wide text-white text-opacity-100 mt-3"
              >
                {value}
              </p>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

type EventProps = {
  side: "L" | "R";
  data: TimelineEvent;
};

const Event = ({ side, data: { heading, type, startDate, endDate, currentlyWorking, description } }: EventProps) => {
  const [isExpanded, setExpanded] = useState(false);

  const eventTypeToIcon = {
    Education: MdSchool,
    Internship: MdDesktopMac,
    Work: MdWork,
  };
  const Icon = eventTypeToIcon[type];

  const startDateStr = convertDateToAbbrevString(startDate);
  const endDateStr = convertDateToAbbrevString(endDate, currentlyWorking);
  const dateStr = `${startDateStr} - ${endDateStr}`;

  const iconContext = useMemo(
    () => ({
      size: "20",
      className: "text-zinc-200 dark:text-zinc-800 dark-transition",
    }),
    []
  );

  return (
    <IconContext.Provider value={iconContext}>
      <div className={`w-full hidden md:flex ${side === "R" ? "flex-row-reverse" : ""} justify-between items-center`}>
        <Card {...{ side, isExpanded, setExpanded, heading, description }} />
        <div className="z-10 w-8 h-8 flex items-center order-1 bg-zinc-700 dark:bg-zinc-300 dark-transition backdrop-blur-lg rounded-full">
          <h1 className="mx-auto font-semibold">
            <Icon />
          </h1>
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
                transition={{
                  duration: 0.25,
                  type: "spring",
                  damping: 100,
                  stiffness: 1000,
                }}
                className="bg-zinc-700 dark:bg-zinc-300 lg:text-lg text-white dark:text-black dark-transition rounded-lg px-4 py-1"
              >
                {dateStr}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="flex md:hidden justify-between items-center">
        <div className="z-10 w-8 h-8 flex items-center order-1 bg-zinc-700 dark:bg-zinc-300 dark-transition backdrop-blur-lg rounded-full">
          <h1 className="mx-auto font-semibold">
            <Icon />
          </h1>
        </div>
        <Card
          side={side}
          isExpanded={isExpanded}
          setExpanded={setExpanded}
          heading={heading}
          description={description}
        />
      </div>
    </IconContext.Provider>
  );
};

export default Event;
