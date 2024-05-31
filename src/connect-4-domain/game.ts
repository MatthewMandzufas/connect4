import deepClone from "@/connect-4-domain/deep-clone";
import { MovePlayerCommand } from "@/connect-4-domain/commands";
import {
  PlayerMoveFailedEvent,
  PlayerMovedEvent,
  createPlayerMoveFailedEvent,
  createPlayerMovedEvent,
} from "@/connect-4-domain/events";

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

type Board = Array<Array<BoardCell>>;

interface Game {
  getBoard: () => Board;
}

type ValidationResult = {
  isValid: boolean;
  message: string;
};

class GameFactory implements Game {
  private board: Board;
  private players: Record<1 | 2, PlayerStats>;
  private activePlayer: 1 | 2;

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

  getActivePlayer(): number {
    return this.activePlayer;
  }

  private validateMove(movePlayerCommand: MovePlayerCommand): ValidationResult {
    const {
      payload: {
        player,
        targetCell: { row, column },
      },
    } = movePlayerCommand;

    let message;
    let isValid;
    if (player !== this.getActivePlayer()) {
      return {
        isValid: false,
        message: `It is not player ${player}'s turn. Please wait for your turn.`,
      };
    }
    if (
      (row < 0 || row > this.board.length - 1) &&
      (column < 0 || column > this.board[0].length - 1)
    ) {
      isValid = false;
      message = `Cell at Row: ${row}, Column: ${column} does not exist on the board. The row number must be >= 0 and <= ${this.board.length - 1}, and the column number must be >= 0 and <= ${this.board[0].length - 1}`;
    } else if (row < 0 || row > this.board.length - 1) {
      isValid = false;
      message = `Cell at Row: ${row}, Column: ${column} does not exist on the board. The row number must be  >= 0 and <= ${this.board.length - 1}`;
    } else if (column < 0 || column > this.board[0].length - 1) {
      isValid = false;
      message = `Cell at Row: ${row}, Column: ${column} does not exist on the board. The column number must be  >= 0 and <= ${this.board[0].length - 1}`;
    } else {
      const isCellOccupied = this.board[row][column].player !== undefined;
      const isFirstRow = row === 0;
      const isFirstRowOrCellBelowUnoccupied =
        isFirstRow || this.board[row - 1][column].player === undefined;
      if (isCellOccupied) {
        isValid = false;
        message = `The cell at Row: ${row}, Column: ${column} is already occupied. Choose another cell.`;
      } else if (isFirstRow) {
        isValid = true;
        message = "";
      } else if (isFirstRowOrCellBelowUnoccupied) {
        isValid = false;
        message = `The cell at Row: ${row}, Column: ${column} has no cell below it. You cannot place a token here.`;
      } else {
        isValid = true;
        message = "";
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

  private _move({
    payload: {
      player,
      targetCell: { row, column },
    },
  }: MovePlayerCommand): PlayerMovedEvent {
    this.board[row][column].player = player;
    this.activePlayer = this.activePlayer === 1 ? 2 : 1;

    return createPlayerMovedEvent({ player, targetCell: { row, column } });
  }
}

export default GameFactory;
