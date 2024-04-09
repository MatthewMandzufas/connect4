import { describe, it, expect } from "vitest";
import createCells from "@/create-cells";

describe("create-cells", () => {
  it("returns a 0x0 board given defaults", () => {
    expect(createCells()).toEqual([]);
  });
  it("returns a row x column board given the number of rows and columns", () => {
    expect(createCells(2, 2)).toEqual([
      [undefined, undefined],
      [undefined, undefined],
    ]);
  });
});
