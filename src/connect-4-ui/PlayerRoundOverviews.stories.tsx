import { Meta, StoryObj } from "@storybook/react";
import { PlayerRoundOverviews } from "@/connect-4-ui/PlayerRoundOverviews";

const meta: Meta<typeof PlayerRoundOverviews> = {
  component: PlayerRoundOverviews,
};

export default meta;

type Story = StoryObj<typeof PlayerRoundOverviews>;

export const TheOneWithPlayerOneActive: Story = {
  render: () => (
    <PlayerRoundOverviews
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
    />
  ),
};
export const TheOneWithPlayerTwoActive: Story = {
  render: () => (
    <PlayerRoundOverviews
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
    />
  ),
};
export const TheOneWithVariedAttributes: Story = {
  render: () => (
    <PlayerRoundOverviews
      playerOne={{
        playerNumber: 1,
        isActive: false,
        remainingDisks: 55,
        playerDiskColor: "deeppink",
      }}
      playerTwo={{
        playerNumber: 2,
        isActive: true,
        remainingDisks: 2,
        playerDiskColor: "teal",
      }}
    />
  ),
};
