import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

import { logger } from "@/utils/Logger";
import { APIResponse, Company } from "@/utils/types";

import { getBaseAlphavantageUrl } from "../Utils";

export default async function handler(req: NextApiRequest, res: NextApiResponse<APIResponse<Company>>) {
  const { ticker } = req.query;

  const alphavantageUrl = getBaseAlphavantageUrl(ticker as string, "OVERVIEW");

  if (alphavantageUrl.isNone()) {
    return res.status(500).json({ error: "Env variables not set, this is a problem with the server" });
  }

  try {
    const { data, status, statusText } = await axios.get(alphavantageUrl.coalesce(), {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "request",
      },
    });

    if (status !== 200) {
      return res.status(status).json({ error: statusText });
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

    return res.json({
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

    return res.status(500).json({ error: error.message });
  }
}
