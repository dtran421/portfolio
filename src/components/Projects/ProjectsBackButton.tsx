import Link from "next/link";
import { FiArrowLeftCircle } from "react-icons/fi";

const ProjectsBackButton = () => (
  <Link href="/projects" passHref>
    <button
      type="button"
      className="flex items-center text-xl lg:text-2xl text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white dark-transition space-x-2 lg:space-x-4 mx-8 xl:mx-12 my-6"
    >
      <FiArrowLeftCircle className="w-4 h-4 lg:w-5 lg:h-5" />
      <p>Projects</p>
    </button>
  </Link>
);

export default ProjectsBackButton;
