import { GameplayArea } from "@/connect-4-ui/GameplayArea";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  createHandleBoardCellClick,
  createHandleLoadGame,
  createHandleOpenOverlay,
  createHandleRestartGame,
  createHandleSaveGame,
  createHandleStartGameClick,
  SavedGameType,
} from "./app-click-handlers";
import { BoardProps } from "./connect-4-ui/Board";
import { GameOverviewProps } from "./connect-4-ui/GameOverview";
import LoadGameDialog from "./connect-4-ui/LoadGameDialog";
import Overlay from "./connect-4-ui/Overlay";
import SavedGame from "./connect-4-ui/SavedGame";
import { GameApi } from "./connect-4-ui/create-game-api";
import "./global.css";

const App = () => {
  const [activeGame, setActiveGame] = useState<{
    gameOverview: GameOverviewProps;
    board: BoardProps;
  }>();

  const savedGamesRef = useRef<Array<SavedGameType>>([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const gameApiRef = useRef<GameApi | undefined>(undefined);

  return (
    <>
      {showOverlay &&
        createPortal(
          <Overlay
            componentSpec={{
              Component: ({
                handleCloseDialog: onCloseDialogClick,
              }: {
                handleCloseDialog: () => void;
              }) => (
                <LoadGameDialog handleCloseDialog={onCloseDialogClick}>
                  {savedGamesRef.current.map((game: SavedGameType) => (
                    <SavedGame
                      key={game.gameId}
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
                handleCloseDialog: () => setShowOverlay(false),
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
