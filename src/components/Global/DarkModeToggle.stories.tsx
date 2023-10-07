import type { Meta, StoryObj } from "@storybook/react";

import DarkModeToggle from "./DarkModeToggle";

const meta: Meta<typeof DarkModeToggle> = {
  component: DarkModeToggle,
};

export default meta;
type Story = StoryObj<typeof DarkModeToggle>;

export const Primary: Story = {
  render: () => <DarkModeToggle />,
  parameters: {
    backgrounds: {
      default: "light",
    },
  },
};

export const DarkMode: Story = {
  render: () => <DarkModeToggle />,
  parameters: {
    theming: {
      themeOverride: "dark",
    },
  },
};
