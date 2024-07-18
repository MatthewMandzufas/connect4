import { GameStatus } from "@/connect-4-ui/GameStatus";
import { connect, Model, model, Schema } from "mongoose";
import "reflect-metadata";
import { v4 } from "uuid";
import { BoardCell, PersistentGame } from "./game";
import { GameUuid } from "./in-memory-repository";

const gameSchema = new Schema({
  gameUuid: { type: String, required: true },
  board: Array<Array<BoardCell>>,
  activePlayer: { type: Number, required: true },
  players: {
    type: {
      "1": {
        playerNumber: { type: Number, required: true },
      },
      "2": {
        playerNumber: { type: Number, required: true },
      },
    },
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(GameStatus),
    required: true,
  },
});

export interface GameDocument extends Document, PersistentGame {}

export default class MongoDBRepository {
  private gameModel: Model<GameDocument>;

  constructor(gameModel?: Model<GameDocument>) {
    console.log(gameModel);
    if (gameModel !== undefined) {
      this.gameModel = gameModel;
    } else {
      (async () => {
        await connect("mongodb://localhost:27017/test");

        this.gameModel = model<GameDocument>("Game", gameSchema);
      })();
    }
  }

  async save(
    persistentGame: PersistentGame,
    uuid: GameUuid = v4()
  ): Promise<string> {
    try {
      await this.gameModel.create({
        gameUuid: uuid,
        board: persistentGame.board,
        activePlayer: persistentGame.activePlayer,
        players: persistentGame.players,
        status: persistentGame.status,
      });

      return uuid;
    } catch (error) {
      console.log(error);
      return uuid;
    }
  }

  async load(uuid: GameUuid): Promise<undefined | PersistentGame> {
    try {
      const gameToLoad = await this.gameModel
        .findOne({ gameUuid: uuid })
        .exec();
      if (gameToLoad !== undefined && gameToLoad !== null) {
        return {
          board: gameToLoad.board,
          activePlayer: gameToLoad.activePlayer,
          players: gameToLoad.players,
          status: gameToLoad.status,
        };
      } else {
        return undefined;
      }
    } catch (error) {
      console.error("Error loading Game: ", error);
      return undefined;
    }
  }
}
