import type { Meta, StoryObj } from "@storybook/react";

import { generateRichTextStub, generateSubsectionStub } from "@/utils/Test";

import Section from "./Section";

const meta: Meta<typeof Section> = {
  component: Section,
};

export default meta;
type Story = StoryObj<typeof Section>;

export const Tabs: Story = {
  args: {
    type: "Tabs",
    heading: "Test Heading",
    body: [
      { title: "Test Title 1", body: "Test Body 1", currentlyWorking: true },
      { title: "Test Title 2", body: "Test Body 2", currentlyWorking: false },
    ].map(({ title, body, currentlyWorking }) => {
      const subsection = generateSubsectionStub(title, body);

      return {
        ...subsection,
        currentlyWorking,
        description: generateRichTextStub(body),
      };
    }),
  },
};

export const Bubbles: Story = {
  args: {
    type: "Bubbles",
    heading: "Test Heading",
    body: ["Test Body 1", "Test Body 2"],
  },
};
