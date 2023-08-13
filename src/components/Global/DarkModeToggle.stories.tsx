import { useMemo } from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { ThemeContext } from "@/utils/ClientUtil";
import { ThemeContextObject } from "@/utils/types";

import DarkModeToggle from "./DarkModeToggle";

const meta: Meta<typeof DarkModeToggle> = {
  component: DarkModeToggle,
};

export default meta;
type Story = StoryObj<typeof DarkModeToggle>;

const DarkModeToggleWrapper = () => {
  const themeContext = useMemo<ThemeContextObject>(
    () => ({
      darkMode: false,
      toggleDarkMode: () => {
        // Do nothing
      },
    }),
    []
  );

  return (
    <ThemeContext.Provider value={themeContext}>
      <DarkModeToggle />
    </ThemeContext.Provider>
  );
};

export const Default: Story = {
  render: () => <DarkModeToggleWrapper />,
};
