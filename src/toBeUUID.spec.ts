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
      expect(message()).toEqual(`${validUUID} is an invalid UUID.`);
    });
    describe("and we use the negated matcher", () => {
      it("should return a negative MatcherResult", () => {
        const boundToBeUUID = toBeUUID.bind({
          isNot: true,
        });

        expect(boundToBeUUID(validUUID)).toEqual({
          pass: true,
          message: expect.any(Function),
        });
      });
      it("returns a message function, indicating the provided UUID is invalid", () => {
        const boundToBeUUID = toBeUUID.bind({
          isNot: true,
        });
        const { message } = boundToBeUUID(validUUID);

        expect(message()).toEqual(`${validUUID} is a valid UUID.`);
      });
    });
  });
  describe("given an invalid v4 UUID string", () => {
    const fakeUUID = "23214323";

    it("returns a negative MatcherResult", () => {
      expect(toBeUUID(fakeUUID)).toEqual({
        pass: false,
        message: expect.any(Function),
      });
    });
  });
});
