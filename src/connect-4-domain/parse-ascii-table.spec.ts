import { describe, it, expect } from "vitest";
import parseAsciiTable from "@/connect-4-domain/parse-ascii-table";

describe("parse-ascii-table", () => {
  describe("given a table with no rows or columns", () => {
    it("returns an empty grid", () => {
      const asciiTable = "";
      expect(parseAsciiTable(asciiTable)).toEqual([]);
    });
  });
  describe("given a table with 1 row and 1 column", () => {
    describe("with an empty cell", () => {
      it("returns a 1x1 grid", () => {
        const asciiTable = `
|--|
|  |
|--|`;

        expect(parseAsciiTable(asciiTable)).toEqual([[undefined]]);
      });
    });
  });
});
