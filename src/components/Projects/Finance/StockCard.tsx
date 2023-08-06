import Skeleton from "react-loading-skeleton";

import FetchError from "@/components/Global/FetchError";
import { isNullish } from "@/lib/Util";

import "react-loading-skeleton/dist/skeleton.css";

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

const renderCell = (label, value, lastRow, loading) => (
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

interface StockData {
  symbol: string;
  name: string;
  exchange: string;
  latestBusinessDay: string;
  price: number;
  change: number;
  changePct: number;

  column1: Record<string, string>;
  column2: Record<string, string>;
}

interface StockCardProps {
  data: StockData;
  errors?: Error[];
  loading: boolean;
  showReturn?: boolean;
  purchasePrice?: number;
}

const StockCard = ({ data, errors = [], loading, showReturn = true, purchasePrice = 0 }: StockCardProps) => {
  if (errors.length) {
    errors.forEach((error) =>
      console.error(
        JSON.stringify(
          {
            message: error.message,
            stack: error.stack,
            cause: error.cause,
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

  const { symbol, name, exchange, latestBusinessDay, price, change, changePct, column1, column2 } = data;

  const numRows = Object.keys(column1).length;
  const isLastRow = (idx) => (idx + 1) % numRows === 0;

  return (
    <div className="w-full lg:w-4/5 xl:w-2/3 bg-slate-300/50 dark:bg-slate-700/50 text-black dark:text-white border-2 border-slate-600/60 dark-transition backdrop-blur-lg rounded-xl space-y-4 p-4 md:pb-1">
      <div className="space-y-4 md:space-y-2">
        <div className="flex flex-col md:flex-row justify-between md:items-center font-medium space-y-1 md:space-y-0">
          <h2 className="text-lg md:text-xl">
            {loading ? (
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
            {loading ? <Skeleton width={180} /> : <p>{latestBusinessDay}</p>}
          </div>
        </div>
        <div className="flex flex-col md:flex-row flex-wrap md:justify-between md:items-end space-y-2">
          <div className="flex flex-col md:flex-row flex-wrap md:justify-between md:items-end md:space-x-4">
            <h1 className="text-3xl md:text-4xl font-bold">
              {loading ? <Skeleton width={100} /> : `$${price.toFixed(2)}`}
            </h1>
            {loading ? <Skeleton width={150} /> : <ReturnText change={change} changePct={changePct} />}
          </div>
          {showReturn && (
            <div className="flex text-xl md:text-2xl space-x-2">
              <p className="font-medium">ROI: </p>
              {loading ? (
                <Skeleton width={200} />
              ) : (
                <ReturnText
                  change={price - purchasePrice}
                  changePct={((price - purchasePrice) / purchasePrice) * 100}
                />
              )}
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-rows-6 md:grid-rows-3 grid-cols-1 md:grid-cols-2 grid-flow-col md:gap-x-8">
        {Object.entries(column1).map(([label, value], idx) => renderCell(label, value, isLastRow(idx), loading))}
        {Object.entries(column2).map(([label, value], idx) => renderCell(label, value, isLastRow(idx), loading))}
      </div>
    </div>
  );
};

export default StockCard;
