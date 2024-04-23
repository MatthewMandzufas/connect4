import { Meta, StoryObj } from "@storybook/react";
import { Board } from "@/Board";
import createBoardCells from "./create-board-cells";

const meta: Meta<typeof Board> = {
  component: Board,
};

export default meta;

const randomSelectionStrategy: () => 1 | 2 | undefined = () =>
  Math.floor(Math.random() * 3) as 1 | 2 | undefined;

type Story = StoryObj<typeof Board>;

export const TheOneWithDefaults: Story = {
  render: () => <Board />,
};

export const TheOneWithA10x10Grid: Story = {
  render: () => <Board cells={createBoardCells(10, 10)} />,
};

export const TheOneWithAllPlayerOneTokens: Story = {
  render: () => <Board cells={createBoardCells(6, 7, () => 1)} />,
};

export const TheOneWithAllPlayerTwoTokens: Story = {
  render: () => <Board cells={createBoardCells(6, 7, () => 2)} />,
};

export const TheOneWithAllRandomTokens: Story = {
  render: () => (
    <Board cells={createBoardCells(6, 7, randomSelectionStrategy)} />
  ),
};
