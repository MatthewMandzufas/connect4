import { describe, it } from "vitest";
import game from "@/connect-4-domain/game";

describe("game", () => {
  describe("new game", () => {
    describe("given defaults", () => {
      it("returns an instance of Game", () => {
        const game = new Game();
        expect(game).toBeInstanceOf(Game);
      });
    });
  });
});
