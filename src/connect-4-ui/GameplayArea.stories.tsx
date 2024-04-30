import { Meta, StoryObj } from "@storybook/react";
import { GameplayArea } from "@/connect-4-ui/GameplayArea";
import createBoardCells from "./create-board-cells";

const meta: Meta<typeof GameplayArea> = {
  component: GameplayArea,
};

export default meta;

type Story = StoryObj<typeof GameplayArea>;

export const TheOneWithDefaults: Story = {
  render: () => <GameplayArea />,
};

export const TheOneWithAGameInProgress: Story = {
  render: () => (
    <GameplayArea
      activeGame={{
        board: {
          cells: createBoardCells(6, 7),
        },
        gameOverview: {
          playerOne: {
            playerNumber: 1,
            isActive: true,
            remainingDisks: 10,
            playerDiskColor: "red",
          },
          playerTwo: {
            playerNumber: 2,
            isActive: false,
            remainingDisks: 10,
            playerDiskColor: "yellow",
          },
          roundNumber: 1,
          gameRunning: false,
        },
      }}
    />
  ),
};
