import { Meta, StoryObj } from "@storybook/react";
import GameOverview from "@/connect-4-ui/GameOverview";

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
      gameRunning={true}
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
      gameRunning={true}
    />
  ),
};

export const TheOneWithPlayerOneActiveAndGameNotRunning: Story = {
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
      gameRunning={false}
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
      gameRunning={true}
    />
  ),
};
