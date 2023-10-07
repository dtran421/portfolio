import type { Meta, StoryObj } from "@storybook/react";

import FetchError from "./FetchError";

const meta: Meta<typeof FetchError> = {
  component: FetchError,
};

export default meta;
type Story = StoryObj<typeof FetchError>;

export const Primary: Story = {
  render: () => <FetchError />,
};
