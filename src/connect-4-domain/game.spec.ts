import { createMovePlayerCommand } from "@/connect-4-domain/commands";
import GameFactory, {
  BoardCell,
  InvalidBoardDimensions,
} from "@/connect-4-domain/game";
import _toAsciiTable from "@/connect-4-domain/to-ascii-table";
import { describe, expect, it } from "vitest";

function toAsciiTable(board: Array<Array<BoardCell>>): string {
  const cellResolver = (cell: BoardCell) =>
    cell.player === undefined ? "" : `${cell.player}`;
  return _toAsciiTable(board, cellResolver);
}

describe("game", () => {
  describe("new game", () => {
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
    it("changes made to the game do not affect copies of the board", () => {
      const game = new GameFactory();
      const board = game.getBoard();
      expect(toAsciiTable(board)).toMatchInlineSnapshot(`
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
      const movePlayerCommand = createMovePlayerCommand({
        player: 1,
        targetCell: {
          row: 0,
          column: 0,
        },
      });
      game.move(movePlayerCommand);
      expect(toAsciiTable(board)).toMatchInlineSnapshot(`
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
      const boardAfterMove = game.getBoard();
      expect(toAsciiTable(boardAfterMove)).toMatchInlineSnapshot(`
        "
        |---|--|--|--|--|--|--|
        | 1 |  |  |  |  |  |  |
        |---|--|--|--|--|--|--|
        |   |  |  |  |  |  |  |
        |---|--|--|--|--|--|--|
        |   |  |  |  |  |  |  |
        |---|--|--|--|--|--|--|
        |   |  |  |  |  |  |  |
        |---|--|--|--|--|--|--|
        |   |  |  |  |  |  |  |
        |---|--|--|--|--|--|--|
        |   |  |  |  |  |  |  |
        |---|--|--|--|--|--|--|"
      `);
      expect(boardAfterMove).toBeDeeplyUnequal(board);
    });
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
    });
    describe("given custom board dimensions", () => {
      describe("with 0 rows", () => {
        it("throws an error", () => {
          expect(
            () =>
              new GameFactory({
                boardDimensions: { rows: 0, columns: 7 },
              })
          ).toThrow(
            new InvalidBoardDimensions(
              "The number of rows, must be greater than or equal to 1"
            )
          );
        });
      });
      describe("with 0 columns", () => {
        it("throws an error", () => {
          expect(
            () =>
              new GameFactory({
                boardDimensions: { rows: 6, columns: 0 },
              })
          ).toThrow(
            new InvalidBoardDimensions(
              "The number of columns, must be greater than or equal to 1"
            )
          );
        });
      });
      describe("with a negative number of columns", () => {
        it("throws an error", () => {
          expect(
            () =>
              new GameFactory({
                boardDimensions: { rows: 1, columns: -7 },
              })
          ).toThrow(
            new InvalidBoardDimensions(
              "The number of columns, must be greater than or equal to 1"
            )
          );
        });
      });
      describe("with a negative number of rows", () => {
        it("throws an error", () => {
          expect(
            () =>
              new GameFactory({
                boardDimensions: { rows: -1, columns: 7 },
              })
          ).toThrow(
            new InvalidBoardDimensions(
              "The number of rows, must be greater than or equal to 1"
            )
          );
        });
      });
      describe("which result in an odd number of cells", () => {
        it("should throw an error", () => {
          expect(
            () =>
              new GameFactory({
                boardDimensions: { rows: 1, columns: 7 },
              })
          ).toThrow(
            new InvalidBoardDimensions(
              "The board must have an even number of cells. Supplied board dimensions: Rows: 1, Columns: 7. This results in an odd number of cells (7)"
            )
          );
        });
      });
      describe("which results in an even number of cells", () => {
        it("returns an instance of game", () => {
          const game = new GameFactory({
            boardDimensions: { rows: 6, columns: 10 },
          });

          expect(toAsciiTable(game.getBoard())).toMatchInlineSnapshot(`
            "
            |--|--|--|--|--|--|--|--|--|--|
            |  |  |  |  |  |  |  |  |  |  |
            |--|--|--|--|--|--|--|--|--|--|
            |  |  |  |  |  |  |  |  |  |  |
            |--|--|--|--|--|--|--|--|--|--|
            |  |  |  |  |  |  |  |  |  |  |
            |--|--|--|--|--|--|--|--|--|--|
            |  |  |  |  |  |  |  |  |  |  |
            |--|--|--|--|--|--|--|--|--|--|
            |  |  |  |  |  |  |  |  |  |  |
            |--|--|--|--|--|--|--|--|--|--|
            |  |  |  |  |  |  |  |  |  |  |
            |--|--|--|--|--|--|--|--|--|--|"
          `);
        });
      });
    });
    it("returns the currently active player", () => {
      const game = new GameFactory();
      expect(game.getActivePlayer()).toBe(1);
    });
  });
  describe("making a move", () => {
    describe("given a player is currently active", () => {
      describe("and a cell location that is not on the board", () => {
        it("the player is unable to move to a cell, below the first row", () => {
          const game = new GameFactory({
            boardDimensions: { rows: 2, columns: 2 },
          });
          expect(toAsciiTable(game.getBoard())).toMatchInlineSnapshot(`
            "
            |--|--|
            |  |  |
            |--|--|
            |  |  |
            |--|--|"
          `);
          expect(game.getActivePlayer()).toBe(1);
          const movePlayerCommand = createMovePlayerCommand({
            player: 1,
            targetCell: { row: -1, column: 0 },
          });
          const event = game.move(movePlayerCommand);
          expect(event).toEqual({
            type: "PLAYER_MOVE_FAILED",
            payload: {
              message:
                "Cell at Row: -1, Column: 0 does not exist on the board. The row number must be  >= 0 and <= 1",
            },
          });
          expect(toAsciiTable(game.getBoard())).toMatchInlineSnapshot(`
            "
            |--|--|
            |  |  |
            |--|--|
            |  |  |
            |--|--|"
          `);
          expect(game.getActivePlayer()).toBe(1);
        });
        it("the player is unable to move to a cell, above the last row", () => {
          const game = new GameFactory({
            boardDimensions: { rows: 2, columns: 2 },
          });
          expect(game.getActivePlayer()).toBe(1);
          expect(toAsciiTable(game.getBoard())).toMatchInlineSnapshot(`
            "
            |--|--|
            |  |  |
            |--|--|
            |  |  |
            |--|--|"
          `);
          const movePlayerCommand = createMovePlayerCommand({
            player: 1,
            targetCell: { row: 2, column: 0 },
          });
          const event = game.move(movePlayerCommand);
          expect(event).toEqual({
            type: "PLAYER_MOVE_FAILED",
            payload: {
              message:
                "Cell at Row: 2, Column: 0 does not exist on the board. The row number must be  >= 0 and <= 1",
            },
          });
          expect(toAsciiTable(game.getBoard())).toMatchInlineSnapshot(`
            "
            |--|--|
            |  |  |
            |--|--|
            |  |  |
            |--|--|"
          `);
          expect(game.getActivePlayer()).toBe(1);
        });

        it("the player is unable to move to a cell, left of the first column", () => {
          const game = new GameFactory({
            boardDimensions: { rows: 2, columns: 2 },
          });
          expect(toAsciiTable(game.getBoard())).toMatchInlineSnapshot(`
            "
            |--|--|
            |  |  |
            |--|--|
            |  |  |
            |--|--|"
          `);
          expect(game.getActivePlayer()).toBe(1);
          const movePlayerCommand = createMovePlayerCommand({
            player: 1,
            targetCell: { row: 0, column: -1 },
          });
          const event = game.move(movePlayerCommand);
          expect(event).toEqual({
            type: "PLAYER_MOVE_FAILED",
            payload: {
              message:
                "Cell at Row: 0, Column: -1 does not exist on the board. The column number must be  >= 0 and <= 1",
            },
          });
          expect(game.getActivePlayer()).toBe(1);
          expect(toAsciiTable(game.getBoard())).toMatchInlineSnapshot(`
            "
            |--|--|
            |  |  |
            |--|--|
            |  |  |
            |--|--|"
          `);
        });
        it("the player is unable to move to a cell, right of the last column", () => {
          const game = new GameFactory({
            boardDimensions: { rows: 2, columns: 2 },
          });
          expect(toAsciiTable(game.getBoard())).toMatchInlineSnapshot(`
            "
            |--|--|
            |  |  |
            |--|--|
            |  |  |
            |--|--|"
          `);
          expect(game.getActivePlayer()).toBe(1);
          const movePlayerCommand = createMovePlayerCommand({
            player: 1,
            targetCell: { row: 0, column: 2 },
          });
          const event = game.move(movePlayerCommand);
          expect(event).toEqual({
            type: "PLAYER_MOVE_FAILED",
            payload: {
              message:
                "Cell at Row: 0, Column: 2 does not exist on the board. The column number must be  >= 0 and <= 1",
            },
          });
          expect(toAsciiTable(game.getBoard())).toMatchInlineSnapshot(`
            "
            |--|--|
            |  |  |
            |--|--|
            |  |  |
            |--|--|"
          `);
          expect(game.getActivePlayer()).toBe(1);
        });
        it("the player is unable to move to a cell, where both the row and column are out of bounds", () => {
          const game = new GameFactory({
            boardDimensions: { rows: 2, columns: 3 },
          });
          expect(toAsciiTable(game.getBoard())).toMatchInlineSnapshot(`
            "
            |--|--|--|
            |  |  |  |
            |--|--|--|
            |  |  |  |
            |--|--|--|"
          `);
          expect(game.getActivePlayer()).toBe(1);
          const movePlayerCommand = createMovePlayerCommand({
            player: 1,
            targetCell: { row: -1, column: -5 },
          });
          const event = game.move(movePlayerCommand);
          expect(event).toEqual({
            type: "PLAYER_MOVE_FAILED",
            payload: {
              message:
                "Cell at Row: -1, Column: -5 does not exist on the board. The row number must be >= 0 and <= 1, and the column number must be >= 0 and <= 2",
            },
          });
          expect(toAsciiTable(game.getBoard())).toMatchInlineSnapshot(`
            "
            |--|--|--|
            |  |  |  |
            |--|--|--|
            |  |  |  |
            |--|--|--|"
          `);
          expect(game.getActivePlayer()).toBe(1);
        });
      });
      describe("and the cell is on the first row", () => {
        describe("and the cell is un-occupied", () => {
          it("the player should be able to move a disk into the cell", () => {
            const game = new GameFactory({
              boardDimensions: { rows: 1, columns: 2 },
            });
            expect(toAsciiTable(game.getBoard())).toMatchInlineSnapshot(`
              "
              |--|--|
              |  |  |
              |--|--|"
            `);
            expect(game.getActivePlayer()).toBe(1);
            const movePlayerCommand = createMovePlayerCommand({
              player: 1,
              targetCell: {
                row: 0,
                column: 0,
              },
            });
            const playerMovedEvent = game.move(movePlayerCommand);
            expect(playerMovedEvent).toEqual({
              type: "PLAYER_MOVED",
              payload: {
                player: 1,
                targetCell: {
                  row: 0,
                  column: 0,
                },
              },
            });
            expect(toAsciiTable(game.getBoard())).toMatchInlineSnapshot(`
              "
              |---|--|
              | 1 |  |
              |---|--|"
            `);
            expect(game.getActivePlayer()).toBe(2);
          });
        });
        describe("and the cell is occupied", () => {
          it("the player should not be able to move a disk into the cell", () => {
            const game = new GameFactory({
              boardDimensions: { rows: 1, columns: 2 },
            });
            expect(game.getActivePlayer()).toBe(1);
            const movePlayerCommand = createMovePlayerCommand({
              player: 1,
              targetCell: {
                row: 0,
                column: 0,
              },
            });
            const playerMovedEvent = game.move(movePlayerCommand);
            expect(playerMovedEvent).toEqual({
              type: "PLAYER_MOVED",
              payload: {
                player: 1,
                targetCell: {
                  row: 0,
                  column: 0,
                },
              },
            });
            expect(toAsciiTable(game.getBoard())).toMatchInlineSnapshot(`
              "
              |---|--|
              | 1 |  |
              |---|--|"
            `);
            expect(game.getActivePlayer()).toBe(2);
            const secondMovePlayerCommand = createMovePlayerCommand({
              player: 2,
              targetCell: {
                row: 0,
                column: 0,
              },
            });
            const secondPlayerMovedEvent = game.move(secondMovePlayerCommand);
            expect(secondPlayerMovedEvent).toEqual({
              type: "PLAYER_MOVE_FAILED",
              payload: {
                message:
                  "The cell at Row: 0, Column: 0 is already occupied. Choose another cell.",
              },
            });
            expect(toAsciiTable(game.getBoard())).toMatchInlineSnapshot(`
              "
              |---|--|
              | 1 |  |
              |---|--|"
            `);
          });
        });
      });
      describe("and the cell is on the second row", () => {
        describe("and the cell below is occupied", () => {
          it("the play can place a disk into the cell", () => {
            const game = new GameFactory({
              boardDimensions: { rows: 2, columns: 2 },
            });
            expect(toAsciiTable(game.getBoard())).toMatchInlineSnapshot(`
              "
              |--|--|
              |  |  |
              |--|--|
              |  |  |
              |--|--|"
            `);
            const playerMovedCommand = createMovePlayerCommand({
              player: 1,
              targetCell: {
                row: 0,
                column: 0,
              },
            });
            game.move(playerMovedCommand);
            const secondPlayerMovedCommand = createMovePlayerCommand({
              player: 2,
              targetCell: {
                row: 1,
                column: 0,
              },
            });
            game.move(secondPlayerMovedCommand);
            expect(toAsciiTable(game.getBoard())).toMatchInlineSnapshot(`
              "
              |---|--|
              | 1 |  |
              |---|--|
              | 2 |  |
              |---|--|"
            `);
          });
        });
        describe("and the cell below is not occupied", () => {
          it("The player should not be able to move a disk into the cell", () => {
            const game = new GameFactory({
              boardDimensions: { rows: 2, columns: 2 },
            });
            const playerMovedCommand = createMovePlayerCommand({
              player: 1,
              targetCell: {
                row: 1,
                column: 0,
              },
            });
            const playerMovedEvent = game.move(playerMovedCommand);
            expect(playerMovedEvent).toEqual({
              type: "PLAYER_MOVE_FAILED",
              payload: {
                message:
                  "The cell at Row: 1, Column: 0 has no cell below it. You cannot place a token here.",
              },
            });
            expect(toAsciiTable(game.getBoard())).toMatchInlineSnapshot(`
              "
              |--|--|
              |  |  |
              |--|--|
              |  |  |
              |--|--|"
            `);
          });
        });
      });
    });
    describe("given a player is not currently active", () => {
      it("the inactive player should not be able to place a token", () => {
        const game = new GameFactory({
          boardDimensions: {
            rows: 2,
            columns: 2,
          },
        });
        expect(game.getActivePlayer()).toBe(1);
        const playerMovedCommand = createMovePlayerCommand({
          player: 2,
          targetCell: {
            row: 0,
            column: 0,
          },
        });
        const playerMovedEvent = game.move(playerMovedCommand);
        expect(playerMovedEvent).toEqual({
          type: "PLAYER_MOVE_FAILED",
          payload: {
            message: "It is not player 2's turn. Please wait for your turn.",
          },
        });
        expect(toAsciiTable(game.getBoard())).toMatchInlineSnapshot(`
          "
          |--|--|
          |  |  |
          |--|--|
          |  |  |
          |--|--|"
        `);
        expect(game.getActivePlayer()).toBe(1);
      });
    });
  });
  describe("getting the status of a game", () => {
    describe("given a player has not yet won", () => {
      it("reports the status as in progress", () => {
        const game = new GameFactory();
        const gameStatus = game.getStatus();
        expect(gameStatus).toEqual("IN_PROGRESS");
      });
    });
  });
});
