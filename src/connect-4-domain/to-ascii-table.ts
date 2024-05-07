function toAsciiTable(grid: Array<Array<string>>): string {
  if (grid.length === 0) {
    return "";
  }
  let largestWidth = 1;
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

  const padWidth = new Array(largestWidth + 2).fill("-");
  const border = ["|", ...padWidth, "|"].join("");
  return ["", border, table[0], border, ""].join("\n");
}

export default toAsciiTable;
