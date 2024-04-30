import { describe, expect, it } from "vitest";
// import Game from "@/connect-4-domain/game";
import Game from "./game";

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
