import type { Meta, StoryObj } from "@storybook/react";

import Paragraph from "./Paragraph";

const meta: Meta<typeof Paragraph> = {
  component: Paragraph,
};

export default meta;
type Story = StoryObj<typeof Paragraph>;

export const Primary: Story = {
  args: {
    heading: "Test Heading",
    body: "Test body",
    idx: 0,
    setParagraphPosition: () => {
      // Do nothing
    },
    children: "Test children",
  },
};
