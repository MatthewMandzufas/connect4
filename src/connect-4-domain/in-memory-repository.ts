import { Board, GameRepository } from "@/connect-4-domain/game";

export type BoardUuid = `${string}-${string}-${string}-${string}-${string}`;

type BoardMap = Map<BoardUuid, Board>;

export default class InMemoryRepository implements GameRepository {
  private store: BoardMap;

  constructor(store: BoardMap = new Map<BoardUuid, Board>()) {
    this.store = store;
  }

  save(board: Board, uuid: BoardUuid = crypto.randomUUID()): BoardUuid {
    this.store.set(uuid, board);
    return uuid;
  }

  load(boardId: BoardUuid): Board | undefined {
    return this.store.get(boardId);
  }
}
