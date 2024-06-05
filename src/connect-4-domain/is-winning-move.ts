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

function getIsLeftSideHorizontalWin(
  board: Board,
  playerMove: PlayerMove
): boolean {
  if (playerMove.targetCell.column < 3) {
    return false;
  }

  const targetRow = board[playerMove.targetCell.row];
  const targetColumn = playerMove.targetCell.column;
  const player = playerMove.player;
  const isWin =
    targetRow[targetColumn - 1].player === player &&
    targetRow[targetColumn - 2].player === player &&
    targetRow[targetColumn - 3].player === player;

  return isWin;
}

function getIsRightSideHorizontalWin(
  board: Board,
  playerMove: PlayerMove
): boolean {
  if (board[0].length - playerMove.targetCell.column < 4) {
    return false;
  }
  const targetRow = board[playerMove.targetCell.row];
  const targetColumn = playerMove.targetCell.column;
  const player = playerMove.player;
  const isWin =
    targetRow[targetColumn + 1].player === player &&
    targetRow[targetColumn + 2].player === player &&
    targetRow[targetColumn + 3].player === player;
  return isWin;
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
  const isWin =
    getIsLeftSideHorizontalWin(board, playerMove) ||
    getIsRightSideHorizontalWin(board, playerMove);

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
