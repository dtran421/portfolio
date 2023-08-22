import type { Meta, StoryObj } from "@storybook/react";

import NavLink, { TABS } from "./NavLink";

const meta: Meta<typeof NavLink> = {
  component: NavLink,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        segments: [TABS[0]],
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof NavLink>;

export const Primary: Story = {
  args: {
    link: "Portfolio",
  },
};

export const Mobile: Story = {
  args: {
    link: "Portfolio",
    mobile: true,
  },
};
