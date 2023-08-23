import type { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import StockCard from "./StockCard";

const queryClient = new QueryClient();

const meta: Meta<typeof StockCard> = {
  component: StockCard,
  decorators: [
    (Story) => (
      // TODO: fetching doesn't work as Next isn't running, so the API
      // calls fail. Need to mock the API calls?
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof StockCard>;

export const Primary: Story = {
  args: {
    symbol: "AAPL",
    showReturn: true,
    purchasePrice: 100,
  },
};

export const NoReturn: Story = {
  args: {
    symbol: "AAPL",
    showReturn: false,
    purchasePrice: 100,
  },
};
