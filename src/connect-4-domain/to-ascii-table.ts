function toAsciiTable<T>(grid: Array<Array<T>>): string {
  const table = grid.reduce((table, currentRow) => {
    const rowContent = currentRow.reduce((tableRow, currentElement) => {
      return tableRow.concat(`
|---|
| ${currentElement} |
|---|
`);
    }, "");
    return table.concat(rowContent);
  }, "");
  return table;
}

export default toAsciiTable;
