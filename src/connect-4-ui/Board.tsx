import { BoardCell, BoardCellProps } from "@/connect-4-ui/BoardCell";
import createBoardCells from "@/connect-4-ui/create-board-cells";
import styled from "styled-components";

type ClickHandler = ({ row, column }: GridBoardCellProps) => void;

export type BoardProps = {
  cells: Array<Array<BoardCellProps>>;
  playerOneColor?: string;
  playerTwoColor?: string;
  onClick?: ClickHandler;
};

export type GridBoardCellProps = {
  row: number;
  column: number;
};

const StyledBoard = styled.div<{ $cells: BoardProps["cells"] }>`
  display: grid;
  grid-template-columns: ${({ $cells }) => `repeat(${$cells[0].length}, 1fr)`};
  grid-template-rows: ${({ $cells }) => `repeat(${$cells.length}, 1fr)`};
  width: min(80vh, 80vw);
  height: min(80vh, 80vw);
  outline: solid 8px #142d4c;
`;

const GridBoardCell = styled(BoardCell)<GridBoardCellProps>`
  grid-column: ${(props) => props.column};
  grid-row: ${(props) => props.row};
`;

function createHandleBoardCellClick(
  { row, column }: GridBoardCellProps,
  onClick: ClickHandler
) {
  return function handleBoardCellClick() {
    onClick({ row, column });
  };
}

export const Board = (
  {
    cells = createBoardCells(6, 7),
    playerOneColor = "red",
    playerTwoColor = "yellow",
    onClick = () => {},
  }: BoardProps = {
    cells: createBoardCells(6, 7),
    playerOneColor: "red",
    playerTwoColor: "yellow",
    onClick: () => {},
  }
) => {
  return (
    <StyledBoard $cells={cells}>
      {cells.map((row, rowIndex) => {
        return row.map((cell, columnIndex) => (
          <GridBoardCell
            onClick={createHandleBoardCellClick(
              { row: rowIndex, column: columnIndex },
              onClick
            )}
            player={cell.player}
            uuid={cell.uuid}
            key={`${rowIndex}-${columnIndex}-${cell.uuid}`}
            column={columnIndex + 1}
            row={cells.length - rowIndex}
            playerOneColor={playerOneColor}
            playerTwoColor={playerTwoColor}
          />
        ));
      })}
    </StyledBoard>
  );
};
