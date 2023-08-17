import type { Meta, StoryObj } from "@storybook/react";

import { LeftSide as EventDefault } from "@/components/Portfolio/Event.stories";
import { generateRichTextStub } from "@/utils/Test";
import { EventType, TimelineEvent } from "@/utils/types";

import Timeline from "./Timeline";

const meta: Meta<typeof Timeline> = {
  component: Timeline,
};

export default meta;
type Story = StoryObj<typeof Timeline>;

export const Primary: Story = {
  args: {
    timelineEvents: [
      EventDefault.args?.event as TimelineEvent,
      {
        heading: "Studied at University of Acme",
        type: EventType.EDUCATION,
        date: "2020-01-01",
        startDate: "2020-01-01",
        endDate: "2020-01-01",
        currentlyWorking: false,
        description: generateRichTextStub(),
      },
    ],
  },
};
