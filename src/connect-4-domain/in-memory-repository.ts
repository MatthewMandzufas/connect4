import { GameRepository, PersistentGame } from "@/connect-4-domain/game";

export type GameUuid = `${string}-${string}-${string}-${string}-${string}`;

type BoardMap = Map<GameUuid, PersistentGame>;

export default class InMemoryRepository implements GameRepository {
  private store: BoardMap;

  constructor(store: BoardMap = new Map<GameUuid, PersistentGame>()) {
    this.store = store;
  }

  save(
    persistentGame: PersistentGame,
    uuid: GameUuid = crypto.randomUUID()
  ): GameUuid {
    this.store.set(uuid, persistentGame);
    return uuid;
  }

  load(gameId: GameUuid): undefined | PersistentGame {
    return this.store.get(gameId);
  }
}
