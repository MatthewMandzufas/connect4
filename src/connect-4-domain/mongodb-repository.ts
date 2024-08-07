import { GameStatus } from "@/connect-4-ui/GameStatus";
import { model, Model, Schema } from "mongoose";
import "reflect-metadata";
import { v4 } from "uuid";
import { GameRepository, PersistentGame } from "./game";
import { GameUuid } from "./in-memory-repository";

export const gameSchema = new Schema({
  gameUuid: { type: String, required: true },
  board: [
    [
      {
        player: { type: Number, required: false },
      },
    ],
  ],
  activePlayer: { type: Number, required: true },
  players: {
    type: {
      "1": {
        playerNumber: { type: Number, required: true },
        remainingDisks: { type: Number, required: true },
      },
      "2": {
        playerNumber: { type: Number, required: true },
        remainingDisks: { type: Number, required: true },
      },
    },
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(GameStatus),
    required: true,
  },
  playerColors: {
    type: {
      playerOneColor: { type: String, required: true },
      playerTwoColor: { type: String, required: true },
    },
  },
});

export interface GameDocument extends Document, PersistentGame {}

export default class MongoDBRepository implements GameRepository {
  private gameModel: Model<GameDocument>;

  constructor(gameModel?: Model<GameDocument>) {
    if (gameModel !== undefined) {
      this.gameModel = gameModel;
    } else {
      this.gameModel = model<GameDocument>("Game", gameSchema);
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
        playerColors: {
          playerOneColor: persistentGame.playerColors.playerOneColor,
          playerTwoColor: persistentGame.playerColors.playerTwoColor,
        },
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
          playerColors: {
            playerOneColor: gameToLoad.playerColors.playerOneColor,
            playerTwoColor: gameToLoad.playerColors.playerTwoColor,
          },
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
