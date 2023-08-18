import type { Meta, StoryObj } from "@storybook/react";

import LearnMore from "./LearnMore";

const meta: Meta<typeof LearnMore> = {
  component: LearnMore,
};

export default meta;
type Story = StoryObj<typeof LearnMore>;

export const Primary: Story = {
  render: () => <LearnMore />,
};
