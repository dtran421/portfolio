import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

import { queryAlphavantage } from "@/utils/Alphavantage";
import { Quote } from "@/utils/types";

const getStockQuote = async ({ queryKey: [symbol] }: QueryFunctionContext<[string, string]>) => {
  const result = await queryAlphavantage<Quote>(symbol, "GLOBAL_QUOTE");
  return result.unwrapErr();
};

const useGetStockQuote = (symbol: string) => {
  const { data, isFetching, error } = useQuery({
    queryKey: [symbol, "quote"],
    queryFn: getStockQuote,

    retry: 1,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  return { data: data?.coalesce(), isFetching, error };
};

export default useGetStockQuote;
