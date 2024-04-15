import { Meta, StoryObj } from "@storybook/react";
import { Board } from "@/Board";
import createCells from "./create-cells";

const meta: Meta<typeof Board> = {
  component: Board,
};

export default meta;

type Story = StoryObj<typeof Board>;

export const TheOneWithDefaults: Story = {
  render: () => <Board />,
};

export const TheOneWithA10x10Grid: Story = {
  render: () => <Board cells={createCells(10, 10)} />,
};
