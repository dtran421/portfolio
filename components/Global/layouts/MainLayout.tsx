import { useContext, useState, useEffect, ReactNode } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

import { ThemeContext } from "../../../pages/_app";

const Navbar = dynamic(() => import("../Navbar"), { ssr: false });

type MainLayoutProps = {
    page: string;
    children: ReactNode;
};

const MainLayout = ({ page, children }: MainLayoutProps) => {
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

    const { darkMode } = useContext(ThemeContext);

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta property="og:title" content={pageTitle} key="title" />
            </Head>

            <div className={`${darkMode ? "dark" : ""}`}>
                <div
                    className={`absolute w-full bg-zinc-100 dark:bg-zinc-900 transition duration-200 ease-in dark:text-white ${
                        page !== "Contact" ? "pb-32" : "pb-16"
                    }`}
                >
                    <Navbar page={page} sticky={stickyNavbar} />
                    {children}
                </div>
            </div>
        </>
    );
};

export default MainLayout;
