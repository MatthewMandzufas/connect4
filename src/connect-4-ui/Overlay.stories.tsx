import Overlay from "@/connect-4-ui/Overlay";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Overlay> = {
  component: Overlay,
  decorators: [
    (Story) => (
      <div style={{ background: "red" }}>
        <h1>Container</h1>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Overlay>;

export const TheOneWithDefaults: Story = {
  render: () => <Overlay />,
};
