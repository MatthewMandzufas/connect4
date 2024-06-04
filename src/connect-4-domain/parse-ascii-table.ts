function defaultResolver(value: string): string | undefined {
  return value.length === 0 ? undefined : value;
}

function parseAsciiTable<T>(
  asciiTable: string,
  customResolver: (value: string) => T = defaultResolver as (value: string) => T
): Array<Array<T>> {
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
      grid.push([customResolver(rowCells[1].trimEnd().slice(1))]);

      return grid;
    },
    []
  );

  return gridFormat;
}

export default parseAsciiTable;
