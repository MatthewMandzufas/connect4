import { MovePlayerCommand } from "@/connect-4-domain/commands";
import deepClone from "@/connect-4-domain/deep-clone";
import {
  PlayerMoveFailedEvent,
  PlayerMovedEvent,
  createPlayerMoveFailedEvent,
  createPlayerMovedEvent,
} from "@/connect-4-domain/events";

import getIsWinningMove from "@/connect-4-domain/get-is-winning-move";
import InMemoryRepository, {
  GameUuid,
} from "@/connect-4-domain/in-memory-repository";

export class InvalidBoardDimensions extends RangeError {}

export interface GameRepository {
  save: (persistentGame: PersistentGame, uuid?: GameUuid) => GameUuid;
  load: (gameUuid: GameUuid) => undefined | PersistentGame;
}

export type BoardCell = {
  player: 1 | 2 | undefined;
};

export type GameParameters = {
  boardDimensions?: BoardDimension;
  repository?: GameRepository;
};

export type BoardDimension = {
  rows: number;
  columns: number;
};

interface PlayerStats {
  playerNumber: 1 | 2;
  remainingDisks: number;
}

export type PersistentGame = {
  board: Board;
  activePlayer: PlayerNumber;
  players: Record<PlayerNumber, PlayerStats>;
  status: Status;
};

export type PlayerNumber = 1 | 2;

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
  load: (gameId: GameUuid) => void;
  save: () => GameUuid;
  reset: (boardDimensions: { rows: number; columns: number }) => void;
}

type ValidationResult = {
  isValid: boolean;
  message: string;
};

export enum Status {
  IN_PROGRESS = "IN_PROGRESS",
  PLAYER_ONE_WIN = "PLAYER_ONE_WIN",
  PLAYER_TWO_WIN = "PLAYER_TWO_WIN",
  DRAW = "DRAW",
}

class GameFactory implements Game {
  private board: Board;
  private players: Record<1 | 2, PlayerStats>;
  private activePlayer: 1 | 2;
  private status: Status;
  private repository: GameRepository;
  private boardDimensions: {
    rows: number;
    columns: number;
  };

  constructor(
    {
      boardDimensions = { rows: 6, columns: 7 },
      repository = new InMemoryRepository(),
    }: GameParameters = {
      boardDimensions: { rows: 6, columns: 7 },
      repository: new InMemoryRepository(),
    }
  ) {
    this.#validateBoard(boardDimensions);
    this.boardDimensions = {
      rows: boardDimensions.rows,
      columns: boardDimensions.columns,
    };
    const startingDisks = (boardDimensions.rows * boardDimensions.columns) / 2;
    this.players = this.#createPlayers(startingDisks);
    this.board = this.#createBoard(boardDimensions);
    this.activePlayer = 1;
    this.status = Status.IN_PROGRESS;
    this.repository = repository;
  }

  save(): GameUuid {
    const gameUuid = crypto.randomUUID();
    this.repository.save(
      {
        board: this.getBoard(),
        activePlayer: this.activePlayer,
        players: this.players,
        status: this.status,
      },
      gameUuid
    );
    return gameUuid;
  }

  load(gameId: GameUuid) {
    const gameStateToLoad = this.repository?.load(gameId);
    if (gameStateToLoad !== undefined) {
      const { board, activePlayer, players, status } = gameStateToLoad;
      this.board = board;
      this.activePlayer = activePlayer;
      this.players = players;
      this.status = status;
    } else {
      throw new Error("The provided GameUuid was invalid.");
    }
  }

  reset() {
    const { rows, columns } = this.boardDimensions;
    const startingDisks = (rows * columns) / 2;
    this.players = this.#createPlayers(startingDisks);
    this.board = this.#createBoard({ rows, columns });
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
    if (
      this.getStatus() === Status.PLAYER_ONE_WIN ||
      this.getStatus() === Status.PLAYER_TWO_WIN
    ) {
      return {
        isValid: false,
        message: "The game has already been won.",
      };
    } else if (this.getStatus() === Status.DRAW) {
      return {
        isValid: false,
        message: "The game has already resulted in a draw.",
      };
    }
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
    }).isWin;
    this.board[row][column].player = player;
    this.activePlayer = this.activePlayer === 1 ? 2 : 1;
    this.players[player].remainingDisks =
      this.players[player].remainingDisks - 1;

    if (isWinningMove) {
      this.status =
        player === 1 ? Status.PLAYER_ONE_WIN : Status.PLAYER_TWO_WIN;
    } else if (
      this.getPlayerStats(player).remainingDisks === 0 &&
      this.getPlayerStats(player === 1 ? 2 : 1).remainingDisks === 0
    ) {
      this.status = Status.DRAW;
    }
    return createPlayerMovedEvent({ player, targetCell: { row, column } });
  }
}

export default GameFactory;
