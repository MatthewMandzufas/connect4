import { Meta, StoryObj } from "@storybook/react";
import { PlayerRoundOverview } from "@/PlayerRoundOverview";

const meta: Meta<typeof PlayerRoundOverview> = {
  component: PlayerRoundOverview,
};

type Story = StoryObj<typeof PlayerRoundOverview>;

export default meta;

export const TheOneWithPlayer2: Story = {
  render: () => (
    <PlayerRoundOverview
      playerNumber={2}
      isActive={true}
      remainingDisks={10}
      playerDiskColor="red"
    />
  ),
};

export const TheOneWithAnActivePlayer: Story = {
  render: () => (
    <PlayerRoundOverview
      playerNumber={1}
      remainingDisks={10}
      playerDiskColor="red"
      isActive={true}
    />
  ),
};

export const TheOneWith5RemainingDisks: Story = {
  render: () => (
    <PlayerRoundOverview
      playerNumber={1}
      remainingDisks={5}
      playerDiskColor="red"
      isActive={true}
    />
  ),
};

export const TheOneWithPinkDiskColor: Story = {
  render: () => (
    <PlayerRoundOverview
      playerNumber={1}
      remainingDisks={10}
      playerDiskColor="pink"
      isActive={true}
    />
  ),
};

export const TheOneWithAnInactivePlayer: Story = {
  render: () => (
    <PlayerRoundOverview
      playerNumber={1}
      remainingDisks={10}
      playerDiskColor="red"
      isActive={false}
    />
  ),
};
