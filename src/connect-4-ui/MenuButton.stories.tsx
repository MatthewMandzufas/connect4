import MenuButton from "@/connect-4-ui/MenuButton";
import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof MenuButton> = {
  component: MenuButton,
};

type Story = StoryObj<typeof MenuButton>;

export const TheOneWithDefaults: Story = {
  render: () => <MenuButton text={"Testing!"} />,
};

export const TheOneWithAClickHandler: Story = {
  render: () => <MenuButton text={"Testing!"} onClick={action("Clicked!")} />,
};

export default meta;
