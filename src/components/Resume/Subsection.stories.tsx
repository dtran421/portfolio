import type { Meta, StoryObj } from "@storybook/react";

import { generateSubsectionStub } from "@/utils/Test";

import Subsection from "./Subsection";

const meta: Meta<typeof Subsection> = {
  component: Subsection,
};

export default meta;
type Story = StoryObj<typeof Subsection>;

export const Default: Story = {
  args: {
    ...generateSubsectionStub(),
    currentlyWorking: false,
    pos: "first",
  },
};

export const CurrentlyWorking: Story = {
  args: {
    ...generateSubsectionStub(),
    currentlyWorking: true,
    pos: "first",
  },
};

export const Middle: Story = {
  args: {
    ...generateSubsectionStub(),
    currentlyWorking: false,
    pos: "middle",
  },
};

export const Last: Story = {
  args: {
    ...generateSubsectionStub(),
    currentlyWorking: false,
    pos: "last",
  },
};
