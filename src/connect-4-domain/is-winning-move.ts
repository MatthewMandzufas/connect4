import { Board, BoardCell, PlayerMove } from "@/connect-4-domain/game";

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
  const targetRow = board[playerMove.targetCell.row].filter(
    (cell, currentIndex) => currentIndex !== playerMove.targetCell.column
  );

  let isWin = false;
  for (let i = 0; i < targetRow.length - 1; i++) {
    if (i + 2 < targetRow.length) {
      if (
        playerMove.player === targetRow[i].player &&
        playerMove.player === targetRow[i + 1].player &&
        playerMove.player === targetRow[i + 2].player
      ) {
        isWin = true;
      }
    }
  }

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
