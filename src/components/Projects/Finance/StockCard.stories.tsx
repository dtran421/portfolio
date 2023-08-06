import type { Meta, StoryObj } from "@storybook/react";

import StockCard from "./StockCard";

const meta: Meta<typeof StockCard> = {
  component: StockCard,
};

export default meta;
type Story = StoryObj<typeof StockCard>;

const BASE_DATA = {
  symbol: "AAPL",
  name: "Apple Inc.",
  exchange: "NASDAQ",
  latestBusinessDay: "2021-09-03",
  price: 154.3,
  change: 0.0,
  changePct: 0.0,
  column1: {
    "Market Cap": "157.26",
    "52 Week Range": "103.1",
    "Dvidiend Yield": "148.9",
  },
  column2: {
    Sector: "Technology",
    Industry: "Consumer Electronics",
    "EPS (TTM)": "5.1",
  },
};

const PLACEHOLDER_DATA = {
  symbol: "AAPL",
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

export const Default: Story = {
  args: {
    data: BASE_DATA,
    errors: [],
    loading: false,
    showReturn: true,
    purchasePrice: 100,
  },
};

export const Loading: Story = {
  args: {
    data: PLACEHOLDER_DATA,
    errors: [],
    loading: true,
    showReturn: true,
    purchasePrice: 100,
  },
};

export const Errors: Story = {
  args: {
    data: PLACEHOLDER_DATA,
    errors: [new Error("Something went wrong")],
    loading: false,
    showReturn: true,
    purchasePrice: 100,
  },
};

export const NoReturn: Story = {
  args: {
    data: BASE_DATA,
    errors: [],
    loading: false,
    showReturn: false,
    purchasePrice: 100,
  },
};
