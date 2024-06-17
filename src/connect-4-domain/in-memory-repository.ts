import { Board } from "@/connect-4-domain/game";

type BoardUuid = `${string}-${string}-${string}-${string}-${string}`;

type BoardMap = Map<BoardUuid, Board>;

interface GameRepository {
  save: (board: Board) => BoardUuid;
}

export default class InMemoryRepository implements GameRepository {
  private store: BoardMap;

  constructor(store: BoardMap = new Map<BoardUuid, Board>()) {
    this.store = store;
  }

  save(board: Board): BoardUuid {
    const boardId = crypto.randomUUID();
    this.store.set(boardId, board);
    return boardId;
  }
}
