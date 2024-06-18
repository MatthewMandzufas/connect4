import {
  Board,
  BoardCell,
  PersistentGame,
  Status,
} from "@/connect-4-domain/game";
import InMemoryRepository from "@/connect-4-domain/in-memory-repository";
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
      const repository = new InMemoryRepository();
      expect(repository).toBeInstanceOf(InMemoryRepository);
    });
    it("it loads a previously saved game", () => {
      const repository = new InMemoryRepository();
      const persistentGame = createPersistentGame();
      const boardId = repository.save2(persistentGame);
      expect(repository.load(boardId)).toMatchObject(persistentGame);
    });
    it("returns undefined when loading a non-existant game", () => {
      const repository = new InMemoryRepository();
      const gameId = crypto.randomUUID();
      expect(repository.load(gameId)).toBe(undefined);
    });
  });
  describe("given a store", () => {
    it("saves a game", () => {
      const store = new Map();
      const repository = new InMemoryRepository(store);
      const persistentGame = createPersistentGame();
      const boardId = repository.save2(persistentGame);
      expect(store.get(boardId)).toMatchObject(persistentGame);
    });
    it("saves the game with a user-provided uuid", () => {
      const store = new Map();
      const repository = new InMemoryRepository(store);
      const persistentGame = createPersistentGame();
      const uuid = crypto.randomUUID();
      const boardId = repository.save2(persistentGame, uuid);
      expect(uuid).toBe(boardId);
      expect(store.get(boardId)).toMatchObject(persistentGame);
    });
    it("loads a saved game", () => {
      const store = new Map();
      const repository = new InMemoryRepository(store);
      const persistentGame = createPersistentGame();
      const boardId = repository.save2(persistentGame);
      expect(repository.load(boardId)).toMatchObject(persistentGame);
    });
  });
});
