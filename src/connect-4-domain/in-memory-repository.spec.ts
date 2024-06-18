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

describe("in-memory-repository", () => {
  describe("given defaults", () => {
    it("creates an in memory repository", () => {
      const repository = new InMemoryRepository();
      expect(repository).toBeInstanceOf(InMemoryRepository);
    });
    it("it loads a previously saved game", () => {
      const repository = new InMemoryRepository();
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
      const boardId = repository.save2(persistentGame);
      expect(repository.load(boardId)).toMatchObject(persistentGame);
    });
    it("returns undefined when loading a non-existant board", () => {
      const repository = new InMemoryRepository();
      const boardId = crypto.randomUUID();
      expect(repository.load(boardId)).toBe(undefined);
    });
  });
  describe("given a store", () => {
    it("saves a board", () => {
      const store = new Map();
      const repository = new InMemoryRepository(store);
      const asciiTable = `
      |---|---|---|---|
      |   |   |   |   | 
      |---|---|---|---|`;
      const board: Board = parseAsciiTable(asciiTable, customResolver);
      const boardId = repository.save(board);
      expect(store.get(boardId)).toBe(board);
    });
    it("saves the board with a user-provided uuid", () => {
      const store = new Map();
      const repository = new InMemoryRepository(store);
      const asciiTable = `
      |---|---|---|---|
      |   |   |   |   | 
      |---|---|---|---|`;
      const board = parseAsciiTable(asciiTable, customResolver);
      const uuid = crypto.randomUUID();
      const boardId = repository.save(board, uuid);
      expect(uuid).toBe(boardId);
      expect(store.get(boardId)).toBe(board);
    });
    it("loads a saved board", () => {
      const store = new Map();
      const repository = new InMemoryRepository(store);
      const asciiTable = `
        |---|---|---|---|
        |   |   |   |   | 
        |---|---|---|---|`;
      const board: Board = parseAsciiTable(asciiTable, customResolver);
      const boardId = repository.save(board);
      expect(repository.load(boardId)).toBe(board);
    });
  });
});
