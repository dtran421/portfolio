import { NextResponse } from "next/server";
import axios from "axios";

import { logger } from "@/utils/Logger";

import { getBaseAlphavantageUrl } from "../Utils";

interface QuoteQR {
  "Global Quote": {
    "05. price": string;
    "07. latest trading day": string;
    "09. change": string;
    "10. change percent": string;
  };
}

export default async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const ticker = searchParams.get("ticker");

  const alphavantageUrl = getBaseAlphavantageUrl(ticker as string, "GLOBAL_QUOTE");

  if (alphavantageUrl.isNone()) {
    return NextResponse.json({ error: "Env variables not set, this is a problem with the server" }, { status: 500 });
  }

  try {
    const { data, status, statusText } = await axios.get<QuoteQR>(alphavantageUrl.coalesce(), {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "request",
      },
    });

    if (status !== 200) {
      return new Response(null, { status, statusText });
    }

    const {
      "Global Quote": {
        "05. price": price,
        "07. latest trading day": latestBusinessDay,
        "09. change": change,
        "10. change percent": changePct,
      },
    } = data;

    return NextResponse.json({
      data: {
        price: parseFloat(price),
        change: parseFloat(change),
        changePct: parseFloat(changePct.replace("%", "")),
        latestBusinessDay,
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      logger.error("Something went wrong with axios: ", error.toJSON());
    }

    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
