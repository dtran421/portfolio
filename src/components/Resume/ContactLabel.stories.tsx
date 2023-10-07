import { FiInfo } from "react-icons/fi";

import type { Meta, StoryObj } from "@storybook/react";

import ContactLabel from "./ContactLabel";

const meta: Meta<typeof ContactLabel> = {
  component: ContactLabel,
};

export default meta;
type Story = StoryObj<typeof ContactLabel>;

export const Primary: Story = {
  args: {
    label: "Hello World",
    icon: <FiInfo />,
  },
};

export const Special: Story = {
  args: {
    label: "Hello World",
    icon: <FiInfo />,
    special: true,
  },
};
