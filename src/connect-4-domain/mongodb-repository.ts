import SavedGame from "@/connect-4-ui/SavedGame";
import { model, Schema } from "mongoose";
import "reflect-metadata";
import { v4 } from "uuid";
import * as game from "./game";
import { PersistentGame } from "./game";
import { GameUuid } from "./in-memory-repository";

interface SavedGame {
  id: GameUuid;
  board: game.Board;
  activePlayer: game.PlayerNumber;
  players: game.PlayerStats;
  status: game.Status;
}

const gameSchema = new Schema<SavedGame>({
  id: { type: String, required: true },
  board: Array<Array<game.BoardCell>>,
  activePlayer: { type: Number, required: true },
  players: {
    type: { playerNumber: Number, remainingDisks: Number },
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const Game = model<SavedGame>("Game", gameSchema);

export default class MongoDBRepository {
  constructor() {}

  async save(
    persistentGame: game.PersistentGame,
    uuid: GameUuid = v4()
  ): Promise<string> {
    const game = new Game({
      id: uuid,
      board: persistentGame.board,
      activePlayer: persistentGame.activePlayer,
      players: persistentGame.players,
      status: persistentGame.status,
    });

    await game.save();
    console.log(game);

    return uuid;
  }

  async load(uuid: GameUuid): Promise<undefined | PersistentGame> {
    const game = await Game.find({ id: uuid });
    console.log(game);
    return game;
  }
}
