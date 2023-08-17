import type { Meta, StoryObj } from "@storybook/react";

import ExcelFilePreview from "./ExcelFilePreview";

const meta: Meta<typeof ExcelFilePreview> = {
  component: ExcelFilePreview,
  decorators: [
    (Story) => (
      <div className="w-1/3 h-96">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ExcelFilePreview>;

export const Primary: Story = {
  args: {
    label: "Test File",
    filePath: "/test.pdf",
  },
};
