import type { Meta, StoryObj } from "@storybook/react";

import ProjectsBackButton from "./ProjectsBackButton";

const meta: Meta<typeof ProjectsBackButton> = {
  component: ProjectsBackButton,
};

export default meta;
type Story = StoryObj<typeof ProjectsBackButton>;

export const Primary: Story = {
  args: {},
};
