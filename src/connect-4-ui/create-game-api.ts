import { createMovePlayerCommand } from "@/connect-4-domain/commands";
import { EventTypes } from "@/connect-4-domain/events";
import GameFactory, {
  BoardCell as DomainBoardCell,
} from "@/connect-4-domain/game";

export type MoveResult = {
  isSuccess: boolean;
  error?: Array<string>;
};

export type BoardCell = {
  player?: Player;
  uuid?: string;
  handlePlayerMove: (player: Player) => MoveResult;
};

export enum Status {
  DRAW = "DRAW",
  IN_PROGRESS = "IN_PROGRESS",
  PLAYER_ONE_WIN = "PLAYER_ONE_WIN",
  PLAYER_TWO_WIN = "PLAYER_TWO_WIN",
}

type Player = 1 | 2;

export interface GameApi {
  getActivePlayer: () => Player;
  getRemainingDisks: (player: Player) => number;
  getGameStatus: () => Status;
  getBoard: () => Array<Array<BoardCell>>;
}

const createRowMapper =
  (game: GameFactory) =>
  (row: Array<DomainBoardCell>, rowIndex: number): Array<BoardCell> => {
    const cellMapper = (
      cell: DomainBoardCell,
      columnIndex: number
    ): BoardCell => ({
      player: cell.player,
      handlePlayerMove: (player: Player) => {
        const movePlayerCommand = createMovePlayerCommand({
          player,
          targetCell: {
            row: rowIndex,
            column: columnIndex,
          },
        });
        const moveEvent = game.move(movePlayerCommand);
        const isSuccess = moveEvent.type === EventTypes.PLAYER_MOVED;
        return {
          isSuccess,
          error: isSuccess ? undefined : [moveEvent.payload.message],
        };
      },
    });
    return row.map(cellMapper);
  };

export default function createGameApi(game: GameFactory): GameApi {
  const rowMapper = createRowMapper(game);
  const gameApi = {
    getActivePlayer: () => game.getActivePlayer(),
    getRemainingDisks: (player: Player) =>
      game.getPlayerStats(player).remainingDisks,
    getGameStatus: () => game.getStatus(),
    getBoard: () => game.getBoard().map(rowMapper),
  };
  return gameApi;
}
