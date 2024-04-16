import { Meta, StoryObj } from "@storybook/react";
import { Board } from "@/Board";
import createBoardCells from "./create-board-cells";

const meta: Meta<typeof Board> = {
  component: Board,
};

export default meta;

type Story = StoryObj<typeof Board>;

export const TheOneWithDefaults: Story = {
  render: () => <Board />,
};

export const TheOneWithA10x10Grid: Story = {
  render: () => <Board cells={createBoardCells(10, 10)} />,
};

export const TheOneWithAllPlayerOneTokens: Story = {
  render: () => <Board cells={createBoardCells(4, 4)} />,
};
