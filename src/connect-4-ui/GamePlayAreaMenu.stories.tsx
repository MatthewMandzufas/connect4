import GamePlayAreaMenu from "@/connect-4-ui/GamePlayAreaMenu";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof GamePlayAreaMenu> = {
  component: GamePlayAreaMenu,
};

type Story = StoryObj<typeof GamePlayAreaMenu>;

export const TheOneWithDefaults: Story = {
  render: () => <GamePlayAreaMenu />,
};

export default meta;
