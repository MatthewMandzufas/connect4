import styled from "styled-components";

export type BoardCellProps = {
  className?: string;
  player?: 1 | 2;
  uuid: string;
  playerOneColor?: string;
  playerTwoColor?: string;
};

const StyledBoardCell = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: blue;
`;

const AspectRatioBox = styled.div`
  width: 65%;
  position: relative;

  &:before {
    content: "";
    display: block;
    padding-top: 100%;
  }
`;

const ContentWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const StyledBoardDiskCutout = styled.div<{
  $player?: 1 | 2;
  $playerOneColor?: string;
  $playerTwoColor?: string;
}>`
  height: 100%;
  width: 100%;
  border-radius: 50%;
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
`;

export const BoardCell = ({
  player,
  className,
  playerOneColor,
  playerTwoColor,
}: BoardCellProps) => (
  <StyledBoardCell className={className}>
    <AspectRatioBox>
      <ContentWrapper>
        <StyledBoardDiskCutout
          $player={player}
          $playerOneColor={playerOneColor}
          $playerTwoColor={playerTwoColor}
        />
      </ContentWrapper>
    </AspectRatioBox>
  </StyledBoardCell>
);

BoardCell.defaultProps = {
  playerOneColor: "red",
  playerTwoColor: "yellow",
};
