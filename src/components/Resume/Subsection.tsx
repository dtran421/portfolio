"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronRight } from "react-icons/fi";

import { TopLevelBlock } from "@contentful/rich-text-types";

import { expandVariants } from "@/components/Portfolio/Event";
import { convertDateToAbbrevString } from "@/utils/ClientUtil";
import { ResumeSubsection } from "@/utils/types";

type SubsectionProps = {
  description: TopLevelBlock[];
  pos: "first" | "middle" | "last";
} & Omit<ResumeSubsection, "description">;

const Subsection = ({
  title,
  organization,
  startDate,
  endDate,
  currentlyWorking,
  description,
  pos,
}: SubsectionProps) => {
  const [isExpanded, setExpanded] = useState(false);

  const startDateStr = convertDateToAbbrevString(startDate);
  const endDateStr = convertDateToAbbrevString(endDate, currentlyWorking);
  const dateStr = `${startDateStr} - ${endDateStr}`;

  let style;
  switch (pos) {
    case "first":
      style = "border-b-4 border-zinc-300 dark:border-zinc-600 dark-transition pb-6";
      break;
    case "last":
      style = "pt-6";
      break;
    default:
      style = "border-b-4 border-zinc-300 dark:border-zinc-600 dark-transition py-6";
      break;
  }

  return (
    <div className={`flex space-x-2 lg:space-x-4 ${style}`}>
      <div className="flex flex-col items-center">
        <motion.button
          initial={false}
          animate={isExpanded ? { rotate: 90 } : { rotate: 0 }}
          transition={{ duration: 0.2, ease: "linear" }}
          className="h-min hover:bg-zinc-400/25 dark:hover:bg-zinc-600/75 dark:text-white dark-transition rounded-full p-1"
          onClick={() => setExpanded(!isExpanded)}
        >
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
      <article className="w-full overflow-hidden">
        <div className="w-full flex justify-between">
          <div className="flex flex-col">
            <p className="max-w-md text-lg lg:text-xl font-medium text-secondary">{title}</p>
            <p className="lg:text-lg text-zinc-700 dark:text-zinc-300 dark-transition">{organization}</p>
            <p className="block lg:hidden lg:text-lg text-zinc-700 dark:text-zinc-300 dark-transition">{dateStr}</p>
          </div>
          <p className="hidden lg:block lg:text-lg text-zinc-700 dark:text-zinc-300 dark-transition">{dateStr}</p>
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
              {description.map(({ content: [block] }) => {
                const { nodeType } = block;
                if (nodeType !== "text") {
                  return null;
                }

                const { value } = block;
                return (
                  <p key={value} className="lg:text-lg text-zinc-800 dark:text-zinc-200 dark-transition space-y-4 pt-4">
                    {value}
                  </p>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </article>
    </div>
  );
};

export default Subsection;
