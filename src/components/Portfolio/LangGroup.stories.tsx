import type { Meta, StoryObj } from "@storybook/react";

import { Language } from "@/utils/types";

import LangGroup from "./LangGroup";
import { DarkText, Default as LangProfileDefault } from "./LangProfile.stories";

const meta: Meta<typeof LangGroup> = {
  component: LangGroup,
};

export default meta;
type Story = StoryObj<typeof LangGroup>;

export const Primary: Story = {
  args: {
    heading: "Test Heading",
    description: "Test Description",
    emoji: "👋",
    emojiLabel: "Waving Hand",
    languages: [
      {
        ...LangProfileDefault.args,
        img: {
          url: LangProfileDefault.args?.imgSrc ?? "https://img.icons8.com/color/48/000000/typescript.png",
        },
      } as Language,
      {
        ...DarkText.args,
        img: {
          url: DarkText.args?.imgSrc ?? "https://img.icons8.com/color/48/000000/storybook.png",
        },
      } as Language,
    ],
  },
};
