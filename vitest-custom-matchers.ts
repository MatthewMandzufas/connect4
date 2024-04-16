import toBeUUID from "./src/toBeUUID";
import { expect } from "vitest";

expect.extend({
  toBeUUID,
});
