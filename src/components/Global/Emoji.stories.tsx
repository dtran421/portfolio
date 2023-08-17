import type { Meta, StoryObj } from "@storybook/react";

import Emoji from "./Emoji";

const meta: Meta<typeof Emoji> = {
  component: Emoji,
};

export default meta;
type Story = StoryObj<typeof Emoji>;

export const Primary: Story = {
  args: {
    label: "waving hand",
    symbol: "👋",
    className: "text-4xl",
  },
};
