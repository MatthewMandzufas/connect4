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
  const upToThreeCellsBelowPlayerMove = board.slice(
    Math.max(playerMove.targetCell.row - 3, 0),
    playerMove.targetCell.row
  );
  if (upToThreeCellsBelowPlayerMove.length < 3) {
    return {
      isWin: false,
    };
  }
  const isWin = upToThreeCellsBelowPlayerMove.reduce(
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
  if (targetRow.length === 0) {
    return false;
  }
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

function getBLTRDiagonalCells(
  board: Board,
  playerMove: PlayerMove
): Array<BoardCell> {
  const {
    targetCell: { row, column },
  } = playerMove;

  const rowOffset = row - Math.min(row, column);
  const columnOffset = column - Math.min(row, column);

  let i = 0;
  const cells = [];
  do {
    if (row !== i + rowOffset) {
      cells.push(board[i + rowOffset][columnOffset + i]);
    }
    i++;
  } while (i + rowOffset < board.length && i + columnOffset < board[0].length);
  return cells.splice(
    Math.max(0, column - 3),
    Math.min(cells.length + 1, column + 3)
  );
}

function getBRTLDiagonalCells(
  board: Board,
  playerMove: PlayerMove
): Array<BoardCell> {
  const {
    targetCell: { row, column },
  } = playerMove;

  const columnOffset = column + Math.min(row, board[0].length - 1 - column);
  const rowOffset = row - Math.min(row, board[0].length - 1 - column);

  let i = 0;
  const cells = [];
  do {
    if (row !== i + rowOffset) {
      cells.push(board[i + rowOffset][columnOffset - i]);
    }
    i++;
  } while (i + rowOffset < board.length && columnOffset - i >= 0);

  return cells;
}

function isDiagonalWin(
  board: Board,
  playerMove: PlayerMove
): { isWin: boolean } {
  if (board.length < 4 || board[0].length < 4) {
    return {
      isWin: false,
    };
  }

  const isWin =
    getIsThreeActivePlayerTokensInARow(
      getBLTRDiagonalCells(board, playerMove),
      playerMove.player
    ) ||
    getIsThreeActivePlayerTokensInARow(
      getBRTLDiagonalCells(board, playerMove),
      playerMove.player
    );

  return {
    isWin,
  };
}

function getIsWinningMove(
  board: Board,
  playerMove: PlayerMove
): { isWin: boolean } {
  return {
    isWin:
      isVerticalWin(board, playerMove).isWin ||
      isHorizontalWin(board, playerMove).isWin ||
      isDiagonalWin(board, playerMove).isWin,
  };
}

export default getIsWinningMove;
