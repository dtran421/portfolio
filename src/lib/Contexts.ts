import { createContext } from "react";

import { ThemeContextObject } from "./types";

export const ThemeContext = createContext<ThemeContextObject>({
  darkMode: false,
  toggleDarkMode: () => null,
});

export const AppProjectContext = createContext(null);
