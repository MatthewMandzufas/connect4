import { describe, it, expect } from "vitest";
import createCells from "@/create-cells";

describe("create-cells", () => {
  it("returns a 0x0 board given defaults", () => {
    expect(createCells()).toEqual([]);
  });
  it("return a board filled with objects conforming to BoardCellProps type", () => {
    const board = createCells(2, 2);
    expect(board).toEqual([
      [{ player: undefined }, { player: undefined }],
      [{ player: undefined }, { player: undefined }],
    ]);
  });
  it("returns a row x column board given the number of rows and column", () => {
    const board = createCells(6, 10);

    expect(board.length).toEqual(6);
    expect(board[0].length).toEqual(10);
  });
});
