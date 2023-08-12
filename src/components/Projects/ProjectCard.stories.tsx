import type { Meta, StoryObj } from "@storybook/react";

import ProjectCard from "./ProjectCard";

const meta: Meta<typeof ProjectCard> = {
  component: ProjectCard,
  decorators: [
    (Story) => (
      <div className="relative w-1/3">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProjectCard>;

export const Default: Story = {
  args: {
    title: "Project Title",
    link: "http://localhost:3000/",
    accentColor: "#b4b",
    darkText: false,
    thumbnail: "https://via.placeholder.com/250x250",
    width: 250,
    height: 250,
  },
};

export const DarkText: Story = {
  args: {
    title: "Project Title",
    link: "http://localhost:3000/",
    accentColor: "#af3",
    darkText: true,
    thumbnail: "https://via.placeholder.com/250x250",
    width: 250,
    height: 250,
  },
};
