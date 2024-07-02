import GamePlayAreaMenu from "@/connect-4-ui/GamePlayAreaMenu";
import { Meta, StoryObj } from "@storybook/react";
import MenuButton from "./MenuButton";

const meta: Meta<typeof GamePlayAreaMenu> = {
  component: GamePlayAreaMenu,
};

type Story = StoryObj<typeof GamePlayAreaMenu>;

export const TheOneWithDefaults: Story = {
  args: {},
};

export const TheOneWithAButton: Story = {
  render: () => (
    <GamePlayAreaMenu>
      <MenuButton text={"Text!"} />
    </GamePlayAreaMenu>
  ),
};

export const TheOneWithMultipleButtons: Story = {
  render: () => (
    <GamePlayAreaMenu>
      <MenuButton text={"Text!"} />
      <MenuButton text={"Text!"} />
      <MenuButton text={"Text!"} />
      <MenuButton text={"Text!"} />
      <MenuButton text={"Text!"} />
      <MenuButton text={"Text!"} />
      <MenuButton text={"Text!"} />
      <MenuButton text={"Text!"} />
    </GamePlayAreaMenu>
  ),
};

export default meta;
