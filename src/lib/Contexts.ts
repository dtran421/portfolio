import { createContext } from "react";

import { ThemeContextObject } from "./types";

const ThemeContext = createContext<ThemeContextObject>({
  darkMode: false,
  toggleDarkMode: () => null,
});

const AppProjectContext = createContext(null);

const Contexts = {
  ThemeContext,
  AppProjectContext,
};

export default Contexts;
