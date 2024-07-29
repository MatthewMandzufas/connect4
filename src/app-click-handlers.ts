import { MutableRefObject } from "react";
import GameFactory, { Status } from "./connect-4-domain/game";
import InMemoryRepository from "./connect-4-domain/in-memory-repository";
import MongoDBRepository from "./connect-4-domain/mongodb-repository";
import { BoardProps, GridBoardCellProps } from "./connect-4-ui/Board";
import { GameOverviewProps } from "./connect-4-ui/GameOverview";
import createGameApi, { GameApi } from "./connect-4-ui/create-game-api";

export type SavedGameType = {
  gameId: string;
  dateSaved: Date;
};

function resolveGameFactoryConfiguration(
  playerOneColor: string,
  playerTwoColor: string
) {
  // console.log("IMPORTMETA: ", import.meta.env.VITE_REPOSITORY);
  const repository =
    import.meta.env.VITE_REPOSITORY === "mongo"
      ? new MongoDBRepository()
      : new InMemoryRepository();
  return {
    boardDimensions: {
      rows: 6,
      columns: 7,
    },
    repository,
    playerColors: {
      playerOneColor,
      playerTwoColor,
    },
  };
}

export function createHandleStartGameClick(
  setActiveGame: (activeGame: {
    gameOverview: GameOverviewProps;
    board: BoardProps;
  }) => void,
  gameApiRef: MutableRefObject<GameApi | undefined>
) {
  return function colorAwareStartGame(
    playerOneColor: string,
    playerTwoColor: string
  ) {
    return function handleStartGameClick(): void {
      const gameFactoryConfiguration = resolveGameFactoryConfiguration(
        playerOneColor,
        playerTwoColor
      );
      gameApiRef.current = createGameApi(
        new GameFactory(gameFactoryConfiguration)
      );
      const gameApi = gameApiRef.current;
      setActiveGame({
        gameOverview: {
          roundNumber: 1,
          playerOne: {
            playerNumber: 1,
            isActive: gameApi.getActivePlayer() === 1,
            remainingDisks: gameApi.getRemainingDisks(1),
            playerDiskColor: gameApi.getPlayerColors().playerOneColor,
          },
          playerTwo: {
            playerNumber: 2,
            isActive: gameApi.getActivePlayer() === 2,
            remainingDisks: gameApi.getRemainingDisks(2),
            playerDiskColor: gameApi.getPlayerColors().playerTwoColor,
          },
          gameRunning: Status.IN_PROGRESS,
        },
        board: {
          cells: gameApi.getBoard(),
          playerOneColor: gameApi.getPlayerColors().playerOneColor,
          playerTwoColor: gameApi.getPlayerColors().playerTwoColor,
          onBoardCellClick: createHandleBoardCellClick(setActiveGame, gameApi),
        } satisfies BoardProps,
      });
    };
  };
}

export function createHandleBoardCellClick(
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

export function createHandleSaveGame(
  gameApi = createGameApi(new GameFactory()),
  savedGames: MutableRefObject<Array<SavedGameType>>
): () => void {
  return async function handleSaveGame(): Promise<void> {
    alert("Saved Game!");
    savedGames.current.push({
      gameId: await gameApi.saveGame(),
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
        playerDiskColor: gameApi.getPlayerColors().playerOneColor,
      },
      playerTwo: {
        playerNumber: 2,
        isActive: gameApi.getActivePlayer() === 2,
        remainingDisks: gameApi.getRemainingDisks(2),
        playerDiskColor: gameApi.getPlayerColors().playerTwoColor,
      },
      gameRunning: gameApi.getGameStatus(),
    },
    board: {
      cells: gameApi.getBoard(),
      playerOneColor: gameApi.getPlayerColors().playerOneColor,
      playerTwoColor: gameApi.getPlayerColors().playerTwoColor,
      onBoardCellClick: createHandleBoardCellClick(setActiveGame, gameApi),
    } satisfies BoardProps,
  });
}

export function createHandleOpenOverlay(
  setShowOverlay: (value: boolean) => void
): () => void {
  return function handleOpenOverlay(): void {
    setShowOverlay(true);
  };
}

export function createHandleLoadGame(
  gameId: string,
  gameApiRef = createGameApi(new GameFactory()),
  setShowOverlay: (value: boolean) => void,
  setActiveGame: (activeGame: {
    gameOverview: GameOverviewProps;
    board: BoardProps;
  }) => void
) {
  return async function handleLoadGame() {
    try {
      await gameApiRef.loadGame(gameId);
      setShowOverlay(false);
      updateGame(setActiveGame, gameApiRef);
    } catch (error) {
      alert(error);
    }
  };
}

export function createHandleRestartGame(
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
