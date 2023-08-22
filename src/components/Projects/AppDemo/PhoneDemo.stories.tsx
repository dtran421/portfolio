import type { Meta, StoryObj } from "@storybook/react";

import PhoneDemo from "./PhoneDemo";

const meta: Meta<typeof PhoneDemo> = {
  component: PhoneDemo,
  decorators: [
    (Story) => (
      // TODO: Fix this rendering
      <div className="w-full h-screen flex justify-center items-center">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PhoneDemo>;

export const Primary: Story = {
  args: {
    page: "Test",
    activeParagraph: 0,
    active: false,
  },
};

export const Active: Story = {
  args: {
    page: "collegetalk",
    activeParagraph: 0,
    active: true,
  },
};
