import { Board, BoardCell, PlayerMove } from "@/connect-4-domain/game";

type CellPlayerNumber = 1 | 2 | undefined;

function isVerticalWin(
  board: Board,
  playerMove: PlayerMove
): { isWin: boolean } {
  if (board.length < 4) {
    return {
      isWin: false,
    };
  }
  const threeCellsBelowPlayerMove = board.slice(
    playerMove.targetCell.row - 4,
    playerMove.targetCell.row - 1
  );
  const isWin = threeCellsBelowPlayerMove.reduce(
    (isWinningMove: boolean, currentRow: BoardCell[]): boolean => {
      return (
        currentRow[playerMove.targetCell.column].player === playerMove.player &&
        isWinningMove
      );
    },
    true
  );

  return {
    isWin,
  };
}

function isHorizontalWin(
  board: Board,
  playerMove: PlayerMove
): { isWin: boolean } {
  if (board[0].length < 4) {
    return {
      isWin: false,
    };
  }
  const player = playerMove.player;

  const targetRow = board[playerMove.targetCell.row].reduce(
    (
      accumulator: Array<CellPlayerNumber>,
      currentCell: BoardCell,
      currentIndex: number
    ): Array<CellPlayerNumber> => {
      if (currentIndex !== playerMove.targetCell.column) {
        if (Math.abs(currentIndex - playerMove.targetCell.column) < 4)
          accumulator.push(currentCell.player);
      }
      return accumulator;
    },
    []
  );
  const threeInARow = new RegExp(`${player}${player}${player}`);
  const isWin = threeInARow.test(targetRow.join(""));
  return {
    isWin,
  };
}

function isWinningMove(
  board: Board,
  playerMove: PlayerMove
): { isWin: boolean } {
  let isWin = false;
  if (isVerticalWin(board, playerMove).isWin) {
    isWin = true;
  } else if (isHorizontalWin(board, playerMove).isWin) {
    isWin = true;
  }
  return {
    isWin,
  };
}

export default isWinningMove;
