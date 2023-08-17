import { useAnimationControls } from "framer-motion";

import type { Meta, StoryObj } from "@storybook/react";

import LearnMore from "./LearnMore";

const meta: Meta<typeof LearnMore> = {
  component: LearnMore,
};

export default meta;
type Story = StoryObj<typeof LearnMore>;

const LearnMoreWrapper = () => {
  const animations = useAnimationControls();
  return <LearnMore animations={animations} />;
};

export const Primary: Story = {
  render: () => <LearnMoreWrapper />,
};
