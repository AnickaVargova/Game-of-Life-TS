import Square from "./Square";
import { useDispatch, useSelector } from "react-redux";
import { updateSquareAction, getBoard } from "./../reducer";

const Row = (props: {rowIndex: number} ) => {
  const dispatch = useDispatch();
  const boardInfo = useSelector(getBoard);
  const rowInfo = boardInfo[props.rowIndex];
  return (
    <tr>
      {rowInfo.map((square:boolean, index:number) => (
        <Square
          squareInfo={square}
          key={index}
          handleClick={() => dispatch(updateSquareAction(index, props.rowIndex))}
        />
      ))}
    </tr>
  );
};
export default Row;
