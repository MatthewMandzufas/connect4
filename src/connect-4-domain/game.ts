import deepClone from "@/connect-4-domain/deep-clone";

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

class GameFactory implements Game {
  private board: Board;
  private players: Record<1 | 2, PlayerStats>;

  constructor(
    { boardDimensions }: GameParameters = {
      boardDimensions: { rows: 6, columns: 7 },
    }
  ) {
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
    const startingDisks = (boardDimensions.rows * boardDimensions.columns) / 2;
    this.players = this.#createPlayers(startingDisks);
    this.board = this.#createBoard(boardDimensions);
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
}

export default GameFactory;
