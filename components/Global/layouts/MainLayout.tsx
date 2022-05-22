import { ReactNode, useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useMediaQuery } from "react-responsive";

import Contexts from "../../../Contexts";
import { lgScreenQuery } from "../../../configs/Breakpoints";

const DesktopNavbar = dynamic(() => import("../DesktopNavbar"), { ssr: false });
const MobileNavbar = dynamic(() => import("../MobileNavbar"), { ssr: false });

type MainLayoutProps = {
    rootPage?: "Blog" | "Projects";
    page: string;
    children: ReactNode;
};

const MainLayout = ({ rootPage = null, page, children }: MainLayoutProps) => {
    const { ThemeContext } = Contexts;
    const { darkMode, toggleDarkMode } = useContext(ThemeContext);

    const lgScreen = useMediaQuery(lgScreenQuery);

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

    const responsiveNavbarProps = {
        sticky: stickyNavbar,
        darkMode,
        toggleDarkMode,
        page: rootPage || page
    };

    const pageTitle = rootPage
        ? `${page.substring(0, 50)}${page.length > 50 ? "..." : ""}`
        : `Duke Tran | ${page === "Main" ? "Portfolio" : page}`;

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta property="og:title" content={pageTitle} key="title" />
            </Head>
            <div className={`${darkMode ? "dark" : ""}`}>
                <div className="w-full min-h-screen bg-zinc-100 dark:bg-zinc-900 transition duration-200 ease-in dark:text-white pb-16">
                    {lgScreen ? (
                        <DesktopNavbar {...responsiveNavbarProps} />
                    ) : (
                        <MobileNavbar {...responsiveNavbarProps} />
                    )}
                    {children}
                </div>
            </div>
        </>
    );
};

export default MainLayout;
