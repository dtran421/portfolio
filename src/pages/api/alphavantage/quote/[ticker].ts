import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

import { logger } from "@/lib/Logger";
import { APIResponse, Quote } from "@/lib/types";

import { getBaseAlphavantageUrl } from "../Utils";

export default async function handler(req: NextApiRequest, res: NextApiResponse<APIResponse<Quote>>) {
  const { ticker } = req.query;

  const alphavantageUrl = getBaseAlphavantageUrl(ticker as string, "GLOBAL_QUOTE");

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

    const {
      "Global Quote": {
        "05. price": price,
        "07. latest trading day": latestBusinessDay,
        "09. change": change,
        "10. change percent": changePct,
      },
    } = data;

    return res.json({
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

    return res.status(500).json({ error: error.message });
  }
}
