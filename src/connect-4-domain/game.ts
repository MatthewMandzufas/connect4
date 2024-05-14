export type BoardCell = {
  player: 1 | 2 | undefined;
};

type GameParameters = {
  boardDimensions: { rows: number; columns: number };
};

interface PlayerStats {
  playerNumber: 1 | 2;
  remainingDisks: number;
}

interface Game {
  getBoard: () => Array<Array<BoardCell>>;
}

class GameFactory implements Game {
  private board: Array<Array<BoardCell>>;
  private players: Record<1 | 2, PlayerStats>;

  constructor(
    { boardDimensions }: GameParameters = {
      boardDimensions: { rows: 6, columns: 7 },
    }
  ) {
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

  #createBoard(boardDimensions: {
    rows: number;
    columns: number;
  }): Array<Array<BoardCell>> {
    const board = new Array(boardDimensions.rows).fill(undefined).map(() =>
      new Array(boardDimensions.columns).fill(undefined).map(() => {
        return { player: undefined };
      })
    );
    return board;
  }

  getBoard() {
    return this.board;
  }

  getPlayerStats(playerNumber: 1 | 2): PlayerStats {
    return this.players[playerNumber];
  }
}

export default GameFactory;
