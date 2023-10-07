import type { Meta, StoryObj } from "@storybook/react";

import { generateRichTextStub } from "@/utils/TestUtil";

import BlogPostCard from "./BlogPostCard";

const meta: Meta<typeof BlogPostCard> = {
  component: BlogPostCard,
};

export default meta;
type Story = StoryObj<typeof BlogPostCard>;

export const Primary: Story = {
  args: {
    postId: "test-1",
    title: "Blog Post Title",
    publishDate: "2021-01-01",
    topicTags: ["test", "tag"],
    heroBanner: {
      title: "Hero Banner Title",
      url: "https://via.placeholder.com/650x300",
      width: 650,
      height: 300,
    },
    body: generateRichTextStub(),
  },
};

export const Featured: Story = {
  args: {
    ...Primary.args,
    featured: true,
  },
};
