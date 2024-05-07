function toAsciiTable(grid: Array<Array<string | undefined>>): string {
  if (grid.length === 0) {
    return "";
  }
  let largestCellWidth = 0;
  const table = grid.reduce((tableRows, currentRow) => {
    tableRows.push(
      currentRow.reduce((tableRow: string, currentElement) => {
        if (currentElement === undefined) {
          return tableRow.concat("|  |");
        }
        largestCellWidth =
          currentElement.length > largestCellWidth
            ? currentElement.length
            : largestCellWidth;
        return tableRow.concat(`| ${currentElement} |`);
      }, "")
    );
    return tableRows;
  }, []);

  const border = ["|", "-".repeat(largestCellWidth + 2), "|"].join("");
  return ["", border, table[0], border].join("\n");
}

export default toAsciiTable;
