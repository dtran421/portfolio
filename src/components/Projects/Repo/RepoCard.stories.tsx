import type { Meta, StoryObj } from "@storybook/react";

import RepoCard from "./RepoCard";

const meta: Meta<typeof RepoCard> = {
  component: RepoCard,
  decorators: [
    (Story) => (
      <div className="w-1/2">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RepoCard>;

export const Default: Story = {
  args: {
    name: "Test Project",
    url: "http://localhost:3000/",
    tags: ["test", "project"],
    accentColor: "#b4b",
  },
};

export const NoTags: Story = {
  args: {
    name: "Test Project",
    url: "http://localhost:3000/",
    tags: [],
    accentColor: "#b4b",
  },
};
