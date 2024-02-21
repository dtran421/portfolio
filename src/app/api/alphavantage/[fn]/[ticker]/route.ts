import { NextResponse } from "next/server";
import axios from "axios";
import { Option } from "utils-toolkit";

import { logger } from "@/utils/ServerUtil";
import { AlphavantageFn } from "@/utils/types";

type CompanyQR = {
  Name: string;
  Exchange: string;
  Sector: string;
  Industry: string;
  MarketCapitalization: string;
  DividendYield: number;
  EPS: string;
  "52WeekHigh": string;
  "52WeekLow": string;
};

type QuoteQR = {
  "Global Quote": {
    "05. price": string;
    "07. latest trading day": string;
    "09. change": string;
    "10. change percent": string;
  };
};

/**
 * Get base Alphavantage url
 *
 * @param ticker string, stock ticker/symbol
 * @param fn AlphavantageFn, Alphavantage function
 * @returns string, Alphavantage url
 */
const getBaseAlphavantageUrl = (ticker: string, fn: AlphavantageFn) => {
  if (!process.env.ALPHAVANTAGE_API_KEY) {
    logger.error("ALPHAVANTAGE_API_KEY is not set!");
    return Option<string>(null);
  }

  return Option<string>(
    `https://www.alphavantage.co/query?function=${fn}&symbol=${ticker}&apikey=${process.env.ALPHAVANTAGE_API_KEY}`
  );
};

const getFunctionFromFn = (fn: string) => {
  switch (fn) {
    case "company":
      return Option<AlphavantageFn>("OVERVIEW");
    case "quote":
      return Option<AlphavantageFn>("GLOBAL_QUOTE");
    default:
      return Option<AlphavantageFn>(null);
  }
};

const processCompanyData = (data: CompanyQR) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const {
    Name: name,
    Exchange: exchange,
    Sector: sector,
    Industry: industry,
    MarketCapitalization: marketCap,
    DividendYield: dividendYield,
    EPS: eps,
    "52WeekHigh": high52Weeks,
    "52WeekLow": low52Weeks,
  } = data;

  return NextResponse.json({
    success: true,
    data: {
      name,
      exchange,
      sector,
      industry,
      marketCap: parseInt(marketCap, 10),
      dividendYield: dividendYield * 100,
      eps: formatter.format(parseFloat(eps)),
      high52Weeks: formatter.format(parseFloat(high52Weeks)),
      low52Weeks: formatter.format(parseFloat(low52Weeks)),
    },
  });
};

const processQuoteData = (data: QuoteQR) => {
  const {
    "Global Quote": {
      "05. price": price,
      "07. latest trading day": latestBusinessDay,
      "09. change": change,
      "10. change percent": changePct,
    },
  } = data;

  return NextResponse.json({
    success: true,
    data: {
      price: parseFloat(price),
      change: parseFloat(change),
      changePct: parseFloat(changePct.replace("%", "")),
      latestBusinessDay,
    },
  });
};

const processResponse = (fn: AlphavantageFn, data: QuoteQR | CompanyQR | undefined) => {
  if (!data) {
    return NextResponse.json({ success: false, error: "No data returned" });
  }
  if ("Information" in data) {
    return NextResponse.json({ success: false, error: "Alpha Vantage daily request limit reached." });
  }

  switch (fn) {
    case "GLOBAL_QUOTE":
      return processQuoteData(data as QuoteQR);
    case "OVERVIEW":
      return processCompanyData(data as CompanyQR);

    // * This should never happen
    default:
      return NextResponse.json({ success: false, error: "Invalid function" }, { status: 400 });
  }
};

export async function GET(_req: Request, { params }: { params: { fn: string; ticker: string } }) {
  const { fn, ticker } = params;

  const alphavantageFn = getFunctionFromFn(fn);
  if (!alphavantageFn.some) {
    return NextResponse.json({ success: false, error: "Invalid function" }, { status: 400 });
  }

  const alphavantageUrl = getBaseAlphavantageUrl(ticker as string, alphavantageFn.coalesce());
  if (!alphavantageUrl.some) {
    return NextResponse.json(
      { success: false, error: "Env variables not set, this is a problem with the server" },
      { status: 500 }
    );
  }

  try {
    const { data, status, statusText } = await axios.get<CompanyQR | QuoteQR | undefined>(alphavantageUrl.coalesce(), {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "request",
      },
    });

    if (status !== 200) {
      return new Response(null, { status, statusText });
    }

    return processResponse(alphavantageFn.coalesce(), data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      logger.error("Something went wrong with axios: ", error.toJSON());
    }

    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
