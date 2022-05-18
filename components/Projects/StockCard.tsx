import { Company, Quote } from "../../types";

const formatDateStr = (rawDateStr: string): string => {
    const month = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];

    const date = rawDateStr.split("-");
    return `${month[parseInt(date[1], 10) - 1]} ${date[2]}, ${date[0]}`;
};

const formatMarketCap = (marketCap: number): string => {
    // nine zeroes for billions (B)
    if (marketCap >= 1.0e9) {
        return `${(marketCap / 1.0e9).toFixed(3)} B`;
    }
    // six zeroes for millions (MM)
    if (marketCap >= 1.0e6) {
        return `${(marketCap / 1.0e6).toFixed(3)} MM`;
    }
    // three zeroes for thousands (M)
    if (marketCap >= 1.0e3) {
        return `${(marketCap / 1.0e3).toFixed(3)} M`;
    }

    return marketCap.toString();
};

const titleCase = (str: string): string =>
    str
        .split(" ")
        .map((token) =>
            token
                .split("")
                .map((char, idx) =>
                    idx === 0 ? char.toUpperCase() : char.toLowerCase()
                )
                .join("")
        )
        .join(" ");

type StockCardProps = {
    quoteData: Quote;
    companyData: Company;
};

const StockCard = ({
    quoteData: { symbol, price, change, changePct, latestBusinessDay },
    companyData: {
        name,
        exchange,
        sector,
        industry,
        marketCap,
        dividendYield,
        eps,
        high52Weeks,
        low52Weeks
    }
}: StockCardProps) => {
    const hasGained = change >= 0;
    const sign = hasGained ? "+" : "-";

    const latestBusinessDayStr = formatDateStr(latestBusinessDay);

    const table = {
        column1: {
            "Market Cap": formatMarketCap(marketCap),
            "52 Week Range": `${low52Weeks} - ${high52Weeks}`,
            "Dividend Yield": `${dividendYield}%`
        },
        column2: {
            Sector: titleCase(sector),
            Industry: titleCase(industry),
            "EPS (TTM)": eps
        }
    };
    const rows = Object.keys(table.column1).length;

    return (
        <div className="w-full lg:w-4/5 xl:w-2/3 bg-slate-300/50 dark:bg-slate-700/50 border-2 border-slate-600/60 dark-transition backdrop-blur-lg rounded-xl space-y-4 p-4 md:pb-1">
            <div className="space-y-4 md:space-y-2">
                <div className="flex flex-col md:flex-row justify-between md:items-center font-medium space-y-1 md:space-y-0">
                    <h2 className="text-lg md:text-xl">
                        {name}{" "}
                        <span className="inline-block">
                            [{exchange}:{" "}
                            <span className="font-bold">{symbol}</span>]
                        </span>
                    </h2>
                    <p className="text-sm md:text-md md:text-right text-gray-300">
                        Last Market Close: {latestBusinessDayStr}
                    </p>
                </div>
                <div className="flex flex-col md:flex-row flex-wrap md:items-end md:space-x-6">
                    <h1 className="text-3xl md:text-4xl font-bold">{price}</h1>
                    <p
                        className={`inline-block text-xl md:text-2xl ${
                            hasGained ? "text-green-500" : "text-red-500"
                        }`}
                    >
                        {sign}${change.toFixed(2)} ({sign}
                        {changePct.toFixed(2)}%)
                    </p>
                </div>
            </div>
            <div className="grid grid-rows-6 md:grid-rows-3 grid-cols-1 md:grid-cols-2 grid-flow-col md:gap-x-8">
                {Object.keys(table).map((column) =>
                    Object.keys(table[column]).map((label, rowIdx) => {
                        const lastRow = (rowIdx + 1) % rows === 0;

                        let borderClass = "border-b-2 ";
                        let paddingClass = "";
                        if (lastRow) {
                            borderClass +=
                                "last-of-type:border-b-0 md:border-b-0";
                            paddingClass = "last-of-type:pb-0 md:pb-0";
                        }

                        return (
                            <li
                                key={label}
                                className={`flex justify-between ${borderClass} border-slate-200/40 space-x-2 py-1 md:py-3 ${paddingClass}`}
                            >
                                <p>{label}</p>
                                <p className="font-medium text-right">
                                    {table[column][label]}
                                </p>
                            </li>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default StockCard;
