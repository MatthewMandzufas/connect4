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

function getCellsToLeftOfTarget(board: Board, playerMove: PlayerMove) {
  const leftStartIndex = Math.max(playerMove.targetCell.column - 3, 0);
  return board[playerMove.targetCell.row].slice(
    leftStartIndex,
    playerMove.targetCell.column
  );
}

function getCellsToRightOfTarget(board: Board, playerMove: PlayerMove) {
  const rightEndIndex = Math.min(
    playerMove.targetCell.column + 3,
    board[0].length - 1
  );

  return board[playerMove.targetCell.row].slice(
    playerMove.targetCell.column + 1,
    rightEndIndex + 1
  );
}

function getIsCellOccupiedByPlayer(
  targetCell: BoardCell,
  currentPlayer: 1 | 2
): boolean {
  return targetCell.player === currentPlayer;
}

function getIsThreeActivePlayerTokensInARow(
  targetRow: Array<BoardCell>,
  player: 1 | 2
): boolean {
  let numberOfSuccessivePlayerCells = 0;
  let index = 0;
  do {
    if (getIsCellOccupiedByPlayer(targetRow[index], player)) {
      numberOfSuccessivePlayerCells++;
    } else {
      numberOfSuccessivePlayerCells = 0;
    }
    index++;
  } while (numberOfSuccessivePlayerCells !== 3 && index < targetRow.length);
  return numberOfSuccessivePlayerCells === 3;
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

  const leftCells = getCellsToLeftOfTarget(board, playerMove);
  const rightCells = getCellsToRightOfTarget(board, playerMove);
  const targetRow = [...leftCells, ...rightCells];
  const isWin = getIsThreeActivePlayerTokensInARow(
    targetRow,
    playerMove.player
  );

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
