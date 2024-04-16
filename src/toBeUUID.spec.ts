import { describe, expect, it } from "vitest";
import toBeUUID from "./toBeUUID";

describe("toBeUUID", () => {
  describe("given a valid v4 UUID string", () => {
    const validUUID = "123e4567-e89b-12d3-a456-426614174000";
    it("returns a positive MatcherResult objects", () => {
      expect(toBeUUID(validUUID)).toEqual({
        pass: true,
        message: expect.any(Function),
      });
    });
    it("the return message function, returns a valid message", () => {
      const message = toBeUUID(validUUID).message;
      expect(message()).toEqual(`${validUUID} is not a valid UUID.`);
    });
  });
});
