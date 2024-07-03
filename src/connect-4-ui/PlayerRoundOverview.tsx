import styled from "styled-components";

export type PlayerRoundOverviewProps = {
  playerNumber: 1 | 2;
  isActive: boolean;
  remainingDisks: number;
  playerDiskColor: string;
};

const Wrapper = styled.div`
  background-color: #2772db;
  display: flex;
  flex-direction: column;
  color: #f5ebeb;
  font-size: min(4vw, 1.2rem);
  padding: 0 10px 0 10px;
  flex: 1;
  align-items: center;
  font-family: monospace;
  outline: 6px solid #142d4c;
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

const Token = styled.div<{ $isActive: boolean; $playerDiskColor: string }>`
  background-color: ${({ $isActive, $playerDiskColor }) =>
    $isActive ? $playerDiskColor : "initial"};
  border-radius: 50%;
  height: 30px;
  min-width: 30px;
  outline: ${({ $isActive }) => ($isActive ? "3px #142d4c dashed" : "none")};
  width: 30px;
  margin-left: 20px;
`;

export const PlayerRoundOverview = ({
  playerNumber,
  isActive,
  remainingDisks,
  playerDiskColor,
}: PlayerRoundOverviewProps) => (
  <Wrapper>
    <AlignCenterRow>
      <Row>
        <p>{`Player Number: ${playerNumber}`}</p>
        <Token $isActive={isActive} $playerDiskColor={playerDiskColor} />
      </Row>
      <p>{`Remaining Disks: ${remainingDisks}`}</p>
    </AlignCenterRow>
  </Wrapper>
);
