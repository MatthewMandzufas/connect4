import styled from "styled-components";

type PlayerOverviewProps = {
  playerNumber: 1 | 2;
  isActive: boolean;
  remainingDisks: number;
  playerDiskColor: string;
};

const Wrapper = styled.div`
  background-color: blue;
  display: flex;
  flex-direction: column;
  color: white;
  font-size: 1.2rem;
  padding-left: 10px;
  max-width: 50%;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const Token = styled.div<{ isActive: boolean; playerDiskColor: string }>`
  background-color: ${(props) =>
    props.isActive ? props.playerDiskColor : "initial"};
  border-radius: 50%;
  height: 30px;
  border: ${(props) => (props.isActive ? "3px white dashed" : "none")};
  width: 30px;
  margin-left: 20px;
`;

export const PlayerRoundOverview = ({
  playerNumber,
  isActive,
  remainingDisks,
  playerDiskColor,
}: PlayerOverviewProps) => (
  <Wrapper>
    <Row>
      <p>{`Player Number: ${playerNumber}`}</p>
      <Token isActive={isActive} playerDiskColor={playerDiskColor} />
    </Row>
    <p>{`Remaining Disks: ${remainingDisks}`}</p>
  </Wrapper>
);
