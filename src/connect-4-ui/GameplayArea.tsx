import { Board, BoardProps, GridBoardCellProps } from "@/connect-4-ui/Board";
import GameOverview, { GameOverviewProps } from "@/connect-4-ui/GameOverview";
import styled from "styled-components";
import GamePlayAreaMenu from "./GamePlayAreaMenu";
import MenuButton from "./MenuButton";

export type GameUuid = `${string}-${string}-${string}-${string}-${string}`;

export type GameplayAreaProps = {
  activeGame?: {
    gameOverview: GameOverviewProps;
    board: BoardProps;
  };
  onStartGameClick?: () => void;
  onBoardCellClick?: ({ row, column }: GridBoardCellProps) => void;
  onSaveGameClick?: () => void;
  onLoadGameClick?: () => void;
  onRestartGameClick?: () => void;
};

const StyledGameplayArea = styled.div<{
  $activeGame?: GameplayAreaProps["activeGame"];
}>`
  display: flex;
  justify-content: ${({ $activeGame }) =>
    $activeGame === undefined ? "center" : "space-evenly"};
  min-height: 100vh;
  align-items: center;
  /* background-color: #070f4e; */
  background: linear-gradient(
    112.1deg,
    rgb(32, 38, 57) 11.4%,
    rgb(63, 76, 119) 70.2%
  );
  flex-wrap: wrap;
`;

const StyledButton = styled.button`
  padding: 20px 30px;
  font-family: monospace;
  font-size: 2rem;
  background-color: beige;
  outline: 8px solid #142d4c;
`;

const StyledHeader = styled.h1`
  color: beige;
  font-size: 128px;
  font-family: monospace;
`;

const StyledStartGameArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const GameplayArea = ({
  activeGame,
  onStartGameClick = () => {},
  onBoardCellClick = () => {},
  onSaveGameClick = () => {},
  onLoadGameClick = () => {},
  onRestartGameClick = () => {},
}: GameplayAreaProps) => {
  return (
    <>
      <GamePlayAreaMenu>
        <MenuButton text={"Restart Game"} onClick={onRestartGameClick} />
        <MenuButton text={"Save Game"} onClick={onSaveGameClick} />
        <MenuButton text={"Load A Game"} onClick={onLoadGameClick} />
      </GamePlayAreaMenu>
      <StyledGameplayArea $activeGame={activeGame}>
        {activeGame ? (
          <>
            <GameOverview {...activeGame.gameOverview} />
            <Board {...activeGame.board} onBoardCellClick={onBoardCellClick} />
          </>
        ) : (
          <>
            <StyledStartGameArea>
              <StyledHeader>Connect4</StyledHeader>
              <StyledButton onClick={onStartGameClick}>Start Game</StyledButton>
            </StyledStartGameArea>
          </>
        )}
      </StyledGameplayArea>
    </>
  );
};
