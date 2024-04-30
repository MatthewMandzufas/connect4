import { Meta, StoryObj } from "@storybook/react";
import { BoardCell } from "@/connect-4-ui/BoardCell";

const meta: Meta<typeof BoardCell> = {
  component: BoardCell,
};

export default meta;

type Story = StoryObj<typeof BoardCell>;

export const TheOneWithDefaults: Story = {
  render: () => <BoardCell uuid={crypto.randomUUID()} />,
};

export const TheOneWithPlayer1: Story = {
  render: () => <BoardCell player={1} uuid={crypto.randomUUID()} />,
};

export const TheOneWithPlayer2: Story = {
  render: () => <BoardCell player={2} uuid={crypto.randomUUID()} />,
};

export const TheOneWithPlayer1AndADifferentTokenColour: Story = {
  render: () => (
    <BoardCell player={1} uuid={crypto.randomUUID()} playerOneColor="pink" />
  ),
};
