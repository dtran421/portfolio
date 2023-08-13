"use client";

import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";

import { ContentfulLivePreviewProvider } from "@contentful/live-preview/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import DesktopNavbar from "@/components/Global/DesktopNavbar";
import MobileNavbar from "@/components/Global/MobileNavbar";
import { ThemeContext } from "@/utils/ClientUtil";

const queryClient = new QueryClient();

type MainLayoutProps = {
  debug: boolean;
  children: ReactNode;
};

const MainLayout = ({ debug, children }: MainLayoutProps) => {
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
          <ContentfulLivePreviewProvider locale="en-US" enableInspectorMode enableLiveUpdates debugMode={debug}>
            <div className={`${darkMode ? "dark" : ""}`}>
              <div className="w-full min-h-screen relative bg-zinc-100 dark:bg-zinc-900 transition duration-200 ease-in dark:text-white pb-16">
                {[DesktopNavbar, MobileNavbar].map((Navbar) => (
                  <Navbar key={Navbar.name} sticky={stickyNavbar} />
                ))}
                {children}
              </div>
            </div>
            <ReactQueryDevtools initialIsOpen={false} />
          </ContentfulLivePreviewProvider>
        </QueryClientProvider>
      </ThemeContext.Provider>
    </>
  );
};

export default MainLayout;
