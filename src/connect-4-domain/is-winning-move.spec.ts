import { BoardCell, PlayerMove } from "@/connect-4-domain/game";
import isWinningMove from "@/connect-4-domain/is-winning-move";
import { describe, expect, it } from "vitest";
import parseAsciiTable from "./parse-ascii-table";

const customResolver = (value: string): BoardCell => {
  const playerNumber = Number.parseInt(value);
  if (playerNumber === 1 || playerNumber === 2) {
    return {
      player: playerNumber,
    };
  }
  return {
    player: undefined,
  };
};

describe("is-winning-move", () => {
  describe("check horizontal wins", () => {
    describe("given a board and the next players move", () => {
      describe("and there are 3 active player tokens to the left of the target cell", () => {
        it("detects the win", () => {
          const asciiTable = `
|---|---|---|---|
| 1 | 1 | 1 |   |
|---|---|---|---|
| 2 | 2 | 2 |   |
|---|---|---|---|`;
          const board = parseAsciiTable(asciiTable, customResolver);

          const playerMove = {
            player: 1,
            targetCell: {
              row: 0,
              column: 3,
            },
          } as PlayerMove;

          expect(isWinningMove(board, playerMove)).toEqual(
            expect.objectContaining({
              isWin: true,
            })
          );
        });
      });

      describe("and there are less than 3 columns to the left of the target cell", () => {
        describe("and there are no player tokens to the right of the target cell", () => {
          it("does not detect a win", () => {
            const playerMove = {
              player: 1,
              targetCell: {
                row: 0,
                column: 1,
              },
            } as PlayerMove;
            const asciiTable = `
|---|---|---|---|
| 1 |   |   |   |
|---|---|---|---|
| 2 |   |   |   | 
|---|---|---|---|`;
            const board = parseAsciiTable(asciiTable, customResolver);
            expect(isWinningMove(board, playerMove)).toEqual(
              expect.objectContaining({ isWin: false })
            );
          });
        });
      });
      describe("and there are 3 of the active players tokens to the right of the target cell", () => {
        it("detects the win", () => {
          const table = `
|---|---|---|---|
|   | 1 | 1 | 1 | 
|---|---|---|---|
|   | 2 | 2 | 2 |
|---|---|---|---|`;
          const playerMove = {
            player: 1,
            targetCell: {
              row: 0,
              column: 0,
            },
          } as PlayerMove;
          const board = parseAsciiTable(table, customResolver);
          expect(isWinningMove(board, playerMove)).toEqual(
            expect.objectContaining({ isWin: true })
          );
        });
      });
      describe("and there are less than 3 columns to the right of the target cell", () => {
        it("does not detect the win", () => {
          const asciiTable = `
|---|---|---|---|
|   |   |   | 1 |
|---|---|---|---|
|   |   |   | 2 |
|---|---|---|---|`;
          const playerMove = {
            player: 1,
            targetCell: {
              row: 0,
              column: 2,
            },
          } as PlayerMove;

          const game = parseAsciiTable(asciiTable, customResolver);

          expect(isWinningMove(game, playerMove)).toEqual(
            expect.objectContaining({ isWin: false })
          );
        });
      });
      describe("and there are 2 tokens of the player to the left, and 1 to the right of the target cell", () => {
        it("detects the win", () => {
          const asciiTable = `
|---|---|---|---|
| 1 | 1 |   | 1 |
|---|---|---|---|
| 2 | 2 |   | 2 |
|---|---|---|---|`;
          const playerMove = {
            player: 1,
            targetCell: {
              row: 0,
              column: 2,
            },
          } as PlayerMove;
          const game = parseAsciiTable(asciiTable, customResolver);
          expect(isWinningMove(game, playerMove)).toEqual(
            expect.objectContaining({ isWin: true })
          );
        });
      });
      describe("and there are 1 tokens of the player to the left, and 2 to the right", () => {
        it("detects the win", () => {
          const asciiTable = `
|---|---|---|---|
| 1 |   | 1 | 1 |
|---|---|---|---|
| 2 |   | 2 | 2 |
|---|---|---|---|`;
          const playerMove = {
            player: 1,
            targetCell: {
              row: 0,
              column: 1,
            },
          } as PlayerMove;
          const game = parseAsciiTable(asciiTable, customResolver);
          expect(isWinningMove(game, playerMove)).toEqual(
            expect.objectContaining({ isWin: true })
          );
        });
      });
      describe("and there are 3 of the active players tokens in a row, not successive with the target cell", () => {
        it("does not detect the win", () => {
          const asciiTable = `
|---|---|---|---|---|---|---|
|   | 2 | 1 | 2 | 1 | 1 | 1 |
|---|---|---|---|---|---|---|
|   | 2 | 2 | 1 | 2 | 1 | 2 |
|---|---|---|---|---|---|---|
`;
          const playerMove = {
            player: 1,
            targetCell: {
              row: 0,
              column: 0,
            },
          } as PlayerMove;
          const board = parseAsciiTable(asciiTable, customResolver);
          expect(isWinningMove(board, playerMove)).toEqual(
            expect.objectContaining({
              isWin: false,
            })
          );
        });
      });
    });
  });
  describe("check vertical wins", () => {
    describe("given a board and the next players move", () => {
      it("detects the win", () => {
        const asciiTable = `
|---|---|
| 1 | 2 |
|---|---| 
| 1 | 2 |
|---|---| 
| 1 | 2 |
|---|---| 
|   |   |
|---|---|`;
        const board = parseAsciiTable(asciiTable, customResolver);
        const playerMove = {
          player: 1,
          targetCell: {
            row: 3,
            column: 0,
          },
        } as PlayerMove;
        expect(isWinningMove(board, playerMove)).toEqual(
          expect.objectContaining({
            isWin: true,
          })
        );
      });
      describe("and the column does not contain 3 moving player tokens, separated by an unoccupied cell", () => {
        it("does not detect the win", () => {
          const playerMove = {
            player: 1,
            targetCell: {
              row: 2,
              column: 0,
            },
          } as PlayerMove;
          const asciiTable = `
|---|
| 1 |
|---|
| 1 |
|---|
|   |
|---|
|   |
|---|
| 1 |
|---|`;
          const board = parseAsciiTable(asciiTable, customResolver);
          expect(isWinningMove(board, playerMove)).toEqual(
            expect.objectContaining({ isWin: false })
          );
        });
      });

      describe("and the winning column does not touch the board ceiling", () => {
        it("detects the win", () => {
          const playerMove = {
            player: 1,
            targetCell: {
              row: 3,
              column: 0,
            },
          } as PlayerMove;
          const asciiTable = `
|---|---|
| 1 | 2 |
|---|---|
| 1 | 2 |
|---|---|
| 1 | 2 |
|---|---|
|   |   |
|---|---|
|   |   |
|---|---|`;
          const board = parseAsciiTable(asciiTable, customResolver);
          expect(isWinningMove(board, playerMove)).toEqual(
            expect.objectContaining({
              isWin: true,
            })
          );
        });
      });
    });
  });
  describe("given a board with less than 4 rows", () => {
    describe("and the next players move", () => {
      it("does not result in a vertical win", () => {
        const playerMove = {
          player: 1,
          targetCell: {
            row: 2,
            column: 0,
          },
        } as PlayerMove;
        const asciiTable = `
|---|
| 1 |
|---|
| 2 |
|---|
|   |
|---|`;
        const board = parseAsciiTable(asciiTable, customResolver);
        expect(isWinningMove(board, playerMove)).toEqual(
          expect.objectContaining({
            isWin: false,
          })
        );
      });
    });
  });
  describe("check diagonal wins", () => {
    describe("that is bottom-left to top-right", () => {
      describe("given the board and the next players move", () => {
        describe("and the target cell is at the top right of 3 successive active player cells", () => {
          it.skip("detects the win", () => {
            const playerMove = {
              player: 1,
              targetCell: {
                row: 3,
                column: 3,
              },
            } as PlayerMove;

            const asciiTable = `
|---|---|---|---|
| 1 |   |   |   |
|---|---|---|---|
|   | 1 |   |   |
|---|---|---|---|
|   |   | 1 |   |
|---|---|---|---|
|   |   |   |   |
|---|---|---|---|`;
            const board = parseAsciiTable(asciiTable, customResolver);
            expect(isWinningMove(board, playerMove)).toEqual(
              expect.objectContaining({
                isWin: true,
              })
            );
          });
        });
      });
    });
    describe.todo("that is top-left to bottom-right", () => {});
  });
});
