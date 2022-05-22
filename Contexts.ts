import { createContext } from "react";

import { ThemeContextObject } from "./types";

const ThemeContext = createContext<ThemeContextObject>({
    darkMode: false,
    toggleDarkMode: () => null
});

const WhispearringsContext = createContext(null);

const Contexts = {
    ThemeContext,
    WhispearringsContext
};

export default Contexts;
