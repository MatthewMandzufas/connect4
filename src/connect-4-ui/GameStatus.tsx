import { Status } from "@/connect-4-domain/game";
import styled from "styled-components";

export type GameStatusProps = {
  gameRunning: Status;
};

const StyledGameStatus = styled.div`
  background-color: blue;
  color: white;
  font-size: 2rem;
  text-align: center;
  padding: 10px 0px;
  border-radius: 0px 0px 20px 20px;
`;

export const GameStatus = ({ gameRunning }: GameStatusProps) => {
  let currentStatus = "In-Progress";
  switch (gameRunning) {
    case Status.DRAW:
      currentStatus = "Draw";
      break;
    case Status.PLAYER_ONE_WIN:
      currentStatus = "Player 1 has Won!";
      break;
    case Status.PLAYER_TWO_WIN:
      currentStatus = "Player 2 has Won!";
      break;
  }
  return <StyledGameStatus>{`Game Status: ${currentStatus}`}</StyledGameStatus>;
};

GameStatus.defaultProps = {
  gameRunning: Status.IN_PROGRESS,
};
