import type { Meta, StoryObj } from "@storybook/react";

import MobileImage from "./MobileImage";

const meta: Meta<typeof MobileImage> = {
  component: MobileImage,
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    chromatic: { viewports: [320, 414, 834] },
  },
};

export default meta;
type Story = StoryObj<typeof MobileImage>;

export const Primary: Story = {
  args: {
    page: "collegetalk",
    num: 1,
  },
};
