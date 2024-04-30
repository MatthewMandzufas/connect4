import { Meta, StoryObj } from "@storybook/react";
import { GameStatus } from "@/connect-4-ui/GameStatus";

const meta: Meta<typeof GameStatus> = {
  component: GameStatus,
};

type Story = StoryObj<typeof GameStatus>;

export const TheOneWithDefaults: Story = {
  render: () => <GameStatus />,
};

export const TheOneWithAGameRunning: Story = {
  render: () => <GameStatus gameRunning={true} />,
};

export const TheOneWithAGameNotRunning: Story = {
  render: () => <GameStatus gameRunning={false} />,
};

export default meta;
