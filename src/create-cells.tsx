import { BoardCell, BoardCellProps } from "@/BoardCell";

const createCells = (
  rows: number,
  columns: number
): Array<Array<BoardCellProps>> => {
  if (rows === undefined && columns === undefined) return [];

  let cells: Array<Array<BoardCellProps>> = [];

  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    let row: Array<BoardCellProps> = [];

    for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
      row = [...row, BoardCell.player];
    }
    cells = [...cells, row];
  }
  return cells;
};

export default createCells;
