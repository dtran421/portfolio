"use client";

import { createContext, ReactNode, useMemo, useState } from "react";

import { ThemeContextObject } from "@/utils/types";

export const ThemeContext = createContext<ThemeContextObject>({
  darkMode: true,
  toggleDarkMode: () => {
    throw new Error("toggleDarkMode function must be overridden");
  },
});

interface ThemeContextProviderProps {
  children: ReactNode;
}

export const ThemeContextProvider = ({ children }: ThemeContextProviderProps) => {
  const [darkMode, toggleDarkMode] = useState(true);

  const themeContextObject = useMemo(() => ({ darkMode, toggleDarkMode }), [darkMode, toggleDarkMode]);

  return <ThemeContext.Provider value={themeContextObject}>{children}</ThemeContext.Provider>;
};
