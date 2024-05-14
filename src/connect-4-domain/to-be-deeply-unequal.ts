import { MatcherResult } from "@/vitest";

function toBeDeeplyUnequal(received: object, expected: object): MatcherResult {
  return {
    pass: received !== expected,
    message: () => "Objects are deeply equal",
  };
}

export default toBeDeeplyUnequal;
