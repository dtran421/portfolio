import { ReactNode, useMemo } from "react";
import { lowerCase, startCase } from "lodash";
import moment from "moment";

import ClassProfile from "@/components/Projects/ClassProfile";
import StockCard from "@/components/Projects/Finance/StockCard";
import useGetStockCompany from "@/hooks/useGetStockCompany";
import useGetStockQuote from "@/hooks/useGetStockQuote";
import { isNullish } from "@/lib/Util";

import ProjectLayout from "./ProjectLayout";

const formatMarketCap = (marketCap: number): string => {
  // * nine zeroes for billions (B)
  if (marketCap >= 1.0e9) {
    return `${(marketCap / 1.0e9).toFixed(3)} B`;
  }
  // * six zeroes for millions (MM)
  if (marketCap >= 1.0e6) {
    return `${(marketCap / 1.0e6).toFixed(3)} MM`;
  }
  // * three zeroes for thousands (M)
  if (marketCap >= 1.0e3) {
    return `${(marketCap / 1.0e3).toFixed(3)} M`;
  }

  return marketCap.toString();
};

type FinanceLayoutProps = {
  pageTitle: string;
  classProfileProps: {
    heading: string;
    dateString: string;
    description: string;
  };
  symbol: string;
  purchasePrice: number;
  children: ReactNode;
};

const FinanceLayout = ({
  pageTitle,
  classProfileProps: { heading, dateString, description },
  symbol,
  purchasePrice,
  children,
}: FinanceLayoutProps) => {
  const { data: quoteData, isLoading: isLoadingQuote, error: quoteError } = useGetStockQuote(symbol);
  const { data: companyData, isLoading: isLoadingCompany, error: companyError } = useGetStockCompany(symbol);

  const isLoading = isLoadingQuote || isLoadingCompany;

  const stockCardData = useMemo(() => {
    if (isLoading) {
      return {
        symbol,
        name: "",
        exchange: "",
        latestBusinessDay: "",
        price: 0,
        change: 0,
        changePct: 0,
        column1: {
          "Market Cap": "",
          "52 Week Range": "",
          "Dividend Yield": "",
        },
        column2: {
          Sector: "",
          Industry: "",
          "EPS (TTM)": "",
        },
      };
    }

    const { price, change, changePct, latestBusinessDay } = quoteData;
    const { name, exchange, sector, industry, marketCap, dividendYield, eps, high52Weeks, low52Weeks } = companyData;

    return {
      symbol,
      name,
      exchange,
      latestBusinessDay: moment(latestBusinessDay).format("MMM Do, YYYY"),
      price,
      change,
      changePct,
      column1: {
        "Market Cap": formatMarketCap(marketCap),
        "52 Week Range": `${low52Weeks} - ${high52Weeks}`,
        "Dividend Yield": `${dividendYield.toFixed(2)}%`,
      },
      column2: {
        Sector: startCase(lowerCase(sector)),
        Industry: startCase(lowerCase(industry)),
        "EPS (TTM)": eps,
      },
    };
  }, [isLoading, quoteData, companyData, symbol]);

  return (
    <ProjectLayout pageTitle={pageTitle} type="finance">
      <div className="md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-6xl flex flex-col items-center space-y-10 lg:space-y-14 mx-10 md:mx-auto">
        <ClassProfile heading={heading} dateString={dateString}>
          {description}
        </ClassProfile>
        <StockCard
          data={stockCardData}
          errors={[quoteError, companyError].filter((err) => !isNullish(err))}
          loading={isLoading}
          purchasePrice={purchasePrice}
        />
        {children}
      </div>
    </ProjectLayout>
  );
};

export default FinanceLayout;
