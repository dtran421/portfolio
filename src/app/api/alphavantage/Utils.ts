import { logger } from "@/utils/Logger";
import { Option } from "@/utils/ReturnTypes";
import { ALPHAVANTAGE_FUNCTIONS } from "@/utils/types";

/**
 * Get base Alphavantage url
 *
 * @param ticker string, stock ticker/symbol
 * @param fn (typeof ALPHAVANTAGE_FUNCTIONS)[number], Alphavantage function
 * @returns string, Alphavantage url
 */
export const getBaseAlphavantageUrl = (ticker: string, fn: (typeof ALPHAVANTAGE_FUNCTIONS)[number]) => {
  if (!process.env.ALPHAVANTAGE_API_KEY) {
    logger.error("ALPHAVANTAGE_API_KEY is not set!");
    return Option<string>(null);
  }

  return Option<string>(
    `https://www.alphavantage.co/query?function=${fn}&symbol=${ticker}&apikey=${process.env.ALPHAVANTAGE_API_KEY}`
  );
};
