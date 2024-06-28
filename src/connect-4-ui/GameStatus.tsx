import styled from "styled-components";

export type GameStatusProps = {
  gameRunning: boolean;
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
  return (
    <StyledGameStatus>{`Game Status: ${gameRunning === true ? "In-Progress" : "Complete"}`}</StyledGameStatus>
  );
};

GameStatus.defaultProps = {
  gameRunning: false,
};
