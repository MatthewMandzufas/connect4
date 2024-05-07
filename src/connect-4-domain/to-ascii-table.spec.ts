import { describe, expect, it } from "vitest";
import toAsciiTable from "@/connect-4-domain/to-ascii-table";

describe("to-ascii-table", () => {
  describe("given an empty grid", () => {
    it("will resolve to an empty ascii table", () => {
      const asciiTable = toAsciiTable([]);
      expect(asciiTable).toStrictEqual("");
    });
  });
  describe("given a 1 row grid", () => {
    describe("with 1 column", () => {
      describe("containing a string", () => {
        it("and the string is empty", () => {
          const asciiTable = toAsciiTable([[""]]);
          expect(asciiTable).toStrictEqual(`
|--|
|  |
|--|`);
        });
        describe("with content 1 character in length", () => {
          it("resolves to a 1x1 ascii table", () => {
            const asciiTable = toAsciiTable([["1"]]);
            expect(asciiTable).toStrictEqual(`
|---|
| 1 |
|---|`);
          });
        });
        describe("with content greater than 1 character in length", () => {
          it("returns a 1x1 ascii table", () => {
            const asciiTable = toAsciiTable([["12"]]);
            expect(asciiTable).toStrictEqual(`
|----|
| 12 |
|----|`);
          });
        });
      });
    });
  });
});
