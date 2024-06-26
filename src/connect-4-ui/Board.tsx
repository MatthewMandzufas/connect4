import { BoardCell, BoardCellProps } from "@/connect-4-ui/BoardCell";
import createBoardCells from "@/connect-4-ui/create-board-cells";
import styled from "styled-components";

type ClickHandler = (row: number, column: number) => void;

export type BoardProps = {
  cells: Array<Array<BoardCellProps>>;
  playerOneColor?: string;
  playerTwoColor?: string;
  onClick?: ClickHandler;
};

type GridBoardCellProps = {
  row: number;
  column: number;
};

const StyledBoard = styled.div<BoardProps>`
  display: grid;
  grid-template-columns: ${({ cells }) => `repeat(${cells[0].length}, 1fr)`};
  grid-template-rows: ${({ cells }) => `repeat(${cells.length}, 1fr)`};
  width: min(80vh, 80vw);
  height: min(80vh, 80vw);
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
    onClick(row, column);
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
    <StyledBoard cells={cells}>
      {cells.map((row, rowIndex) => {
        return row.map((cell, columnIndex) => (
          <GridBoardCell
            onClick={createHandleBoardCellClick(
              { row: rowIndex, column: columnIndex },
              onClick
            )}
            player={cell.player}
            uuid={cell.uuid}
            key={cell.uuid}
            column={columnIndex + 1}
            row={rowIndex + 1}
            playerOneColor={playerOneColor}
            playerTwoColor={playerTwoColor}
          />
        ));
      })}
    </StyledBoard>
  );
};
