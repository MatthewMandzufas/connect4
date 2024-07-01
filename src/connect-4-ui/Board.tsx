import { BoardCell as GridBoardCell } from "@/connect-4-ui/BoardCell";
import createBoardCells from "@/connect-4-ui/create-board-cells";
import styled from "styled-components";
import { BoardCell } from "./create-game-api";

export type BoardProps = {
  cells: Array<Array<BoardCell>>;
  playerOneColor?: string;
  playerTwoColor?: string;
  onBoardCellClick?: ({ row, column }: GridBoardCellProps) => void;
};

export type GridBoardCellProps = {
  row: number;
  column: number;
};

const StyledBoard = styled.div<{ $cells: BoardProps["cells"] }>`
  display: grid;
  grid-template-columns: ${({ $cells }) => `repeat(${$cells[0].length}, 1fr)`};
  grid-template-rows: ${({ $cells }) => `repeat(${$cells.length}, 1fr)`};
  width: min(80vh, 80vw);
  height: min(80vh, 80vw);
  outline: solid 8px #142d4c;
`;

const StyledGridBoardCell = styled(GridBoardCell)<GridBoardCellProps>`
  grid-column: ${(props) => props.column};
  grid-row: ${(props) => props.row};
`;

function createHandleBoardCellClick(
  onBoardCellClick: ({ row, column }: GridBoardCellProps) => void
) {
  return function handleBoardCellClick(row: number, column: number) {
    onBoardCellClick({ row, column });
  };
}

export const Board = (
  {
    cells = createBoardCells(6, 7),
    playerOneColor = "red",
    playerTwoColor = "yellow",
    onBoardCellClick = () => undefined,
  }: BoardProps = {
    cells: createBoardCells(6, 7),
    playerOneColor: "red",
    playerTwoColor: "yellow",
    onBoardCellClick: () => undefined,
  }
) => {
  return (
    <StyledBoard $cells={cells}>
      {cells.map((row, rowIndex) => {
        return row.map((cell, columnIndex) => (
          <StyledGridBoardCell
            onClick={() =>
              createHandleBoardCellClick(onBoardCellClick)(
                rowIndex,
                columnIndex
              )
            }
            player={cell.player}
            uuid={cell.uuid}
            key={`${rowIndex}-${columnIndex}-${cell.uuid}`}
            column={columnIndex + 1}
            row={cells.length - rowIndex}
            playerOneColor={playerOneColor}
            playerTwoColor={playerTwoColor}
          />
        ));
      })}
    </StyledBoard>
  );
};
