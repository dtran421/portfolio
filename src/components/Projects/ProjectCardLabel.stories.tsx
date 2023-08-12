import type { Meta, StoryObj } from "@storybook/react";

import ProjectCardLabel from "./ProjectCardLabel";

const meta: Meta<typeof ProjectCardLabel> = {
  component: ProjectCardLabel,
  decorators: [
    (Story) => (
      <div className="w-64 h-64 relative">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProjectCardLabel>;

export const Default: Story = {
  args: {
    title: "Test Project",
    isHovered: false,
    accentColor: "#b4b",
    darkText: false,
  },
};

export const Hovered: Story = {
  args: {
    title: "Test Project",
    isHovered: true,
    accentColor: "#b4b",
    darkText: false,
  },
};

export const DarkText: Story = {
  args: {
    title: "Test Project",
    isHovered: false,
    accentColor: "#af3",
    darkText: true,
  },
};
