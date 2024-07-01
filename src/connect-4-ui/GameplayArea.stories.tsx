import { Status } from "@/connect-4-domain/game";
import { GameplayArea } from "@/connect-4-ui/GameplayArea";
import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
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
          gameRunning: Status.IN_PROGRESS,
        },
      }}
    />
  ),
};

export const TheOneWithAStartGameClickHandler: Story = {
  render: () => <GameplayArea onStartGameClick={action("Start Game!")} />,
};
