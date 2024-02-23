import type { Meta, StoryObj } from "@storybook/react";

import LearnMore from "./LearnMore";

const meta: Meta<typeof LearnMore> = {
  component: LearnMore,
};

export default meta;
type Story = StoryObj<typeof LearnMore>;

export const Primary: Story = {
  render: () => (
    <div className="h-screen flex flex-col justify-end pb-10">
      <LearnMore />
    </div>
  ),
};

export const Hidden: Story = {
  render: () => (
    <div className="h-screen flex flex-col justify-center pb-10">
      <LearnMore />
    </div>
  ),
};
