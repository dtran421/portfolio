"use client";

import { useContext } from "react";
import { motion } from "framer-motion";
import { FiMoon, FiSun } from "react-icons/fi";

import { ThemeContext } from "@/utils/Contexts";

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <button
      type="button"
      className="w-12 lg:w-14 flex justify-start dark:justify-end bg-slate-800/75 dark:bg-slate-200/75 dark-transition rounded-full p-1 cursor-pointer"
      onClick={() => toggleDarkMode(!darkMode)}
    >
      <motion.div
        className="w-5 h-5 flex justify-center items-center text-black bg-white rounded-full"
        layout
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      >
        {darkMode ? <FiMoon size={14} /> : <FiSun size={14} />}
      </motion.div>
    </button>
  );
};

export default DarkModeToggle;
