import Row from "./Row";
import styled from "styled-components";
import { DataContext } from "./App";
import { useContext } from "react";

const Table = styled.table`
  border: 1px solid black;
  margin: auto;
  margin-top: 50px;
  padding: 0;
`;

const Board = () => {
  const boardInfo = useContext(DataContext).dataState;
  return (
    <Table>
      <tbody>
        {boardInfo.map((row, rowIndex) => (
          <Row key={rowIndex} rowIndex={rowIndex} />
        ))}
      </tbody>
    </Table>
  );
};
export default Board;
