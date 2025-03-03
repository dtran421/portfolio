import { motion } from "framer-motion";
import { cn } from "utils-toolkit";

const cardVariants = {
  inactive: {
    y: 0,
  },
  hover: {
    y: "70%",
  },
};

type ProjectCardLabelProps = {
  title: string;
  isHovered: boolean;
  accentColor: string;
  darkText: boolean;
};

const ProjectCardLabel = ({ title, isHovered, accentColor, darkText }: ProjectCardLabelProps) => (
  <>
    <motion.div
      animate={isHovered ? "hover" : "inactive"}
      variants={cardVariants}
      transition={{ duration: 0.1, ease: "linear" }}
      style={{ backgroundColor: accentColor }}
      className="w-full absolute bottom-0 z-0 hidden lg:block rounded-b-xl transition duration-200 ease-linear px-4 pt-6 pb-2"
    >
      <p
        className={cn(
          "text-xl xl:text-2xl text-center font-medium transition duration-200 ease-linear",
          darkText ? "text-black" : "text-white"
        )}
      >
        {title}
      </p>
    </motion.div>
    <div
      style={{ backgroundColor: accentColor }}
      className="w-full absolute -bottom-10 z-0 block lg:hidden rounded-b-xl transition duration-200 ease-linear px-4 pt-6 pb-2"
    >
      <p
        className={cn(
          "flex justify-center items-center text-lg md:text-xl font-medium transition duration-200 ease-linear",
          darkText ? "text-black" : "text-white"
        )}
      >
        {title}
      </p>
    </div>
  </>
);

export default ProjectCardLabel;
