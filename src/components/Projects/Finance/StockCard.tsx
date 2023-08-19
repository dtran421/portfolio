import { useMemo } from "react";
import { lowerCase, startCase } from "lodash";
import moment from "moment";
import Skeleton from "react-loading-skeleton";

import FetchError from "@/components/Global/FetchError";
import useGetStockCompany from "@/hooks/useGetStockCompany";
import useGetStockQuote from "@/hooks/useGetStockQuote";
import { isNullish } from "@/utils/CommonUtil";
import { Company, Quote } from "@/utils/types";

import "react-loading-skeleton/dist/skeleton.css";

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

interface ReturnTextProps {
  change: number;
  changePct: number;
}

const ReturnText = ({ change, changePct }: ReturnTextProps) => {
  const hasGained = change >= 0;
  const sign = hasGained ? "+" : "-";

  return (
    <p className={`inline-block text-xl md:text-2xl ${hasGained ? "text-green-500" : "text-red-500"}`}>
      {sign}${Math.abs(change).toFixed(2)} ({sign}
      {Math.abs(changePct).toFixed(2)}%)
    </p>
  );
};

interface CellProps {
  label: string;
  value: string | number;
  lastRow: boolean;
  loading: boolean;
}

const Cell = ({ label, value, lastRow, loading }: CellProps) => (
  <li
    key={label}
    className={`flex justify-between border-b-2 ${
      lastRow ? "last-of-type:border-b-0 md:border-b-0" : ""
    } border-slate-800/40 dark:border-slate-200/40 space-x-2 py-1 md:py-3 ${
      lastRow ? "last-of-type:pb-0 md:pb-0" : ""
    }`}
  >
    <p>{label}</p>
    <p className="font-medium text-right">{loading ? <Skeleton width={100} /> : value}</p>
  </li>
);

interface StockCardProps {
  symbol: string;
  showReturn?: boolean;
  purchasePrice?: number;
}

const StockCard = ({ symbol, showReturn = true, purchasePrice = 0 }: StockCardProps) => {
  const { data: quoteData, isFetching: isFetchingQuote, error: quoteError } = useGetStockQuote(symbol);
  const { data: companyData, isFetching: isFetchingCompany, error: companyError } = useGetStockCompany(symbol);

  const isLoading = isFetchingQuote || isFetchingCompany;
  const errors = [quoteError, companyError].filter((err) => !isNullish(err)) as Error[];

  const stockCardData = useMemo(() => {
    if (isLoading || errors.length || isNullish(quoteData) || isNullish(companyData)) {
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

    const { price, change, changePct, latestBusinessDay } = quoteData as Quote;
    const { name, exchange, sector, industry, marketCap, dividendYield, eps, high52Weeks, low52Weeks } =
      companyData as Company;

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
  }, [isLoading, errors.length, quoteData, companyData, symbol]);

  if (errors.length) {
    errors.forEach(({ message, stack, cause }) =>
      console.error(
        JSON.stringify(
          {
            message,
            stack,
            cause,
          },
          null,
          2
        )
      )
    );
    return <FetchError />;
  }

  if (showReturn && isNullish(purchasePrice)) {
    console.error("StockCard: purchasePrice must be provided if showReturn is true");
    return <FetchError />;
  }

  const { name, exchange, latestBusinessDay, price, change, changePct, column1, column2 } = stockCardData;

  const numRows = Object.keys(column1).length;
  const isLastRow = (idx: number) => (idx + 1) % numRows === 0;

  return (
    <div className="w-full lg:w-4/5 xl:w-2/3 bg-slate-300/50 dark:bg-slate-700/50 text-black dark:text-white border-2 border-slate-600/60 dark-transition backdrop-blur-lg rounded-xl space-y-4 p-4 md:pb-1">
      <div className="space-y-4 md:space-y-2">
        <div className="flex flex-col md:flex-row justify-between md:items-center font-medium space-y-1 md:space-y-0">
          <h2 className="text-lg md:text-xl">
            {isLoading ? (
              <Skeleton width={200} />
            ) : (
              <>
                {name}{" "}
                <span className="inline-block">
                  [{exchange}: <span className="font-bold">{symbol}</span>]
                </span>
              </>
            )}
          </h2>
          <div className="flex text-sm md:text-base md:text-right text-gray-700 dark:text-gray-300 space-x-2">
            <p>Last Market Close:</p>
            {isLoading ? <Skeleton width={180} /> : <p>{latestBusinessDay}</p>}
          </div>
        </div>
        <div className="flex flex-col md:flex-row flex-wrap md:justify-between md:items-end space-y-2">
          <div className="flex flex-col md:flex-row flex-wrap md:justify-between md:items-end md:space-x-4">
            <h1 className="text-3xl md:text-4xl font-bold">
              {isLoading ? <Skeleton width={100} /> : `$${price.toFixed(2)}`}
            </h1>
            {isLoading ? <Skeleton width={150} /> : <ReturnText change={change} changePct={changePct} />}
          </div>
          {showReturn && (
            <div className="flex text-xl md:text-2xl space-x-2">
              <p className="font-medium">ROI: </p>
              {isLoading ? (
                <Skeleton width={200} />
              ) : (
                <ReturnText
                  change={price - purchasePrice}
                  changePct={purchasePrice ? ((price - purchasePrice) / purchasePrice) * 100 : 0}
                />
              )}
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-rows-6 md:grid-rows-3 grid-cols-1 md:grid-cols-2 grid-flow-col md:gap-x-8">
        {[column1, column2].map((col) =>
          Object.entries(col).map(([label, value], idx) => (
            <Cell key={label} label={label} value={value} lastRow={isLastRow(idx)} loading={isLoading} />
          ))
        )}
      </div>
    </div>
  );
};

export default StockCard;
