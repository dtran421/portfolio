import { useMemo, useState } from "react";
import type { AppProps } from "next/app";

import { ThemeContext } from "@/lib/Contexts";

import "@/styles/globals.css";

const Portfolio = ({ Component, pageProps }: AppProps) => {
  const [darkMode, toggleDarkMode] = useState(true);

  const themeContextObject = useMemo(() => ({ darkMode, toggleDarkMode }), [darkMode]);

  if (themeContextObject === null) {
    return null;
  }
  return (
    <ThemeContext.Provider value={themeContextObject}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </ThemeContext.Provider>
  );
};

export default Portfolio;
