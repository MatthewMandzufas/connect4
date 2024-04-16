import { expect } from "vitest";
import { MatcherResult } from "./vitest";

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

const toBeUUID = (received: string): MatcherResult => ({
  pass: received.match(UUID_REGEX) !== null,
  message: () => `${received} is not a valid UUID.`,
});

expect.extend({
  toBeUUID,
});

export default toBeUUID;
