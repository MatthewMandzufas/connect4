import { describe, it, expect } from "vitest";
import {
  PlayerMoveFailedEvent,
  PlayerMovedEvent,
  createPlayerMoveFailedEvent,
  createPlayerMovedEvent,
} from "@/connect-4-domain/events";

describe("events", () => {
  describe("createPlayerMoveFailedEvent", () => {
    it("returns a playerMoveFailedEvent", () => {
      const playerMovedFailedEvent = createPlayerMoveFailedEvent({
        message:
          "Cell at Row: -1, Column: 0 does not exist on the board. The row number must be  >= 0 and <= 1",
      });
      expect(playerMovedFailedEvent).toBeInstanceOf(PlayerMoveFailedEvent);
      expect(playerMovedFailedEvent).toEqual({
        type: "PLAYER_MOVE_FAILED",
        payload: {
          message:
            "Cell at Row: -1, Column: 0 does not exist on the board. The row number must be  >= 0 and <= 1",
        },
      });
    });
  });
  describe("createPlayerMovedEvent", () => {
    it("returns a playerMovedEvent", () => {
      const playerMovedEvent = createPlayerMovedEvent({
        player: 1,
        targetCell: { row: 0, column: 0 },
      });
      expect(playerMovedEvent).toBeInstanceOf(PlayerMovedEvent);
      expect(playerMovedEvent).toEqual({
        type: "PLAYER_MOVED",
        payload: {
          player: 1,
          targetCell: {
            row: 0,
            column: 0,
          },
        },
      });
    });
  });
});
