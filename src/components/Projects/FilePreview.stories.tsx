import type { Meta, StoryObj } from "@storybook/react";

import FilePreview from "./FilePreview";

const meta: Meta<typeof FilePreview> = {
  component: FilePreview,
  decorators: [
    (Story) => (
      <div className="w-1/2">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FilePreview>;

export const Default: Story = {
  args: {
    label: "Test File",
    filePath: "/test.pdf",
    previewImgPath: "/projects/advanced-investments/portfolio_report_cover_page.png",
    width: 750,
    height: 1000,
    special: false,
  },
};
