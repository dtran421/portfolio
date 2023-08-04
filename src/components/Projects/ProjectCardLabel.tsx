import { motion } from "framer-motion";

const cardVariants = {
  inactive: {
    y: 0,
  },
  hover: {
    y: "70%",
  },
};

type ProjectCardLabelProps = {
  isHovered: boolean;
  accentColor: string;
  darkText: boolean;
  name: string;
};

const ProjectCardLabel = ({ isHovered, accentColor, darkText, name }: ProjectCardLabelProps) => (
  <>
    <motion.div
      animate={isHovered ? "hover" : "inactive"}
      variants={cardVariants}
      transition={{ duration: 0.1, ease: "linear" }}
      style={{ backgroundColor: accentColor }}
      className="w-full absolute bottom-0 z-0 hidden lg:block rounded-b-xl transition duration-200 ease-linear px-4 pt-6 pb-2"
    >
      <p
        className={`text-xl xl:text-2xl ${
          darkText ? "text-black" : "text-white"
        } font-medium transition duration-200 ease-linear`}
      >
        {name}
      </p>
    </motion.div>
    <div
      style={{ backgroundColor: accentColor }}
      className="w-full absolute -bottom-10 z-0 block lg:hidden rounded-b-xl transition duration-200 ease-linear px-4 pt-6 pb-2"
    >
      <p
        className={`flex justify-center items-center text-lg md:text-xl ${
          darkText ? "text-black" : "text-white"
        } font-medium transition duration-200 ease-linear`}
      >
        {name}
      </p>
    </div>
  </>
);

export default ProjectCardLabel;
