import { Status } from "@/connect-4-ui/create-game-api";
import styled from "styled-components";

export type GameStatusProps = {
  gameRunning: Status;
};

const StyledGameStatus = styled.div`
  background-color: #2772db;
  color: #f5ebeb;
  font-size: min(4vw, 2rem);
  text-align: center;
  padding: 10px 0px;
  border-radius: 0px 0px 20px 20px;
  font-family: monospace;
  outline: 6px solid #d5eeff;
  width: min(60vh, 60vw);
  height: min(6vh, 6vw);
`;

export const GameStatus = ({ gameRunning }: GameStatusProps) => {
  let currentStatus = "In-Progress";
  switch (gameRunning) {
    case Status.DRAW:
      currentStatus = "Draw";
      break;
    case Status.PLAYER_ONE_WIN:
      currentStatus = "Player 1 Won!";
      break;
    case Status.PLAYER_TWO_WIN:
      currentStatus = "Player 2 Won!";
      break;
  }
  return <StyledGameStatus>{`Game Status: ${currentStatus}`}</StyledGameStatus>;
};

GameStatus.defaultProps = {
  gameRunning: Status.IN_PROGRESS,
};
