import { BoardCell, BoardCellProps } from "@/connect-4-ui/BoardCell";
import createBoardCells from "@/connect-4-ui/create-board-cells";
import styled from "styled-components";

type BoardProps = {
  cells: Array<Array<BoardCellProps>>;
  playerOneColor?: string;
  playerTwoColor?: string;
};

type GridBoardCellProps = {
  row: number;
  column: number;
};

const StyledBoard = styled.div`
  display: grid;
  grid-auto-columns: max-content;
  grid-template-rows: max-content;
`;

const GridBoardCell = styled(BoardCell)<GridBoardCellProps>`
  grid-column: ${(props) => props.column};
  grid-row: ${(props) => props.row};
`;

export const Board = (props: BoardProps) => {
  return (
    <StyledBoard>
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
