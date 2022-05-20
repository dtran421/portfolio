import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

import { ResponsiveNavbarProps, tabs } from "./DesktopNavbar";

import DarkModeToggle from "./DarkModeToggle";

type MobileNavlinkProps = {
    active: boolean;
    link: string;
};

const MobileNavlink = ({ active, link }: MobileNavlinkProps) => (
    <Link href={`/${link === "Portfolio" ? "" : link.toLowerCase()}`} passHref>
        <button
            type="button"
            className={`w-1/2 flex justify-center text-xl border-2 rounded-xl ${
                active
                    ? "dark:text-white border-black dark:border-white border-opacity-100"
                    : "border-transparent focus:border-primary text-primary hover:border-primary"
            } dark-transition px-6 py-1`}
        >
            {link}
        </button>
    </Link>
);

const navlinkVariants = {
    expanded: (order: number) => ({
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.4,
            delay: 0.1 * (tabs.length - order)
        }
    }),
    collapsed: (order: number) => ({
        y: -150 * (order + 1),
        opacity: 0,
        transition: {
            duration: 0.3,
            delay: 0.05 * (order + 1)
        }
    })
};

const navlinkListVariants = {
    expanded: {
        height: "auto",
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.1
        }
    },
    collapsed: {
        height: 0,
        opacity: 0,
        y: -150,
        transition: {
            when: "afterChildren",
            delay: 0.6,
            duration: 0.1
        }
    }
};

const MobileNavbar = ({
    sticky,
    darkMode,
    toggleDarkMode,
    page
}: ResponsiveNavbarProps) => {
    const [isExpanded, toggleExpanded] = useState(false);

    return (
        <motion.div
            animate={isExpanded ? "expanded" : "collapsed"}
            className={`w-full fixed z-50 flex flex-col bg-slate-200 dark:bg-slate-800 dark-transition ${
                sticky ? "bg-opacity-80 backdrop-blur-lg" : ""
            } rounded-b-2xl`}
        >
            <div className="relative z-40 grid grid-cols-3 shadow-lg px-6 py-2">
                <div className="flex justify-start items-center">
                    <button
                        type="button"
                        className="flex justify-center items-end dark-transition rounded-full"
                        onClick={() => toggleExpanded(!isExpanded)}
                    >
                        {isExpanded ? <FiX size={28} /> : <FiMenu size={28} />}
                    </button>
                </div>
                <div className="flex justify-center items-end">
                    <p className="font-Oxygen text-3xl text-center bg-clip-text text-transparent bg-gradient-to-tr from-primary to-secondary font-bold">
                        DT
                    </p>
                </div>
                <div className="flex justify-end items-center">
                    <DarkModeToggle {...{ darkMode, toggleDarkMode }} />
                </div>
            </div>
            <div className="overflow-hidden bg-transparent">
                <AnimatePresence>
                    {isExpanded && (
                        <motion.ul
                            initial="collapsed"
                            animate="expanded"
                            exit="collapsed"
                            variants={navlinkListVariants}
                            className="flex flex-col items-center space-y-2 mt-4 mb-2"
                        >
                            {tabs.map((link, idx) => (
                                <motion.li
                                    key={link}
                                    custom={idx + 1}
                                    initial="collapsed"
                                    animate="expanded"
                                    exit="collapsed"
                                    variants={navlinkVariants}
                                    className="w-full flex justify-center"
                                >
                                    <MobileNavlink
                                        active={page === link}
                                        {...{
                                            link,
                                            idx,
                                            numLinks: tabs.length
                                        }}
                                    />
                                </motion.li>
                            ))}
                        </motion.ul>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default MobileNavbar;
