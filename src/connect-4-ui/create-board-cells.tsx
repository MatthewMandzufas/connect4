import { BoardCell } from "./create-game-api";

const createBoardCells = (
  rows: number = 0,
  columns: number = 0,
  selectionStrategy: () => 1 | 2 | undefined = () => undefined
): Array<Array<BoardCell>> => {
  const cells: Array<Array<BoardCell>> = [];

  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    cells[rowIndex] = [];
    for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
      cells[rowIndex][columnIndex] = {
        player: selectionStrategy(),
        uuid: crypto.randomUUID(),
        // TODO: Ensure this did not break anything :)
        handlePlayerMove: () => ({
          isSuccess: false,
        }),
      };
    }
  }
  return cells;
};

export default createBoardCells;
