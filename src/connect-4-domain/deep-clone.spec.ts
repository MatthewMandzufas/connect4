import { describe, it, expect } from "vitest";
import deepClone from "@/connect-4-domain/deep-clone";

describe("deepClone", () => {
  it("should return a primitive value as is ", () => {
    expect(deepClone(2)).toBe(2);
  });
  it("should return a deep copy of an array", () => {
    const originalArray: (object | number[] | number)[] = [{ a: 1 }, 2, [3, 4]];
    const clonedArray = deepClone(originalArray);
    expect(clonedArray).not.toBe(originalArray);
    expect(clonedArray[0]).not.toBe(originalArray[0]);
    expect(clonedArray[0]["a"]).toStrictEqual(originalArray[0]["a"]);
    expect(Object.keys(clonedArray[0]).length).toEqual(1);
    expect(Object.hasOwn(clonedArray[0], "a")).toBeTruthy;
    expect(clonedArray[1]).toStrictEqual(originalArray[1]);
    expect(clonedArray[1]).toBe(originalArray[1]);
    expect(clonedArray[2]).not.toBe(originalArray[2]);
    expect(clonedArray[2][0]).toBe(originalArray[2][0]);
    expect(clonedArray[2][1]).toBe(originalArray[2][1]);
  });
});
