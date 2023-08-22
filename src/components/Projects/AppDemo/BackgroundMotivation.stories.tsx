import type { Meta, StoryObj } from "@storybook/react";

import BackgroundMotivation from "./BackgroundMotivation";

const meta: Meta<typeof BackgroundMotivation> = {
  component: BackgroundMotivation,
};

export default meta;
type Story = StoryObj<typeof BackgroundMotivation>;

export const Primary: Story = {
  args: {
    children: "This is the background and motivation for the project.",
  },
};
