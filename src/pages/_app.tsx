import type { AppProps } from "next/app";
import { useMemo, useState } from "react";

import "../styles/globals.css";
import Contexts from "../lib/Contexts";

const Portfolio = ({ Component, pageProps }: AppProps) => {
    const [darkMode, toggleDarkMode] = useState(true);

    const { ThemeContext } = Contexts;

    const themeContextObject = useMemo(
        () => ({ darkMode, toggleDarkMode }),
        [darkMode]
    );

    if (themeContextObject === null) {
        return null;
    }
    return (
        <ThemeContext.Provider value={themeContextObject}>
            <Component {...pageProps} />
        </ThemeContext.Provider>
    );
};

export default Portfolio;
