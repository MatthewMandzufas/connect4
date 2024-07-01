import { Board, BoardProps } from "@/connect-4-ui/Board";
import GameOverview, { GameOverviewProps } from "@/connect-4-ui/GameOverview";
import styled from "styled-components";

export type GameplayAreaProps = {
  activeGame?: {
    gameOverview: GameOverviewProps;
    board: BoardProps;
  };
  onStartGameClick?: () => void;
};

const StyledGameplayArea = styled.div<{
  $activeGame?: GameplayAreaProps["activeGame"];
}>`
  display: flex;
  justify-content: ${({ $activeGame }) =>
    $activeGame === undefined ? "center" : "space-evenly"};
  height: 100vh;
  align-items: center;
  background-color: aquamarine;
  flex-wrap: wrap;
`;

const StyledButton = styled.button`
  padding: 20px 10px;
  font-family: monospace;
  font-size: 2rem;
  background-color: beige;
`;

export const GameplayArea = ({
  activeGame,
  onStartGameClick,
}: GameplayAreaProps) => {
  return (
    <>
      <StyledGameplayArea $activeGame={activeGame}>
        {activeGame ? (
          <>
            <GameOverview {...activeGame.gameOverview} />
            <Board {...activeGame.board} />
          </>
        ) : (
          <StyledButton onClick={onStartGameClick}>Start Game</StyledButton>
        )}
      </StyledGameplayArea>
    </>
  );
};
