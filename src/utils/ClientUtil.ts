import { createContext } from "react";
import moment from "moment";

import { isNullish } from "./CommonUtil";
import { ThemeContextObject } from "./types";

import "client-only";

export const ThemeContext = createContext<ThemeContextObject>({
  darkMode: false,
  toggleDarkMode: () => null,
});

export const convertDateToAbbrevString = (rawDateStr: string, currentlyWorking?: boolean): string => {
  if (!isNullish(currentlyWorking) && currentlyWorking) {
    return "Present";
  }

  return moment(rawDateStr).format("MMM YYYY");
};
