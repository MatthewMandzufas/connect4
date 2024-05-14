export type BoardCell = {
  player: 1 | 2 | undefined;
};

type GameParameters = {
  boardDimensions: { rows: number; columns: number };
};

interface Game {
  getBoard: () => Array<Array<BoardCell>>;
}

class GameFactory implements Game {
  private board: Array<Array<BoardCell>>;

  constructor(
    { boardDimensions }: GameParameters = {
      boardDimensions: { rows: 6, columns: 7 },
    }
  ) {
    this.board = this.#createBoard(boardDimensions);
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
}

export default GameFactory;
