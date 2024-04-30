import styled from "styled-components";

export type BoardCellProps = {
  className?: string;
  player?: 1 | 2;
  uuid: string;
  playerOneColor?: string;
  playerTwoColor?: string;
};

const StyledBoardCell = styled.div`
  height: 60px;
  width: 60px;
  background: blue;
`;

const StyledBoardDiskCutout = styled.div<{
  $player?: 1 | 2;
  $playerOneColor?: string;
  $playerTwoColor?: string;
}>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: relative;
  background: ${({ $player, $playerOneColor, $playerTwoColor }) => {
    switch ($player) {
      case 1:
        return $playerOneColor;
      case 2:
        return $playerTwoColor;
      default:
        return "white";
    }
  }};
  top: 5px;
  left: 5px;
`;

export const BoardCell = ({
  player,
  className,
  playerOneColor,
  playerTwoColor,
}: BoardCellProps) => (
  <StyledBoardCell className={className}>
    <StyledBoardDiskCutout
      $player={player}
      $playerOneColor={playerOneColor}
      $playerTwoColor={playerTwoColor}
    />
  </StyledBoardCell>
);

BoardCell.defaultProps = {
  playerOneColor: "red",
  playerTwoColor: "yellow",
};
