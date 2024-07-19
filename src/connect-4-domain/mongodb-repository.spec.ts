import {
  Board,
  BoardCell,
  PersistentGame,
  Status,
} from "@/connect-4-domain/game";
import "dotenv/config";
import { connect, connection, Model, model } from "mongoose";
import { v4 } from "uuid";
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from "vitest";
import MongoDBRepository, {
  GameDocument,
  gameSchema,
} from "./mongodb-repository";
import parseAsciiTable from "./parse-ascii-table";

const customResolver = (value: string): BoardCell => {
  const playerNumber = Number.parseInt(value);
  if (playerNumber === 1 || playerNumber === 2) {
    return {
      player: playerNumber,
    };
  }
  return {
    player: undefined,
  };
};

function createPersistentGame() {
  const asciiTable = `
      |---|---|---|---|
      |   |   |   |   | 
      |---|---|---|---|`;
  const board: Board = parseAsciiTable(asciiTable, customResolver);
  const persistentGame: PersistentGame = {
    board,
    activePlayer: 1,
    players: {
      1: { playerNumber: 1, remainingDisks: 2 },
      2: { playerNumber: 2, remainingDisks: 2 },
    },
    status: "IN_PROGRESS" as Status,
  };
  return persistentGame;
}

beforeAll(async () => {
  if (connection.readyState === 0) {
    await connect(import.meta.env.VITE_MONGODB_URI);
  }
});

afterAll(async () => {
  await connection.close();
});

describe("mongodb-repository", () => {
  describe("given defaults", () => {
    it("creates an in memory repository", () => {
      const repository = new MongoDBRepository();
      expect(repository).toBeInstanceOf(MongoDBRepository);
    });
    it("it loads a previously saved game", async () => {
      const repository = new MongoDBRepository();
      const persistentGame = createPersistentGame();
      const boardId = await repository.save(persistentGame);
      expect(await repository.load(boardId)).toMatchObject(persistentGame);
    });
    it("returns undefined when loading a non-existant game", async () => {
      const repository = new MongoDBRepository();
      const gameId = v4();
      expect(await repository.load(gameId)).toBe(undefined);
    });
  });
  describe("given a store", () => {
    let gameModel: Model<GameDocument>;
    let repository: MongoDBRepository;

    beforeEach(async () => {
      gameModel = model<GameDocument>("Game", gameSchema);
      repository = new MongoDBRepository(gameModel);
    });

    afterEach(async () => {
      await connection.db.dropDatabase();
    });

    it("saves a game", async () => {
      const persistentGame = createPersistentGame();
      const boardId = await repository.save(persistentGame);
      const gameToLoad = await gameModel.findOne({ gameUuid: boardId });
      const expectedGame =
        gameToLoad !== null
          ? {
              board: gameToLoad.board,
              activePlayer: gameToLoad.activePlayer,
              players: gameToLoad.players,
              status: gameToLoad.status,
            }
          : undefined;
      expect(expectedGame).toMatchObject(persistentGame);
    });
    it("saves the game with a user-provided uuid", async () => {
      const persistentGame = createPersistentGame();
      const uuid = v4();
      const boardId = await repository.save(persistentGame, uuid);
      expect(uuid).toBe(boardId);
      const gameToLoad = await gameModel.findOne({ gameUuid: boardId });
      const expectedGame =
        gameToLoad !== null
          ? {
              board: gameToLoad.board,
              activePlayer: gameToLoad.activePlayer,
              players: gameToLoad.players,
              status: gameToLoad.status,
            }
          : undefined;
      expect(expectedGame).toMatchObject(persistentGame);
    });
    it("loads a saved game", async () => {
      const persistentGame = createPersistentGame();
      const boardId = await repository.save(persistentGame);
      expect(await repository.load(boardId)).toMatchObject(persistentGame);
    });
  });
});
