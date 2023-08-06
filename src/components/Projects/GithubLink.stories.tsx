import type { Meta, StoryObj } from "@storybook/react";

import GithubLink from "./GithubLink";

const meta: Meta<typeof GithubLink> = {
  component: GithubLink,
};

export default meta;
type Story = StoryObj<typeof GithubLink>;

export const Default: Story = {
  args: {
    darkText: false,
    github: "http://localhost:3000/",
  },
};

export const DarkText: Story = {
  args: {
    darkText: true,
    github: "http://localhost:3000/",
  },
  parameters: {
    backgrounds: {
      default: "light",
    },
  },
};

export const Compact: Story = {
  args: {
    darkText: false,
    github: "http://localhost:3000/",
    compact: true,
  },
};
