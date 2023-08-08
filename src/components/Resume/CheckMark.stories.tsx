import type { Meta, StoryObj } from "@storybook/react";

import CheckMark from "./CheckMark";

const meta: Meta<typeof CheckMark> = {
  component: CheckMark,
};

export default meta;
type Story = StoryObj<typeof CheckMark>;

export const Default: Story = {
  render: () => <CheckMark />,
};
