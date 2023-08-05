import type { Meta, StoryObj } from "@storybook/react";

import MobileNavbar from "./MobileNavbar";

const meta: Meta<typeof MobileNavbar> = {
  component: MobileNavbar,
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

export default meta;
type Story = StoryObj<typeof MobileNavbar>;

export const Default: Story = {
  args: {
    sticky: false,
    page: "Portfolio",
  },
};

export const Sticky: Story = {
  args: {
    sticky: true,
    page: "Portfolio",
  },
};
