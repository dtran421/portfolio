import axios from "axios";

import { consumeAPIResponse } from "@/app/api/ApiUtils";

import { Option, Result } from "./ReturnTypes";
import { ALPHAVANTAGE_FN_TO_ROUTE, ALPHAVANTAGE_FUNCTIONS, APIResponse } from "./types";

/**
 * Get quote data for a stock using API route
 *
 * @param ticker string, stock ticker/symbol
 * @param fn (typeof ALPHAVANTAGE_FUNCTIONS)[number], Alphavantage function
 * @returns string, Alphavantage url
 */
const getAPIAlphavantageUrl = (ticker: string, fn: (typeof ALPHAVANTAGE_FUNCTIONS)[number]) => {
  if (!(fn in ALPHAVANTAGE_FN_TO_ROUTE)) {
    console.error(`Function ${fn} is not a valid Alphavantage function`);
    return Option<string>(null);
  }

  return Option<string>(`/api/alphavantage/${ALPHAVANTAGE_FN_TO_ROUTE[fn]}/${ticker}`);
};

/**
 * Query Alphavantage API
 *
 * @param ticker string, stock ticker/symbol
 * @param fn (typeof ALPHAVANTAGE_FUNCTIONS)[number], Alphavantage function
 * @returns Result<Quote, Error>, Alphavantage data or error
 */
export const queryAlphavantage = async <T = unknown>(ticker: string, fn: (typeof ALPHAVANTAGE_FUNCTIONS)[number]) => {
  const alphavantageUrl = getAPIAlphavantageUrl(ticker, fn);

  if (alphavantageUrl.isNone()) {
    return Result<T, Error>(new Error("Invalid Alphavantage function provided"));
  }

  try {
    const { data, status, statusText } = await axios.get<APIResponse<T>>(alphavantageUrl.coalesce());

    if (status !== 200) {
      return Result<T, Error>(new Error(`[${status}] ${statusText}`));
    }

    return consumeAPIResponse<T>(data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Something went wrong with axios: ", error.toJSON());
    }

    return Result<T, Error>(error as Error);
  }
};
