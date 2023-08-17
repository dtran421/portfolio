import type { Meta, StoryObj } from "@storybook/react";

import MobileNavbar from "./MobileNavbar";
import { TABS } from "./NavLink";

const meta: Meta<typeof MobileNavbar> = {
  component: MobileNavbar,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        segments: [TABS[0]],
      },
    },
    viewport: {
      defaultViewport: "mobile1",
    },
    chromatic: { viewports: [320, 414, 834] },
  },
};

export default meta;
type Story = StoryObj<typeof MobileNavbar>;

export const Primary: Story = {
  args: {
    sticky: false,
  },
};

export const Sticky: Story = {
  args: {
    sticky: true,
  },
};
