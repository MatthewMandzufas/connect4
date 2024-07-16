import {
  Board,
  BoardCell,
  PersistentGame,
  Status,
} from "@/connect-4-domain/game";
import MongoDBRepository from "@/connect-4-domain/mongodb-repository";

import { v4 } from "uuid";
import { describe, expect, it } from "vitest";
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

describe("in-memory-repository", () => {
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
    it.skip("returns undefined when loading a non-existant game", async () => {
      const repository = new MongoDBRepository();
      const gameId = v4();
      expect(await repository.load(gameId)).toBe(undefined);
    });
  });
  //   describe("given a store", () => {
  //     it.skip("saves a game", async () => {
  //       const store = new Map();
  //       const repository = new MongoDBRepository(store);
  //       const persistentGame = createPersistentGame();
  //       const boardId = await repository.save(persistentGame);
  //       expect(store.get(boardId)).toMatchObject(persistentGame);
  //     });
  //     it.skip("saves the game with a user-provided uuid", () => {
  //       const store = new Map();
  //       const repository = new MongoDBRepository(store);
  //       const persistentGame = createPersistentGame();
  //       const uuid = v4();
  //       const boardId = repository.save(persistentGame, uuid);
  //       expect(uuid).toBe(boardId);
  //       expect(store.get(boardId)).toMatchObject(persistentGame);
  //     });
  //     it.skip("loads a saved game", () => {
  //       const store = new Map();
  //       const repository = new MongoDBRepository(store);
  //       const persistentGame = createPersistentGame();
  //       const boardId = repository.save(persistentGame);
  //       expect(repository.load(boardId)).toMatchObject(persistentGame);
  //     });
  //   });
});
