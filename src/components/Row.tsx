import Square from "./Square";
import { DataContext } from "./App";
import { useContext } from "react";

const Row = (props: { rowIndex: number }) => {
  const boardInfo = useContext(DataContext).dataState;
  const rowInfo = boardInfo[props.rowIndex];
  const updateSquare = useContext(DataContext).updateSquare;
  return (
    <tr>
      {rowInfo.map((square, index) => (
        <Square
          squareInfo={square}
          key={index}
          handleClick={() => {
            updateSquare(index, props.rowIndex);
          }}
        />
      ))}
    </tr>
  );
};
export default Row;
