"use client";

import { ReactNode, useContext } from "react";
import { cn } from "utils-toolkit";

import { ContentfulLivePreviewProvider } from "@contentful/live-preview/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import DesktopNavbar from "@/components/Global/DesktopNavbar";
import MobileNavbar from "@/components/Global/MobileNavbar";
import { ThemeContext } from "@/contexts/theme-context";

const queryClient = new QueryClient();

interface Props {
  debug: boolean;
  children: ReactNode;
}

const MainLayout = ({ debug, children }: Props) => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <QueryClientProvider client={queryClient}>
      <ContentfulLivePreviewProvider locale="en-US" enableInspectorMode enableLiveUpdates debugMode={debug}>
        <div className={cn(darkMode && "dark")}>
          <div className="w-full min-h-screen relative bg-zinc-100 dark:bg-zinc-900 transition duration-200 ease-in dark:text-white pb-16">
            {[DesktopNavbar, MobileNavbar].map((Navbar) => (
              <Navbar key={Navbar.name} />
            ))}
            {children}
          </div>
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </ContentfulLivePreviewProvider>
    </QueryClientProvider>
  );
};

export default MainLayout;
