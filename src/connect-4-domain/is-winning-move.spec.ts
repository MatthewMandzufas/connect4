import { expect, describe, it } from "vitest";
import parseAsciiTable from "./parse-ascii-table";
import isWinningMove from "@/connect-4-domain/is-winning-move";
import { BoardCell, PlayerMove } from "@/connect-4-domain/game";

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
  describe("given a board and the next players move", () => {
    describe("results in a vertical win", () => {
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
    });
    describe("and there are less than 4 rows on the board", () => {
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
    describe("and the winning column does not touch the board ceiling", () => {
      describe("and the players move results in a vertical win", () => {
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
});