function parseAsciiTable(asciiTable: string): Array<Array<undefined | string>> {
  if (asciiTable.length === 0) {
    return [];
  }

  const asciiTableRows = asciiTable.split("\n").slice(1);
  const gridFormat = asciiTableRows.reduce(
    (
      grid: Array<Array<undefined | string>>,
      currentRow: string,
      currentIndex: number
    ): Array<Array<undefined | string>> => {
      if (currentIndex % 2 === 0) {
        return grid;
      }
      const rowCells = currentRow.split("|");
      if (rowCells[1].trim().length === 0) {
        grid.push([undefined]);
      } else {
        grid.push([rowCells[1].trim()]);
      }

      return grid;
    },
    []
  );

  return gridFormat;
}

export default parseAsciiTable;
