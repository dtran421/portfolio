import type { Meta, StoryObj } from "@storybook/react";

import { generateRichTextStub } from "@/utils/TestUtil";
import { EventType } from "@/utils/types";

import Event from "./Event";

const meta: Meta<typeof Event> = {
  component: Event,
};

export default meta;
type Story = StoryObj<typeof Event>;

export const LeftSide: Story = {
  args: {
    side: "L",
    event: {
      heading: "Test Heading",
      description: generateRichTextStub(),
      type: EventType.WORK,
      date: "2021-01-01",
      startDate: "2021-01-01",
      endDate: "2021-01-01",
      currentlyWorking: false,
    },
  },
};

export const RightSide: Story = {
  args: {
    side: "R",
    event: {
      heading: "Test Heading",
      description: generateRichTextStub(),
      type: EventType.WORK,
      date: "2021-01-01",
      startDate: "2021-01-01",
      endDate: "2021-01-01",
      currentlyWorking: false,
    },
  },
};
