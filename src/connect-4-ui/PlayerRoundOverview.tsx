import styled from "styled-components";

export type PlayerRoundOverviewProps = {
  playerNumber: 1 | 2;
  isActive: boolean;
  remainingDisks: number;
  playerDiskColor: string;
};

const Wrapper = styled.div<{ playerNumber: 1 | 2 }>`
  background-color: blue;
  display: flex;
  flex-direction: column;
  color: white;
  font-size: 1.2rem;
  padding: 0 10px 0 10px;
  flex: 1;
  align-items: center;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding-right: 10px;
`;

const AlignCenterRow = styled.div`
  flex: 1;
`;

const Token = styled.div<{ isActive: boolean; playerDiskColor: string }>`
  background-color: ${({ isActive, playerDiskColor }) =>
    isActive ? playerDiskColor : "initial"};
  border-radius: 50%;
  height: 30px;
  min-width: 30px;
  outline: ${({ isActive }) => (isActive ? "3px white dashed" : "none")};
  width: 30px;
  margin-left: 20px;
`;

export const PlayerRoundOverview = ({
  playerNumber,
  isActive,
  remainingDisks,
  playerDiskColor,
}: PlayerRoundOverviewProps) => (
  <Wrapper playerNumber={playerNumber}>
    <AlignCenterRow>
      <Row>
        <p>{`Player Number: ${playerNumber}`}</p>
        <Token isActive={isActive} playerDiskColor={playerDiskColor} />
      </Row>
      <p>{`Remaining Disks: ${remainingDisks}`}</p>
    </AlignCenterRow>
  </Wrapper>
);