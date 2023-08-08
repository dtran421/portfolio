"use client";

import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import DesktopNavbar, { TABS } from "@/components/Global/DesktopNavbar";
import MobileNavbar from "@/components/Global/MobileNavbar";
import { isNullish } from "@/utils/Common";
import { ThemeContext } from "@/utils/Contexts";

const queryClient = new QueryClient();

type MainLayoutProps = {
  rootPage?: "Blog" | "Projects" | "Error" | null;
  page?: (typeof TABS)[number];
  children: ReactNode;
};

const MainLayout = ({ rootPage = null, page, children }: MainLayoutProps) => {
  const [darkMode, toggleDarkMode] = useState(true);
  const themeContextObject = useMemo(() => ({ darkMode, toggleDarkMode }), [darkMode]);

  const [stickyNavbar, toggleStickyNavbar] = useState(false);
  const stickyScrollListener = useCallback(() => {
    toggleStickyNavbar(window.scrollY > 0);
  }, []);

  useEffect(() => {
    document.addEventListener("scroll", stickyScrollListener);

    return () => {
      document.removeEventListener("scroll", stickyScrollListener);
    };
  }, [stickyScrollListener]);

  if (isNullish(page) && isNullish(rootPage)) {
    console.warn("MainLayout: page and rootPage are both nullish");
  }

  if (themeContextObject === null) {
    return null;
  }

  return (
    <>
      {/* <Head>
        <title>
          {rootPage && pageTitle
            ? `${`${rootPage} | ${pageTitle}`.substring(0, 50)}${pageTitle.length > 50 ? "..." : ""}`
            : `Duke Tran | ${page ?? pageTitle}`}
        </title>
        <meta property="og:title" content={pageTitle} key="title" />
      </Head> */}
      <ThemeContext.Provider value={themeContextObject}>
        <QueryClientProvider client={queryClient}>
          <div className={`${darkMode ? "dark" : ""}`}>
            <div className="w-full min-h-screen bg-zinc-100 dark:bg-zinc-900 transition duration-200 ease-in dark:text-white pb-16">
              {[DesktopNavbar, MobileNavbar].map((Navbar) => (
                <Navbar
                  key={Navbar.name}
                  sticky={stickyNavbar}
                  page={rootPage !== "Error" ? rootPage || page : undefined}
                />
              ))}
              {children}
            </div>
          </div>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeContext.Provider>
    </>
  );
};

export default MainLayout;
