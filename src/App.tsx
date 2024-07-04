import GameFactory, { Status } from "@/connect-4-domain/game";
import { GameUuid, GameplayArea } from "@/connect-4-ui/GameplayArea";
import { MutableRefObject, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BoardProps, GridBoardCellProps } from "./connect-4-ui/Board";
import { GameOverviewProps } from "./connect-4-ui/GameOverview";
import Overlay from "./connect-4-ui/Overlay";
import createGameApi, { GameApi } from "./connect-4-ui/create-game-api";
import "./global.css";

function createHandleStartGameClick(
  setActiveGame: (activeGame: {
    gameOverview: GameOverviewProps;
    board: BoardProps;
  }) => void,
  gameApiRef: MutableRefObject<GameApi | undefined>
): () => void {
  return function handleStartGameClick(): void {
    gameApiRef.current = createGameApi(new GameFactory());
    const gameApi = gameApiRef.current;
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
  gameApi = createGameApi(new GameFactory())
) {
  return function handleBoardCellClick({
    row,
    column,
  }: GridBoardCellProps): void {
    const player = gameApi.getActivePlayer();
    const handlePlayerMove = gameApi.getBoard()[row][column].handlePlayerMove;
    handlePlayerMove(player);
    updateGame(setActiveGame, gameApi);
  };
}

function createHandleSaveGame(
  setSavedUuid: (uuid: GameUuid) => void,
  gameApi = createGameApi(new GameFactory())
): () => void {
  return function handleSaveGame(): void {
    setSavedUuid(gameApi.saveGame());
    alert("Game Saved!");
  };
}

function updateGame(
  setActiveGame: (activeGame: {
    gameOverview: GameOverviewProps;
    board: BoardProps;
  }) => void,
  gameApi = createGameApi(new GameFactory())
) {
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
}

function createHandleLoadGame(
  savedUuid: GameUuid,
  gameApi = createGameApi(new GameFactory()),
  setActiveGame: (activeGame: {
    gameOverview: GameOverviewProps;
    board: BoardProps;
  }) => void,
  setShowOverlay: (value: boolean) => void
): () => void {
  return function handleLoadGame(): void {
    setShowOverlay(true);
    try {
      gameApi.loadGame(savedUuid);
      updateGame(setActiveGame, gameApi);
    } catch (error) {
      alert("No Valid Game Saved!");
    }
  };
}

const App = () => {
  const [activeGame, setActiveGame] = useState<{
    gameOverview: GameOverviewProps;
    board: BoardProps;
  }>();
  const [savedUuid, setSavedUuid] = useState<GameUuid>(crypto.randomUUID());
  const [showOverlay, setShowOverlay] = useState(false);

  const gameApiRef = useRef<GameApi | undefined>(undefined);

  return (
    <>
      {showOverlay &&
        createPortal(
          <Overlay handleClose={() => setShowOverlay(false)} />,
          document.body
        )}
      <GameplayArea
        activeGame={activeGame}
        onStartGameClick={createHandleStartGameClick(setActiveGame, gameApiRef)}
        onBoardCellClick={createHandleBoardCellClick(
          setActiveGame,
          gameApiRef.current
        )}
        onSaveGameClick={createHandleSaveGame(setSavedUuid, gameApiRef.current)}
        onLoadGameClick={createHandleLoadGame(
          savedUuid,
          gameApiRef.current,
          setActiveGame,
          setShowOverlay
        )}
      />
    </>
  );
};

export default App;
