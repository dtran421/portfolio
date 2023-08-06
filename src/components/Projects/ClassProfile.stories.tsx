import type { Meta, StoryObj } from "@storybook/react";

import ClassProfile from "./ClassProfile";

const meta: Meta<typeof ClassProfile> = {
  component: ClassProfile,
};

export default meta;
type Story = StoryObj<typeof ClassProfile>;

export const Default: Story = {
  args: {
    heading: "Test Project",
    dateString: "2021-01-01",
    children: "Test Description",
  },
};
