import { describe, it, expect } from "vitest";

describe("toBeDeeplyUnequal", () => {
  it("should fail when given objects are the same object", () => {
    const firstObject = { a: 1, b: 2 };
    const secondObject = firstObject;
    expect(firstObject).not.toBeDeeplyUnequal(secondObject);
  });
  it("should pass when given objects are different objects", () => {
    const firstObject = {};
    const secondObject = {};
    expect(firstObject).toBeDeeplyUnequal(secondObject);
  });
});
