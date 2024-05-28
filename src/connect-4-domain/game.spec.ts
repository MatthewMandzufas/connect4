import { describe, expect, it } from "vitest";
import GameFactory, { BoardCell } from "@/connect-4-domain/game";
import _toAsciiTable from "@/connect-4-domain/to-ascii-table";

function toAsciiTable(board: Array<Array<BoardCell>>): string {
  const cellResolver = (cell: BoardCell) =>
    cell.player === undefined ? "" : `${cell.player}`;
  return _toAsciiTable(board, cellResolver);
}

describe("game", () => {
  describe("new game", () => {
    describe("given defaults", () => {
      it("returns an instance of Game", () => {
        const game = new GameFactory();
        expect(game).toBeInstanceOf(GameFactory);
      });
      it("creates an empty 6x7 game board", () => {
        const game = new GameFactory();
        const board = game.getBoard();
        const asciiTable = toAsciiTable(board);

        expect(asciiTable).toMatchInlineSnapshot(`
          "
          |--|--|--|--|--|--|--|
          |  |  |  |  |  |  |  |
          |--|--|--|--|--|--|--|
          |  |  |  |  |  |  |  |
          |--|--|--|--|--|--|--|
          |  |  |  |  |  |  |  |
          |--|--|--|--|--|--|--|
          |  |  |  |  |  |  |  |
          |--|--|--|--|--|--|--|
          |  |  |  |  |  |  |  |
          |--|--|--|--|--|--|--|
          |  |  |  |  |  |  |  |
          |--|--|--|--|--|--|--|"
        `);
      });
      it("creates a game where player 1 starts with a number of tokens, equal to half the number of cells", () => {
        const game = new GameFactory();
        expect(game.getPlayerStats(1)).toEqual(
          expect.objectContaining({
            remainingDisks: 21,
            playerNumber: 1,
          })
        );
      });
      it("creates a game where player 2 starts with a number of tokens, equal to half the number of cells", () => {
        const game = new GameFactory();
        expect(game.getPlayerStats(2)).toEqual(
          expect.objectContaining({
            remainingDisks: 21,
            playerNumber: 2,
          })
        );
      });
      it("returns a deep copy of the board", () => {
        const game = new GameFactory();
        const firstBoard = game.getBoard();
        const secondBoard = game.getBoard();
        expect(secondBoard).toBeDeeplyUnequal(firstBoard);
      });
      it.todo(
        "changes made to the game do not affect copies of the board",
        () => {}
      );
    });
  });
});
