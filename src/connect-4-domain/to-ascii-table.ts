function defaultResolver<T>(value: T): string {
  if (value === undefined || value === null) {
    return "";
  }
  return `${value}`;
}

function toAsciiTable<T>(
  grid: Array<Array<T>>,
  customerResolver: (value: T) => string = defaultResolver
): string {
  if (grid.length === 0) {
    return "";
  }
  let largestCellWidth = 0;
  const table = grid.reduce((tableRows, currentRow) => {
    tableRows.push(
      currentRow.reduce((tableRow: string, currentElement) => {
        const resolvedValue = customerResolver(currentElement);
        largestCellWidth =
          resolvedValue.length > largestCellWidth
            ? resolvedValue.length
            : largestCellWidth;
        return tableRow.concat(`| ${resolvedValue} |`);
      }, "")
    );
    return tableRows;
  }, [] as Array<string>);

  const border = ["|", "-".repeat(largestCellWidth + 2), "|"].join("");
  return ["", border, table[0], border].join("\n");
}

export default toAsciiTable;
