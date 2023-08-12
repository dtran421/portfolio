import { NextResponse } from "next/server";
import axios from "axios";

import { logger } from "@/utils/ServerUtil";

import { getBaseAlphavantageUrl } from "../Utils";

interface CompanyQR {
  Name: string;
  Exchange: string;
  Sector: string;
  Industry: string;
  MarketCapitalization: string;
  DividendYield: number;
  EPS: string;
  "52WeekHigh": string;
  "52WeekLow": string;
}

export default async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const ticker = searchParams.get("ticker");

  const alphavantageUrl = getBaseAlphavantageUrl(ticker as string, "OVERVIEW");

  if (alphavantageUrl.isNone()) {
    return NextResponse.json({ error: "Env variables not set, this is a problem with the server" }, { status: 500 });
  }

  try {
    const { data, status, statusText } = await axios.get<CompanyQR>(alphavantageUrl.coalesce(), {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "request",
      },
    });

    if (status !== 200) {
      return new Response(null, { status, statusText });
    }

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
  } catch (error) {
    if (axios.isAxiosError(error)) {
      logger.error("Something went wrong with axios: ", error.toJSON());
    }

    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
