import { motion } from "framer-motion";
import { cn } from "utils-toolkit";

import { useStickyNavbar } from "@/hooks/useStickyNavbar";

import DarkModeToggle from "./DarkModeToggle";
import NavLink, { TABS } from "./NavLink";

const navbarVariants = {
  fixed: {
    translateY: 0,
    transition: { duration: 0.2, delay: 0, ease: "easeInOut" },
  },
  sticky: {
    translateY: -15,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const DesktopNavbar = () => {
  const { sticky } = useStickyNavbar();

  return (
    <motion.header
      initial="fixed"
      animate={sticky ? "sticky" : "fixed"}
      variants={navbarVariants}
      className={cn(
        "sticky top-0 w-full z-50 hidden lg:block dark-transition backdrop-blur-lg pt-4 transition-all duration-200 ease-linear",
        sticky ? "bg-zinc-100/80 dark:bg-zinc-900/80" : "bg-zinc-100 dark:bg-zinc-900"
      )}
    >
      <div className="relative flex justify-between items-center mx-6">
        <p className="font-Oxygen text-4xl bg-clip-text text-transparent bg-gradient-to-tr from-primary to-secondary font-bold">
          DT
        </p>
        <div className="grid grid-cols-4 gap-x-4">
          {TABS.map((link) => (
            <NavLink key={link} link={link} />
          ))}
        </div>
        <DarkModeToggle />
      </div>
    </motion.header>
  );
};

export default DesktopNavbar;
