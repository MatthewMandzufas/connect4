import { Status } from "@/connect-4-domain/game";
import { GameStatus } from "@/connect-4-ui/GameStatus";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof GameStatus> = {
  component: GameStatus,
};

type Story = StoryObj<typeof GameStatus>;

export const TheOneWithDefaults: Story = {
  render: () => <GameStatus />,
};

export const TheOneWithAGameRunning: Story = {
  render: () => <GameStatus gameRunning={Status.IN_PROGRESS} />,
};

export const TheOneWithAPlayerOneWin: Story = {
  render: () => <GameStatus gameRunning={Status.PLAYER_ONE_WIN} />,
};

export const TheOneWithAPlayerTwoWin: Story = {
  render: () => <GameStatus gameRunning={Status.PLAYER_TWO_WIN} />,
};

export const TheOneWithADraw: Story = {
  render: () => <GameStatus gameRunning={Status.DRAW} />,
};

export default meta;
