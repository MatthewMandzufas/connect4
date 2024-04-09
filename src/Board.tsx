import { BoardCellProps } from "@/BoardCell";
import createCells from "@/create-cells";

type BoardProps = {
  cells: Array<Array<BoardCellProps>>;
};

// export const Board = ({ cells }: BoardProps) => <></>;

export const Board = (props: BoardProps) => <></>;

Board.defaultProps = {
  cells: createCells(6, 7),
};
