import { describe, it, expect } from "vitest";
import deepClone from "@/connect-4-domain/deep-clone";

describe("deepClone", () => {
  it("should return a primitive value as is ", () => {
    expect(deepClone(2)).toBe(2);
  });
});
