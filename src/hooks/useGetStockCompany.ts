import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

import { queryAlphavantage } from "@/utils/Alphavantage";
import { Company } from "@/utils/types";

const getStockCompany = async ({ queryKey: [symbol] }: QueryFunctionContext<[string, string]>) => {
  const result = await queryAlphavantage<Company>(symbol, "OVERVIEW");
  return result.unwrapErr();
};

const useGetStockCompany = (symbol: string) => {
  const { data, isFetching, error } = useQuery({
    queryKey: [symbol, "company"],
    queryFn: getStockCompany,

    retry: 1,
    staleTime: 1000 * 60 * 60 * 24 * 7, // 1 week
  });

  return { data, isFetching, error };
};

export default useGetStockCompany;
