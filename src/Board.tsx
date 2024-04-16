import { BoardCell, BoardCellProps } from "@/BoardCell";
import createBoardCells from "@/create-board-cells";
import styled from "styled-components";

type BoardProps = {
  cells: Array<Array<BoardCellProps>>;
};

const Row = styled.div`
  display: flex;
`;

export const Board = (props: BoardProps) => {
  return (
    <>
      {props.cells.map((row) => (
        <Row>
          {row.map(() => (
            <BoardCell></BoardCell>
          ))}
        </Row>
      ))}
    </>
  );
};

Board.defaultProps = {
  cells: createBoardCells(6, 7),
};
