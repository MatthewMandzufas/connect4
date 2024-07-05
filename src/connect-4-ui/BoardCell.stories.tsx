import { BoardCell } from "@/connect-4-ui/BoardCell";
import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { v4 } from "uuid";

const meta: Meta<typeof BoardCell> = {
  component: BoardCell,
  decorators: [
    (Story) => (
      <div style={{ height: "200px", width: "200px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof BoardCell>;

export const TheOneWithDefaults: Story = {
  render: () => <BoardCell uuid={v4()} />,
};

export const TheOneWithPlayer1: Story = {
  render: () => <BoardCell player={1} uuid={v4()} />,
};

export const TheOneWithPlayer2: Story = {
  render: () => <BoardCell player={2} uuid={v4()} />,
};

export const TheOneWithPlayer1AndADifferentTokenColour: Story = {
  render: () => <BoardCell player={1} uuid={v4()} playerOneColor="pink" />,
};

export const TheOneWithAClickHandler: Story = {
  render: () => <BoardCell player={1} onClick={action("Clicked Cell")} />,
};
