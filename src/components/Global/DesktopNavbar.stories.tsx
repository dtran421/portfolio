import type { Meta, StoryObj } from "@storybook/react";

import DesktopNavbar from "./DesktopNavbar";
import { TABS } from "./NavLink";

const meta: Meta<typeof DesktopNavbar> = {
  component: DesktopNavbar,
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
type Story = StoryObj<typeof DesktopNavbar>;

export const Primary: Story = {
  render: () => <DesktopNavbar />,
};
