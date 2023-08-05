import { ReactNode, useContext, useEffect, useState } from "react";
import Head from "next/head";

import DesktopNavbar, { TABS } from "@/components/Global/DesktopNavbar";
import MobileNavbar from "@/components/Global/MobileNavbar";
import { ThemeContext } from "@/lib/Contexts";

type MainLayoutProps = {
  rootPage?: "Blog" | "Projects";
  page: (typeof TABS)[number];
  children: ReactNode;
};

const MainLayout = ({ rootPage = null, page, children }: MainLayoutProps) => {
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

  const pageTitle = rootPage ? `${page.substring(0, 50)}${page.length > 50 ? "..." : ""}` : `Duke Tran | ${page}`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta property="og:title" content={pageTitle} key="title" />
      </Head>
      <div className={`${darkMode ? "dark" : ""}`}>
        <div className="w-full min-h-screen bg-zinc-100 dark:bg-zinc-900 transition duration-200 ease-in dark:text-white pb-16">
          {[DesktopNavbar, MobileNavbar].map((Navbar) => (
            <Navbar key={Navbar.name} sticky={stickyNavbar} page={rootPage || page} />
          ))}
          {children}
        </div>
      </div>
    </>
  );
};

export default MainLayout;
