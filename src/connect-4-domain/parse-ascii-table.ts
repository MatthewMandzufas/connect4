/* eslint-disable @typescript-eslint/no-explicit-any */
function parseAsciiTable<T>(asciiTable: string): Array<Array<T>> {
  if (asciiTable.length === 0) {
    return [];
  }

  const asciiTableRows = asciiTable.split("\n").slice(1);
  const gridFormat = asciiTableRows.reduce(
    (
      grid: Array<Array<T>>,
      currentRow: string,
      currentIndex: number
    ): Array<Array<T>> => {
      if (currentIndex % 2 === 0) {
        return grid;
      }
      const rowCells = currentRow.split("|");
      if (rowCells[1].trim().length === 0) {
        grid.push([undefined as T]);
      }

      return grid;
    },
    []
  );

  return gridFormat;
}

export default parseAsciiTable;
