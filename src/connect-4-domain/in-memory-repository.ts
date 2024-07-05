import { GameRepository, PersistentGame } from "@/connect-4-domain/game";
import { v4 } from "uuid";

export type GameUuid = string;

type BoardMap = Map<GameUuid, PersistentGame>;

export default class InMemoryRepository implements GameRepository {
  private store: BoardMap;

  constructor(store: BoardMap = new Map<GameUuid, PersistentGame>()) {
    this.store = store;
  }

  save(persistentGame: PersistentGame, uuid: GameUuid = v4()): GameUuid {
    this.store.set(uuid, persistentGame);
    return uuid;
  }

  load(gameId: GameUuid): undefined | PersistentGame {
    return this.store.get(gameId);
  }
}
