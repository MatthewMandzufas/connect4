import { MovePlayerCommand } from "@/connect-4-domain/commands";
import deepClone from "@/connect-4-domain/deep-clone";
import {
  PlayerMoveFailedEvent,
  PlayerMovedEvent,
  createPlayerMoveFailedEvent,
  createPlayerMovedEvent,
} from "@/connect-4-domain/events";

import getIsWinningMove from "@/connect-4-domain/get-is-winning-move";

export class InvalidBoardDimensions extends RangeError {}

export type BoardCell = {
  player: 1 | 2 | undefined;
};

export type GameParameters = {
  boardDimensions: BoardDimension;
};

export type BoardDimension = {
  rows: number;
  columns: number;
};

interface PlayerStats {
  playerNumber: 1 | 2;
  remainingDisks: number;
}

type PlayerNumber = 1 | 2;

export type PlayerMove = {
  player: 1 | 2;
  targetCell: {
    row: number;
    column: number;
  };
};
export type Board = Array<Array<BoardCell>>;

interface Game {
  getBoard: () => Board;
  getPlayerStats: (playerNumber: PlayerNumber) => PlayerStats;
  getActivePlayer: () => PlayerNumber;
  getStatus: () => Status;
  move: (
    movePlayerCommand: MovePlayerCommand
  ) => PlayerMoveFailedEvent | PlayerMovedEvent;
}

type ValidationResult = {
  isValid: boolean;
  message: string;
};

enum Status {
  IN_PROGRESS = "IN_PROGRESS",
  PLAYER_ONE_WIN = "PLAYER_ONE_WIN",
}

class GameFactory implements Game {
  private board: Board;
  private players: Record<1 | 2, PlayerStats>;
  private activePlayer: 1 | 2;
  private status: Status;

  constructor(
    { boardDimensions }: GameParameters = {
      boardDimensions: { rows: 6, columns: 7 },
    }
  ) {
    this.#validateBoard(boardDimensions);
    const startingDisks = (boardDimensions.rows * boardDimensions.columns) / 2;
    this.players = this.#createPlayers(startingDisks);
    this.board = this.#createBoard(boardDimensions);
    this.activePlayer = 1;
    this.status = Status.IN_PROGRESS;
  }

  #validateBoard(boardDimensions: BoardDimension) {
    if (boardDimensions.rows < 1) {
      throw new InvalidBoardDimensions(
        "The number of rows, must be greater than or equal to 1"
      );
    } else if (boardDimensions.columns < 1) {
      throw new InvalidBoardDimensions(
        "The number of columns, must be greater than or equal to 1"
      );
    } else if ((boardDimensions.rows * boardDimensions.columns) % 2 !== 0) {
      throw new InvalidBoardDimensions(
        `The board must have an even number of cells. Supplied board dimensions: Rows: ${boardDimensions.rows}, Columns: ${boardDimensions.columns}. This results in an odd number of cells (${boardDimensions.rows * boardDimensions.columns})`
      );
    }
  }

  #createPlayers(startingDisks: number): Record<1 | 2, PlayerStats> {
    return {
      1: {
        playerNumber: 1,
        remainingDisks: startingDisks,
      },
      2: {
        playerNumber: 2,
        remainingDisks: startingDisks,
      },
    };
  }

  #createBoard(boardDimensions: { rows: number; columns: number }): Board {
    const board = new Array(boardDimensions.rows).fill(undefined).map(() =>
      new Array(boardDimensions.columns).fill(undefined).map(() => {
        return { player: undefined };
      })
    );
    return board;
  }

  getBoard() {
    return deepClone(this.board);
  }

  getPlayerStats(playerNumber: 1 | 2): PlayerStats {
    return this.players[playerNumber];
  }

  getActivePlayer(): PlayerNumber {
    return this.activePlayer;
  }

  #getIsRowOnBoard(row: number): boolean {
    return row < 0 || row > this.board.length - 1;
  }

  #getIsColumnOnBoard(column: number): boolean {
    return column < 0 || column > this.board[0].length - 1;
  }

  #getIsMoveOnBoard(row: number, column: number): boolean {
    return this.#getIsColumnOnBoard(column) && this.#getIsRowOnBoard(row);
  }

  #getIsCellOccupied(row: number, column: number): boolean {
    return this.board[row][column].player !== undefined;
  }

  #getIsFirstRowOrCellBelowIsUnoccupied(row: number, column: number): boolean {
    return row === 0 || this.board[row - 1][column].player === undefined;
  }

  private validateMove(movePlayerCommand: MovePlayerCommand): ValidationResult {
    const {
      payload: {
        player,
        targetCell: { row, column },
      },
    } = movePlayerCommand;

    let message = "";
    let isValid = false;
    if (player !== this.getActivePlayer()) {
      return {
        isValid: false,
        message: `It is not player ${player}'s turn. Please wait for your turn.`,
      };
    }
    if (this.#getIsMoveOnBoard(row, column)) {
      message = `Cell at Row: ${row}, Column: ${column} does not exist on the board. The row number must be >= 0 and <= ${this.board.length - 1}, and the column number must be >= 0 and <= ${this.board[0].length - 1}`;
    } else if (this.#getIsRowOnBoard(row)) {
      message = `Cell at Row: ${row}, Column: ${column} does not exist on the board. The row number must be  >= 0 and <= ${this.board.length - 1}`;
    } else if (this.#getIsColumnOnBoard(column)) {
      message = `Cell at Row: ${row}, Column: ${column} does not exist on the board. The column number must be  >= 0 and <= ${this.board[0].length - 1}`;
    } else {
      const isFirstRow = row === 0;
      if (this.#getIsCellOccupied(row, column)) {
        message = `The cell at Row: ${row}, Column: ${column} is already occupied. Choose another cell.`;
      } else if (isFirstRow) {
        isValid = true;
      } else if (this.#getIsFirstRowOrCellBelowIsUnoccupied(row, column)) {
        message = `The cell at Row: ${row}, Column: ${column} has no cell below it. You cannot place a token here.`;
      } else {
        isValid = true;
      }
    }
    return {
      isValid,
      message,
    };
  }

  private createValidatedMove = (
    moveFunction: (movePlayerCommand: MovePlayerCommand) => PlayerMovedEvent
  ): ((
    movePlayerCommand: MovePlayerCommand
  ) => PlayerMoveFailedEvent | PlayerMovedEvent) => {
    return (
      movePlayerCommand: MovePlayerCommand
    ): PlayerMoveFailedEvent | PlayerMovedEvent => {
      const { isValid, message } = this.validateMove(movePlayerCommand);

      return isValid
        ? moveFunction(movePlayerCommand)
        : createPlayerMoveFailedEvent({ message });
    };
  };

  move = this.createValidatedMove(this._move.bind(this));

  getStatus(): Status {
    return this.status;
  }

  private _move({
    payload: {
      player,
      targetCell: { row, column },
    },
  }: MovePlayerCommand): PlayerMovedEvent {
    const isWinningMove = getIsWinningMove(this.getBoard(), {
      player,
      targetCell: { row, column },
    });
    this.board[row][column].player = player;
    this.activePlayer = this.activePlayer === 1 ? 2 : 1;

    if (isWinningMove) {
      this.status = Status.PLAYER_ONE_WIN;
    }

    return createPlayerMovedEvent({ player, targetCell: { row, column } });
  }
}

export default GameFactory;
