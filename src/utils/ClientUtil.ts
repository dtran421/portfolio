import moment from "moment";

import { isNullish } from "./CommonUtil";

export const convertDateToAbbrevString = (rawDateStr: string, currentlyWorking?: boolean): string => {
  if (!isNullish(currentlyWorking) && currentlyWorking) {
    return "Present";
  }

  return moment(rawDateStr).format("MMM YYYY");
};