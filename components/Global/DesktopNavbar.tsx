import { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import DarkModeToggle from "./DarkModeToggle";

export const tabs = ["Portfolio", "Resume", "Blog", "Projects"];

type NavlinkProps = {
    active: boolean;
    link: string;
};

const Navlink = ({ active, link }: NavlinkProps) => (
    <div className="w-full flex justify-center">
        <Link
            href={`/${link === "Portfolio" ? "" : link.toLowerCase()}`}
            passHref
        >
            <button
                type="button"
                className={`w-full flex justify-center text-xl border-b-4 ${
                    active
                        ? "dark:text-white border-black dark:border-white border-opacity-100"
                        : "border-b-transparent text-primary hover:border-primary"
                } dark-transition px-5 py-3`}
            >
                {link}
            </button>
        </Link>
    </div>
);

const navbarVariants = {
    fixed: {
        translateY: 0,
        transition: { duration: 0.2, delay: 0, ease: "easeInOut" }
    },
    sticky: {
        translateY: -15,
        transition: { duration: 0.3, ease: "easeOut" }
    }
};

export type ResponsiveNavbarProps = {
    sticky: boolean;
    darkMode: boolean;
    toggleDarkMode: Dispatch<SetStateAction<boolean>>;
    page: string;
};

const DesktopNavbar = ({
    sticky,
    darkMode,
    toggleDarkMode,
    page
}: ResponsiveNavbarProps) => (
    <motion.div
        initial="fixed"
        animate={sticky ? "sticky" : "fixed"}
        variants={navbarVariants}
        className="sticky top-0 w-full z-50 bg-zinc-100/80 dark:bg-zinc-900/80 dark-transition backdrop-blur-lg pt-4 transition-all duration-200 ease-linear"
    >
        <div className="relative flex justify-between items-center mx-6">
            <p className="font-Oxygen text-4xl bg-clip-text text-transparent bg-gradient-to-tr from-primary to-secondary font-bold">
                DT
            </p>
            <div className="grid grid-cols-4 gap-x-4">
                {tabs.map((link, idx) => (
                    <Navlink
                        key={link}
                        active={page === link}
                        {...{ link, idx }}
                    />
                ))}
            </div>
            <DarkModeToggle {...{ darkMode, toggleDarkMode }} />
        </div>
    </motion.div>
);

export default DesktopNavbar;
