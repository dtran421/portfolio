import { useMemo, useState } from "react";
import type { AppProps } from "next/app";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ThemeContext } from "@/lib/Contexts";

import "@/styles/globals.css";

const queryClient = new QueryClient();

const Portfolio = ({ Component, pageProps }: AppProps) => {
  const [darkMode, toggleDarkMode] = useState(true);

  const themeContextObject = useMemo(() => ({ darkMode, toggleDarkMode }), [darkMode]);

  if (themeContextObject === null) {
    return null;
  }
  return (
    <ThemeContext.Provider value={themeContextObject}>
      <QueryClientProvider client={queryClient}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </QueryClientProvider>
    </ThemeContext.Provider>
  );
};

export default Portfolio;
