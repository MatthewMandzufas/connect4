import { describe, it, expect } from "vitest";
import createBoardCells from "./create-board-cells";

describe("create-cells", () => {
  it("returns a 0x0 board given defaults", () => {
    expect(createBoardCells()).toEqual([]);
  });
  it("return a board filled with objects conforming to BoardCellProps type", () => {
    const board = createBoardCells(2, 2);

    expect(board).toEqual([
      [
        expect.objectContaining({
          player: undefined,
          uuid: expect.toBeUUID(),
        }),
        expect.objectContaining({
          player: undefined,
          uuid: expect.toBeUUID(),
        }),
      ],
      [
        expect.objectContaining({
          player: undefined,
          uuid: expect.toBeUUID(),
        }),
        expect.objectContaining({
          player: undefined,
          uuid: expect.toBeUUID(),
        }),
      ],
    ]);
  });
  it("returns a row x column board given the number of rows and column", () => {
    const board = createBoardCells(6, 10);

    expect(board.length).toEqual(6);
    expect(board[0].length).toEqual(10);
  });
  describe("given rows, columns and a player selection strategy", () => {
    describe("that always selects player 1", () => {
      it("creates a row x column board filled with player 1 tokens", () => {
        const playerOneSelectionStrategy: () => 1 | 2 | undefined = () => 1;
        const board = createBoardCells(2, 2, playerOneSelectionStrategy);
        expect(board).toEqual([
          [
            expect.objectContaining({
              player: 1,
              uuid: expect.toBeUUID(),
            }),
            expect.objectContaining({
              player: 1,
              uuid: expect.toBeUUID(),
            }),
          ],
          [
            expect.objectContaining({
              player: 1,
              uuid: expect.toBeUUID(),
            }),
            expect.objectContaining({
              player: 1,
              uuid: expect.toBeUUID(),
            }),
          ],
        ]);
      });
    });
  });
});
