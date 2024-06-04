import { Board, BoardCell, PlayerMove } from "@/connect-4-domain/game";

function isVerticalWin(
  board: Board,
  playerMove: PlayerMove
): { isWin: boolean } {
  const isWin = board.reduce(
    (
      isWinningMove: boolean,
      currentRow: BoardCell[],
      currentRowIndex: number
    ): boolean => {
      if (playerMove.targetCell.row === currentRowIndex) {
        return isWinningMove;
      }
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
