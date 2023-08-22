import type { Meta, StoryObj } from "@storybook/react";

import MenuBar from "./MenuBar";

const meta: Meta<typeof MenuBar> = {
  component: MenuBar,
  decorators: [
    (Story) => (
      <div style={{ width: "50%", height: "100%" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MenuBar>;

export const Primary: Story = {
  args: {
    paragraphs: ["Test 1", "Test 2"],
    activeParagraph: 0,
    scrollToParagraph: () => {
      // Do nothing
    },
  },
};
