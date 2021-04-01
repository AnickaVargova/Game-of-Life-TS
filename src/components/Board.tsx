import Row from "./Row";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { getBoard } from "../reducers/gameReducer";

const Table = styled.table`
  border: 1px solid black;
  margin: auto;
  margin-top: 0;
  padding: 0;
`;

const Board = () => {
  const boardInfo = useSelector(getBoard);
  return (
    <Table>
      <tbody>
        {boardInfo &&
          boardInfo.map((row, rowIndex) => (
            <Row key={rowIndex} rowIndex={rowIndex} />
          ))}
      </tbody>
    </Table>
  );
};
export default Board;
