import GameFactory, { Status } from "@/connect-4-domain/game";
import { GameplayArea } from "@/connect-4-ui/GameplayArea";
import { MutableRefObject, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BoardProps, GridBoardCellProps } from "./connect-4-ui/Board";
import { GameOverviewProps } from "./connect-4-ui/GameOverview";
import LoadGameDialog from "./connect-4-ui/LoadGameDialog";
import Overlay from "./connect-4-ui/Overlay";
import SavedGame from "./connect-4-ui/SavedGame";
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
  gameApi = createGameApi(new GameFactory()),
  savedGames: MutableRefObject<Array<SavedGame>>
): () => void {
  return function handleSaveGame(): void {
    alert("Saved Game!");
    savedGames.current.push({
      gameId: gameApi.saveGame(),
      dateSaved: new Date(Date.now()),
    });
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

function createHandleOpenOverlay(
  setShowOverlay: (value: boolean) => void
): () => void {
  return function handleOpenOverlay(): void {
    setShowOverlay(true);
  };
}

function createHandleLoadGame(
  gameId: string,
  gameApiRef = createGameApi(new GameFactory()),
  setShowOverlay: (value: boolean) => void,
  setActiveGame: (activeGame: {
    gameOverview: GameOverviewProps;
    board: BoardProps;
  }) => void
) {
  return function handleLoadGame() {
    try {
      gameApiRef.loadGame(gameId);
      setShowOverlay(false);
      updateGame(setActiveGame, gameApiRef);
    } catch (error) {
      alert(error);
    }
  };
}

function createHandleRestartGame(
  gameApiRef = createGameApi(new GameFactory()),
  setActiveGame: (activeGame: {
    gameOverview: GameOverviewProps;
    board: BoardProps;
  }) => void
) {
  return function handleRestartGame() {
    gameApiRef.resetGame();
    updateGame(setActiveGame, gameApiRef);
  };
}

type SavedGame = {
  gameId: string;
  dateSaved: Date;
};

const App = () => {
  const [activeGame, setActiveGame] = useState<{
    gameOverview: GameOverviewProps;
    board: BoardProps;
  }>();

  const savedGamesRef = useRef<Array<SavedGame>>([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const gameApiRef = useRef<GameApi | undefined>(undefined);

  return (
    <>
      {showOverlay &&
        createPortal(
          <Overlay
            componentSpec={{
              Component: ({
                onCloseDialogClick,
              }: {
                onCloseDialogClick: () => void;
              }) => (
                <LoadGameDialog onCloseDialogClick={onCloseDialogClick}>
                  {savedGamesRef.current.map((game: SavedGame) => (
                    <SavedGame
                      gameId={game.gameId}
                      dateSaved={game.dateSaved}
                      handleLoadGame={createHandleLoadGame(
                        game.gameId,
                        gameApiRef.current,
                        setShowOverlay,
                        setActiveGame
                      )}
                    />
                  ))}
                </LoadGameDialog>
              ),
              props: {
                onCloseDialogClick: () => setShowOverlay(false),
              },
            }}
          />,
          document.body
        )}
      <GameplayArea
        activeGame={activeGame}
        onStartGameClick={createHandleStartGameClick(setActiveGame, gameApiRef)}
        onBoardCellClick={createHandleBoardCellClick(
          setActiveGame,
          gameApiRef.current
        )}
        onSaveGameClick={createHandleSaveGame(
          gameApiRef.current,
          savedGamesRef
        )}
        onLoadGameClick={createHandleOpenOverlay(setShowOverlay)}
        onRestartGameClick={createHandleRestartGame(
          gameApiRef.current,
          setActiveGame
        )}
      />
    </>
  );
};

export default App;
