import type { Meta, StoryObj } from "@storybook/react";

import DesktopNavbar from "./DesktopNavbar";

const meta: Meta<typeof DesktopNavbar> = {
  component: DesktopNavbar,
};

export default meta;
type Story = StoryObj<typeof DesktopNavbar>;

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
