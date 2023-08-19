import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

import { queryAlphavantage } from "@/utils/Alphavantage";
import { Quote } from "@/utils/types";

const getStockQuote = async ({ queryKey: [symbol] }: QueryFunctionContext<[string, string]>) => {
  const result = await queryAlphavantage(symbol, "GLOBAL_QUOTE");

  if (result.isErr()) {
    throw result.unwrap();
  }

  return result.unwrap() as Quote;
};

const useGetStockQuote = (symbol: string) => {
  const { data, isFetching, error } = useQuery<Quote, Error, Quote, [string, string]>({
    queryKey: [symbol, "quote"],
    queryFn: getStockQuote,
  });

  return { data, isFetching, error };
};

export default useGetStockQuote;
