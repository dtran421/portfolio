import Image from "next/image";

import type { Meta, StoryObj } from "@storybook/react";

import SocialProfile from "./SocialProfile";

const meta: Meta<typeof SocialProfile> = {
  component: SocialProfile,
};

export default meta;
type Story = StoryObj<typeof SocialProfile>;

export const Primary: Story = {
  args: {
    name: "GitHub",
    link: "https://via.placeholder.com",
    icon: (
      <Image
        src="https://via.placeholder.com/25"
        alt="GitHub Logo"
        width={25}
        height={25}
        className="rounded-full overflow-hidden"
      />
    ),
  },
};
