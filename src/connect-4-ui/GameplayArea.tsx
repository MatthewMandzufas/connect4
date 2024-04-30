import styled from "styled-components";
import GameOverview, { GameOverviewProps } from "@/connect-4-ui/GameOverview";
import { Board, BoardProps } from "@/connect-4-ui/Board";

type GameplayAreaProps = {
  activeGame?: {
    gameOverview: GameOverviewProps;
    board: BoardProps;
  };
};

const StyledGameplayArea = styled.div<GameplayAreaProps>`
  display: flex;
  justify-content: ${({ activeGame }) =>
    activeGame === undefined ? "center" : "space-evenly"};
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

export const GameplayArea = ({ activeGame }: GameplayAreaProps) => {
  const { gameOverview, board } = activeGame || {};

  return (
    <>
      <StyledGameplayArea activeGame={activeGame}>
        {activeGame ? (
          <>
            <GameOverview {...gameOverview} />
            <Board {...board} />
          </>
        ) : (
          <StyledButton>Start Game</StyledButton>
        )}
      </StyledGameplayArea>
    </>
  );
};
