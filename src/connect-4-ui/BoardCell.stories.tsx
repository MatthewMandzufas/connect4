import { BoardCell } from "@/connect-4-ui/BoardCell";
import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";

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
  render: () => <BoardCell uuid={window.crypto.randomUUID()} />,
};

export const TheOneWithPlayer1: Story = {
  render: () => <BoardCell player={1} uuid={window.crypto.randomUUID()} />,
};

export const TheOneWithPlayer2: Story = {
  render: () => <BoardCell player={2} uuid={window.crypto.randomUUID()} />,
};

export const TheOneWithPlayer1AndADifferentTokenColour: Story = {
  render: () => (
    <BoardCell
      player={1}
      uuid={window.crypto.randomUUID()}
      playerOneColor="pink"
    />
  ),
};

export const TheOneWithAClickHandler: Story = {
  render: () => <BoardCell player={1} onClick={action("Clicked Cell")} />,
};
