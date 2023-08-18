import moment from "moment";

import { isNullish } from "./CommonUtil";

import "client-only";

export const getViewportMidY = () => {
  const { innerHeight, scrollY } = window;
  return scrollY + innerHeight / 2;
};

export const convertDateToAbbrevString = (rawDateStr: string, currentlyWorking?: boolean): string => {
  if (!isNullish(currentlyWorking) && currentlyWorking) {
    return "Present";
  }

  return moment(rawDateStr).format("MMM YYYY");
};
