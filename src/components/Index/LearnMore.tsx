import { AnimatePresence, AnimationControls, motion } from "framer-motion";
import { FiChevronsDown } from "react-icons/fi";
import { Link } from "react-scroll";

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

type LearnMoreProps = {
  learnMoreAnimations: AnimationControls;
};

const LearnMore = ({ learnMoreAnimations }: LearnMoreProps) => (
  <AnimatePresence>
    <motion.div
      key="learn_more"
      className="hidden lg:flex justify-center"
      animate={learnMoreAnimations}
      variants={learnMoreVariants}
    >
      <Link to="page2" smooth="easeOutCubic" offset={25} duration={1000} className="flex justify-center">
        <div className="flex flex-col justify-end items-center text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 mt-4 transition duration-500 group hover:scale-110 cursor-pointer">
          <p className="text-xl text-center opacity-100 mb-1">Learn more</p>
          <div className="-translate-y-1/4 transition duration-200 opacity-60 group-hover:opacity-100 group-hover:animate-bounce py-4">
            <FiChevronsDown size={24} />
          </div>
        </div>
      </Link>
    </motion.div>
  </AnimatePresence>
);

export default LearnMore;
