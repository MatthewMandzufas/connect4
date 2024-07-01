import GameFactory, { Status } from "@/connect-4-domain/game";
import { GameplayArea } from "@/connect-4-ui/GameplayArea";
import { useRef, useState } from "react";
import { BoardProps, GridBoardCellProps } from "./connect-4-ui/Board";
import { GameOverviewProps } from "./connect-4-ui/GameOverview";
import createGameApi, { GameApi } from "./connect-4-ui/create-game-api";
import "./global.css";

function createHandleStartGameClick(
  setActiveGame: (activeGame: {
    gameOverview: GameOverviewProps;
    board: BoardProps;
  }) => void,
  gameApi: GameApi
): () => void {
  return function handleStartGameClick(): void {
    setActiveGame({
      gameOverview: {
        roundNumber: 1,
        playerOne: {
          playerNumber: 1,
          isActive: gameApi.getActivePlayer() === 1,
          remainingDisks: gameApi.getRemainingDisks(1),
          playerDiskColor: "#FF5733",
        },
        playerTwo: {
          playerNumber: 2,
          isActive: gameApi.getActivePlayer() === 2,
          remainingDisks: gameApi.getRemainingDisks(2),
          playerDiskColor: "#fdfd96",
        },
        gameRunning: Status.IN_PROGRESS,
      },
      board: {
        cells: gameApi.getBoard(),
        playerOneColor: "#FF5733",
        playerTwoColor: "#fdfd96",
        onBoardCellClick: createHandleBoardCellClick(setActiveGame, gameApi),
      } satisfies BoardProps,
    });
  };
}

function createHandleBoardCellClick(
  setActiveGame: (activeGame: {
    gameOverview: GameOverviewProps;
    board: BoardProps;
  }) => void,
  gameApi: GameApi
) {
  return function handleBoardCellClick({
    row,
    column,
  }: GridBoardCellProps): void {
    const player = gameApi.getActivePlayer();
    const handlePlayerMove = gameApi.getBoard()[row][column].handlePlayerMove;
    handlePlayerMove(player);
    setActiveGame({
      gameOverview: {
        roundNumber: 1,
        playerOne: {
          playerNumber: 1,
          isActive: gameApi.getActivePlayer() === 1,
          remainingDisks: gameApi.getRemainingDisks(1),
          playerDiskColor: "#FF5733",
        },
        playerTwo: {
          playerNumber: 2,
          isActive: gameApi.getActivePlayer() === 2,
          remainingDisks: gameApi.getRemainingDisks(2),
          playerDiskColor: "#fdfd96",
        },
        gameRunning: gameApi.getGameStatus(),
      },
      board: {
        cells: gameApi.getBoard(),
        playerOneColor: "#FF5733",
        playerTwoColor: "#fdfd96",
        onBoardCellClick: createHandleBoardCellClick(setActiveGame, gameApi),
      } satisfies BoardProps,
    });
  };
}

const App = () => {
  const [activeGame, setActiveGame] = useState<{
    gameOverview: GameOverviewProps;
    board: BoardProps;
  }>();

  const gameApiRef = useRef<GameApi>(createGameApi(new GameFactory()));

  return (
    <GameplayArea
      activeGame={activeGame}
      onStartGameClick={createHandleStartGameClick(
        setActiveGame,
        gameApiRef.current
      )}
      onBoardCellClick={createHandleBoardCellClick(
        setActiveGame,
        gameApiRef.current
      )}
    />
  );
};

export default App;
