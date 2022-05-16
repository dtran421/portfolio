import { useContext, useState, useEffect, useRef, ReactNode } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { FiCheck, FiCopy } from "react-icons/fi";

import Contexts from "../../../Contexts";
import projects from "../../../public/json/projects.json";

const Navbar = dynamic(() => import("../Navbar"), { ssr: false });
const ProjectsBackButton = dynamic(
    () => import("../../Projects/ProjectsBackButton"),
    {
        ssr: false
    }
);

type ProjectLayoutProps = {
    page: string;
    github?: string;
    children: ReactNode;
};

const ProjectLayout = ({ page, github, children }: ProjectLayoutProps) => {
    const { ThemeContext } = Contexts;
    const { darkMode } = useContext(ThemeContext);

    const [stickyNavbar, toggleStickyNavbar] = useState(false);
    const stickyScrollListener = () => {
        toggleStickyNavbar(window.scrollY > 0);
    };

    useEffect(() => {
        document.addEventListener("scroll", stickyScrollListener);

        return () => {
            document.removeEventListener("scroll", stickyScrollListener);
        };
    });

    const pageTitle = `Duke Tran | ${page === "Main" ? "Portfolio" : page}`;

    const githubLink = useRef(null);
    const [isFocused, setFocused] = useState(false);
    const [isCopyActive, setCopyActive] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(github);
        setCopyActive(true);
        setTimeout(() => {
            setCopyActive(false);
        }, 3000);
    };

    const {
        accentColors: { background: backgroundAccent },
        darkText
    } = projects[page];

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta property="og:title" content={pageTitle} key="title" />
            </Head>
            <div className={`${darkMode ? "dark" : ""}`}>
                <div
                    className={`w-full bg-zinc-100 dark:bg-zinc-900 transition duration-200 ease-in dark:text-white ${
                        page !== "Contact" ? "pb-32" : "pb-16"
                    }`}
                >
                    <Navbar page="Projects" sticky={stickyNavbar} />
                    <div className="pt-14 lg:pt-20">
                        <div
                            className={`w-full xl:h-60 flex flex-col xl:flex-row justify-end xl:justify-between items-center xl:items-end ${backgroundAccent} space-y-6 px-5 xl:px-12 py-6`}
                        >
                            <h1
                                className={`w-full ${
                                    github && "xl:w-1/2"
                                } text-center xl:text-left text-5xl md:text-6xl lg:text-8xl font-bold ${
                                    darkText ? "text-black" : "text-white"
                                }`}
                            >
                                {page}
                            </h1>
                            {github && (
                                <div className="flex justify-center items-center space-x-4">
                                    <p
                                        className={`text-lg md:text-xl ${
                                            darkText
                                                ? "text-black"
                                                : "text-white"
                                        } font-medium`}
                                    >
                                        Github Repo
                                    </p>
                                    <div className="flex justify-center bg-zinc-100 dark:bg-zinc-900 ring-2 ring-zinc-300 dark:ring-zinc-700/50 dark-transition rounded-lg">
                                        <button
                                            type="button"
                                            className={`w-56 md:w-80 text-lg rounded-l-lg ${
                                                isFocused &&
                                                "ring-2 ring-zinc-100/75"
                                            } px-3 py-1 cursor-default`}
                                            onClick={() =>
                                                githubLink.current.select()
                                            }
                                        >
                                            <input
                                                ref={githubLink}
                                                className="w-full bg-transparent focus:ring-0 focus:outline-none caret-transparent cursor-text"
                                                value={github}
                                                onFocus={() => setFocused(true)}
                                                onBlur={() => setFocused(false)}
                                                readOnly
                                            />
                                        </button>
                                        <button
                                            type="button"
                                            className={`w-10 h-10 flex justify-center items-center ring-2 ${
                                                isCopyActive
                                                    ? "text-green-500 ring-green-500"
                                                    : "ring-zinc-300 dark:ring-zinc-700/50 hover:ring-zinc-400 dark:hover:ring-zinc-600"
                                            } rounded-r-lg bg-zinc-300/20 dark:bg-zinc-700/20 hover:bg-zinc-300/50 dark:hover:bg-zinc-700/50 transition duration-150 ease-linear`}
                                            onClick={() => copyToClipboard()}
                                            onBlur={() => setCopyActive(false)}
                                        >
                                            {isCopyActive ? (
                                                <FiCheck size={18} />
                                            ) : (
                                                <FiCopy size={18} />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <ProjectsBackButton />
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProjectLayout;
