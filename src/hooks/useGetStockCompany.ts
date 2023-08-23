import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

import { queryAlphavantage } from "@/utils/Alphavantage";
import { Company } from "@/utils/types";

const getStockCompany = async ({ queryKey: [symbol] }: QueryFunctionContext<[string, string]>) => {
  const result = await queryAlphavantage<Company>(symbol, "OVERVIEW");

  if (result.isErr()) {
    throw result.unwrap();
  }

  return result.unwrap() as Company;
};

const useGetStockCompany = (symbol: string) => {
  const { data, isFetching, error } = useQuery<Company, Error, Company, [string, string]>({
    queryKey: [symbol, "company"],
    queryFn: getStockCompany,
  });

  return { data, isFetching, error };
};

export default useGetStockCompany;
