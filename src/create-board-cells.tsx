import { BoardCellProps } from "@/BoardCell";

const createBoardCells = (
  rows: number = 0,
  columns: number = 0
): Array<Array<BoardCellProps>> => {
  const cells: Array<Array<BoardCellProps>> = [];

  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    cells[rowIndex] = [];
    for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
      cells[rowIndex][columnIndex] = {
        player: undefined,
      };
    }
  }
  return cells;
};

export default createBoardCells;
