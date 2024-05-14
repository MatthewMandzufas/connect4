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
  it("it should pass, given an object and an array", () => {
    const arr = [];
    const obj = {};
    expect(obj).toBeDeeplyUnequal(arr);
  });
  it("should pass, given null and an object", () => {
    const obj = {};
    expect(null).toBeDeeplyUnequal(obj);
  });
  it("should pass, given undefined and an object", () => {
    const obj = {};
    expect(undefined).toBeDeeplyUnequal(obj);
  });
  it("should fail, given two arrays that are the same", () => {
    const firstArray = [];
    const secondArray = firstArray;
    expect(firstArray).not.toBeDeeplyUnequal(secondArray);
  });
});
