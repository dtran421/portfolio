const fetchStockData = async (ticker: string) => {
  const props = { quoteData: {}, companyData: {} };

  const quoteResponse = await fetch(
    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${process.env.ALPHAVANTAGE_API_KEY}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "request",
      },
    }
  );

  const overviewResponse = await fetch(
    `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${process.env.ALPHAVANTAGE_API_KEY}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "request",
      },
    }
  );

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  if (!quoteResponse.ok) {
    console.error(`Something went wrong with fetching stock quote: ${quoteResponse.status}`);
  } else {
    const {
      "Global Quote": {
        "01. symbol": symbol,
        "05. price": price,
        "09. change": change,
        "10. change percent": changePct,
        "07. latest trading day": latestBusinessDay,
      },
    } = await quoteResponse.json();

    props.quoteData = {
      symbol,
      price: parseFloat(price),
      change: parseFloat(change),
      changePct: parseFloat(changePct.replace("%", "")),
      latestBusinessDay,
    };
  }

  if (!overviewResponse.ok) {
    console.error(`Something went wrong with fetching company overview: ${overviewResponse.status}`);
  } else {
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
    } = await overviewResponse.json();

    props.companyData = {
      name,
      exchange,
      sector,
      industry,
      marketCap: parseInt(marketCap, 10),
      dividendYield: dividendYield * 100,
      eps: formatter.format(parseFloat(eps)),
      high52Weeks: formatter.format(parseFloat(high52Weeks)),
      low52Weeks: formatter.format(parseFloat(low52Weeks)),
    };
  }

  return {
    props,
  };
};

export default fetchStockData;
