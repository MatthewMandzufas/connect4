import GameFactory from "@/connect-4-domain/game";
import { GameplayArea } from "@/connect-4-ui/GameplayArea";
import { useState } from "react";
import { createMovePlayerCommand } from "./connect-4-domain/commands";
import { BoardProps, GridBoardCellProps } from "./connect-4-ui/Board";
import { GameOverviewProps } from "./connect-4-ui/GameOverview";

function createHandleStartGameClick(
  setGame: (game: GameFactory) => void,
  setActiveGame: (activeGame: {
    gameOverview: GameOverviewProps;
    board: BoardProps;
  }) => void,
  handleBoardCellClick: (
    game: GameFactory
  ) => ({ row, column }: GridBoardCellProps) => void
): () => void {
  return function handleStartGameClick(): void {
    const game = new GameFactory();
    setGame(game);
    setActiveGame({
      gameOverview: {
        roundNumber: 1,
        playerOne: {
          playerNumber: 1,
          isActive: game.getActivePlayer() === 1,
          remainingDisks: game.getPlayerStats(1).remainingDisks,
          playerDiskColor: "red",
        },
        playerTwo: {
          playerNumber: 2,
          isActive: game.getActivePlayer() === 2,
          remainingDisks: game.getPlayerStats(2).remainingDisks,
          playerDiskColor: "yellow",
        },
        gameRunning: true,
      },
      board: {
        cells: game.getBoard(),
        playerOneColor: "red",
        playerTwoColor: "yellow",
        onClick: handleBoardCellClick(game),
      } satisfies BoardProps,
    });
  };
}

function createHandleBoardCellClick(game: GameFactory) {
  return function handleBoardCellClick({
    row,
    column,
  }: GridBoardCellProps): void {
    const movePlayerCommand = createMovePlayerCommand({
      player: game.getActivePlayer(),
      targetCell: {
        row,
        column,
      },
    });
    game.move(movePlayerCommand);
    console.log(movePlayerCommand);
  };
}

const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [game, setGame] = useState<GameFactory>();
  const [activeGame, setActiveGame] = useState<{
    gameOverview: GameOverviewProps;
    board: BoardProps;
  }>();
  return (
    <GameplayArea
      activeGame={activeGame}
      onStartGameClick={createHandleStartGameClick(
        setGame,
        setActiveGame,
        createHandleBoardCellClick
      )}
    />
  );
};

export default App;
