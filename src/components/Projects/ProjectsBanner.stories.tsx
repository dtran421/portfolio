import type { Meta, StoryObj } from "@storybook/react";

import ProjectsBanner from "./ProjectsBanner";

const meta: Meta<typeof ProjectsBanner> = {
  component: ProjectsBanner,
};

export default meta;
type Story = StoryObj<typeof ProjectsBanner>;

export const Default: Story = {
  args: {
    pageTitle: "Test Project",
    accentColor: "#b4b",
    darkText: false,
    github: "http://localhost:3000/",
  },
};

export const DarkText: Story = {
  args: {
    pageTitle: "Test Project",
    accentColor: "#af3",
    darkText: true,
    github: "http://localhost:3000/",
  },
};

export const NoGithub: Story = {
  args: {
    pageTitle: "Test Project",
    accentColor: "#b4b",
    darkText: false,
  },
};
