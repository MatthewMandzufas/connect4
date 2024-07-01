import { Status } from "@/connect-4-domain/game";
import GameOverview from "@/connect-4-ui/GameOverview";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof GameOverview> = {
  component: GameOverview,
};

type Story = StoryObj<typeof GameOverview>;

export default meta;

export const TheOneWithPlayerOneActiveAndGameRunning: Story = {
  render: () => (
    <GameOverview
      playerOne={{
        playerNumber: 1,
        isActive: true,
        remainingDisks: 10,
        playerDiskColor: "red",
      }}
      playerTwo={{
        playerNumber: 2,
        isActive: false,
        remainingDisks: 10,
        playerDiskColor: "yellow",
      }}
      roundNumber={1}
      gameRunning={Status.IN_PROGRESS}
    />
  ),
};

export const TheOneWithPlayerTwoActiveAndGameRunning: Story = {
  render: () => (
    <GameOverview
      playerOne={{
        playerNumber: 1,
        isActive: false,
        remainingDisks: 10,
        playerDiskColor: "red",
      }}
      playerTwo={{
        playerNumber: 2,
        isActive: true,
        remainingDisks: 10,
        playerDiskColor: "yellow",
      }}
      roundNumber={1}
      gameRunning={Status.IN_PROGRESS}
    />
  ),
};

export const TheOneWithPlayerOneActiveAndGameIsADraw: Story = {
  render: () => (
    <GameOverview
      playerOne={{
        playerNumber: 1,
        isActive: true,
        remainingDisks: 10,
        playerDiskColor: "red",
      }}
      playerTwo={{
        playerNumber: 2,
        isActive: false,
        remainingDisks: 10,
        playerDiskColor: "yellow",
      }}
      roundNumber={1}
      gameRunning={Status.DRAW}
    />
  ),
};

export const TheOneWithRandomValues: Story = {
  render: () => (
    <GameOverview
      playerOne={{
        playerNumber: 1,
        isActive: false,
        remainingDisks: 90,
        playerDiskColor: "orange",
      }}
      playerTwo={{
        playerNumber: 2,
        isActive: true,
        remainingDisks: 3,
        playerDiskColor: "tan",
      }}
      roundNumber={9}
      gameRunning={Status.PLAYER_ONE_WIN}
    />
  ),
};
