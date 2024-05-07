function toAsciiTable(grid: Array<Array<string>>): string {
  if (grid.length === 0) {
    return "";
  }
  let largestWidth = 0;
  const table = grid.reduce((tableRows, currentRow) => {
    tableRows.push(
      currentRow.reduce((tableRow, currentElement) => {
        largestWidth =
          currentElement.length > largestWidth
            ? currentElement.length
            : largestWidth;
        return tableRow.concat(`| ${currentElement} |`);
      }, "")
    );
    return tableRows;
  }, []);

  const border = ["|", "-".repeat(largestWidth + 2), "|"].join("");
  return ["", border, table[0], border].join("\n");
}

export default toAsciiTable;
