"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronsDown } from "react-icons/fi";
import { Link } from "react-scroll";

import { getViewportMidY } from "@/utils/ClientUtil";
import { isNullish } from "@/utils/CommonUtil";

function isBelowViewportMid(initialY: number) {
  return initialY >= getViewportMidY();
}

const learnMoreVariants = {
  hidden: {
    scale: 0.25,
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "linear",
    },
  },
};

const LearnMore = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [initialY, setInitialHeight] = useState<number | null>(null);
  const [visible, toggleVisible] = useState(true);

  const scrollListener = useCallback(() => {
    if (!initialY) {
      return;
    }
    toggleVisible(isBelowViewportMid(initialY));
  }, [initialY]);

  useEffect(() => {
    if (isNullish(initialY) && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const rectY = rect.y + rect.height / 2 + window.scrollY;

      setInitialHeight(rectY);
      toggleVisible(isBelowViewportMid(rectY));
    }

    document.addEventListener("scroll", scrollListener);

    return () => {
      document.removeEventListener("scroll", scrollListener);
    };
  }, [initialY, scrollListener]);

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        key="learn_more"
        className="hidden lg:flex justify-center text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
        animate={visible ? "visible" : "hidden"}
        variants={learnMoreVariants}
      >
        <Link to="page2" smooth="easeOutCubic" offset={25} duration={1000} className="flex justify-center">
          <div className="flex flex-col justify-end items-center mt-4 transition duration-500 group hover:scale-110 cursor-pointer">
            <p className="lg:text-lg xl:text-xl text-center opacity-100 mb-1">Learn more</p>
            <div className="-translate-y-1/4 transition duration-200 opacity-60 group-hover:opacity-100 group-hover:animate-bounce py-4">
              <FiChevronsDown size={24} />
            </div>
          </div>
        </Link>
      </motion.div>
    </AnimatePresence>
  );
};

export default LearnMore;
