import styled from "styled-components";

export type BoardCellProps = {
  className?: string;
  player?: 1 | 2;
};

const StyledBoardCell = styled.div`
  height: 60px;
  width: 60px;
  background: blue;
`;

const StyledBoardDiskCutout = styled.div<{ $player?: 1 | 2 }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: relative;
  background: ${({ $player }) => {
    switch ($player) {
      case 1:
        return "red";
      case 2:
        return "yellow";
      default:
        return "white";
    }
  }};
  top: 5px;
  left: 5px;
`;

export const BoardCell = ({ player, className }: BoardCellProps) => (
  <StyledBoardCell className={className}>
    <StyledBoardDiskCutout $player={player} />
  </StyledBoardCell>
);
