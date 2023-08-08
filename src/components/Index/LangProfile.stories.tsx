import type { Meta, StoryObj } from "@storybook/react";

import LangProfile from "./LangProfile";

const meta: Meta<typeof LangProfile> = {
  component: LangProfile,
  decorators: [
    (Story) => (
      <div className="w-1/4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LangProfile>;

export const Default: Story = {
  args: {
    name: "TypeScript",
    imgSrc: "https://img.icons8.com/color/48/000000/typescript.png",
    accentColor: "#007ACC",
    darkText: false,
  },
};

export const DarkText: Story = {
  args: {
    name: "Storybook",
    imgSrc: "https://img.icons8.com/color/48/000000/storybook.png",
    accentColor: "#FF4785",
    darkText: true,
  },
};
