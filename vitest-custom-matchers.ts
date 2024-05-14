import toBeUUID from "./src/connect-4-ui/toBeUUID";
import toBeDeeplyUnequal from "./src/connect-4-domain/to-be-deeply-unequal";
import { expect } from "vitest";

expect.extend({
  toBeUUID,
  toBeDeeplyUnequal,
});
