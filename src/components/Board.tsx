import { useEffect } from "react";
import Row from "./Row";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getBoard, getTempo, getIsRunning } from "./../reducer";

const Table = styled.table`
  border: 1px solid black;
  margin: auto;
  margin-top: 100px;
  padding: 0;
`;

const Board = () => {
  const boardInfo = useSelector(getBoard);
  const isRunning = useSelector(getIsRunning);
  const tempo = useSelector(getTempo);
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = isRunning
      ? setInterval(() => dispatch({ type: "UPDATE_BOARD" }), tempo)
      : null;
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, tempo, dispatch]);
  return (
    <Table>
      <tbody>
        {boardInfo.map((row: boolean[], rowIndex: number) => (
          <Row key={rowIndex} rowIndex={rowIndex} />
        ))}
      </tbody>
    </Table>
  );
};
export default Board;
