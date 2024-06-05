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

function isWinningMove(
  board: Board,
  playerMove: PlayerMove
): { isWin: boolean } {
  return isVerticalWin(board, playerMove);
}

export default isWinningMove;
