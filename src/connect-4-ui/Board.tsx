import { BoardCell, BoardCellProps } from "@/connect-4-ui/BoardCell";
import createBoardCells from "@/connect-4-ui/create-board-cells";
import styled from "styled-components";

export type BoardProps = {
  cells: Array<Array<BoardCellProps>>;
  playerOneColor?: string;
  playerTwoColor?: string;
};

type GridBoardCellProps = {
  row: number;
  column: number;
};

const StyledBoard = styled.div<BoardProps>`
  display: grid;
  grid-template-columns: ${({ cells }) => `repeat(${cells[0].length}, 1fr)`};
  grid-template-rows: ${({ cells }) => `repeat(${cells.length}, 1fr)`};
  width: min(80vh, 80vw);
  height: min(80vh, 80vw);
`;

const GridBoardCell = styled(BoardCell)<GridBoardCellProps>`
  grid-column: ${(props) => props.column};
  grid-row: ${(props) => props.row};
`;

export const Board = (props: BoardProps) => {
  return (
    <StyledBoard cells={props.cells}>
      {props.cells.map((row, rowIndex) => {
        return row.map((cell, columnIndex) => (
          <GridBoardCell
            player={cell.player}
            uuid={cell.uuid}
            key={cell.uuid}
            column={columnIndex + 1}
            row={rowIndex + 1}
            playerOneColor={props.playerOneColor}
            playerTwoColor={props.playerTwoColor}
          />
        ));
      })}
    </StyledBoard>
  );
};

Board.defaultProps = {
  cells: createBoardCells(6, 7),
  playerOneColor: "red",
  playerTwoColor: "yellow",
};
