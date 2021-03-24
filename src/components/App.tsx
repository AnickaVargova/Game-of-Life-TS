import Board from "./Board";
import styled from "styled-components";
import Login from "./Login";
import React, { useState, useRef } from "react";
import data, { metadata } from "../data";
import setBoard from "../utils/updateBoard";
import setSquare from "../utils/updateSquare";

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
`;

const Button = styled.button`
  margin: 10px;
  margin-top: 20px;
  color: white;
  background-color: blue;
  border-radius: 5px;
  padding: 10px;
`;

const Tempo = styled.div`
  text-align: center;
  margin-top: 20px;
  height: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
`;

type Context = ReturnType<typeof useDataContext>;

export const useDataContext = () => {
  const [dataState, setDataState] = useState(data.boardInfo);
  const [tempo, setTempo] = useState(data.tempo);
  const [running, setRunning] = useState(data.isRunning);
  const [name, setName] = useState(metadata.name);
  const [password, setPassword] = useState(metadata.password);

  const updateBoard = () => setDataState((p) => setBoard(p));
  const updateSquare = (index: number, rowIndex: number) =>
    setDataState((p) => setSquare(p, index, rowIndex));

  return {
    dataState,
    running,
    tempo,
    name,
    password,
    setName,
    setPassword,
    updateBoard,
    updateSquare,
    setRunning,
    setDataState,
    setTempo,
  };
};

export const DataContext = React.createContext({} as Context);

const App = () => {
  const dataValue = useDataContext();
  const runningRef = useRef({ running: false, tempo: 500 });
  runningRef.current = { running: dataValue.running, tempo: dataValue.tempo };

  const startGame = () => {
    dataValue.setRunning(true);
    const doStep = () => {
      if (!runningRef.current.running) {
        return;
      }
      dataValue.updateBoard();
      setTimeout(doStep, runningRef.current.tempo);
    };
    setTimeout(doStep, runningRef.current.tempo);
  };

  return (
    <div className="App">
      <DataContext.Provider value={dataValue}>
        <Login />
        <Board />
        <Buttons>
          <Button onClick={startGame}>Play</Button>
          <Button onClick={() => dataValue.setRunning(false)}>Stop</Button>
          <Button
            onClick={() => {
              dataValue.setRunning(false);
              dataValue.setDataState(data.boardInfo);
            }}
          >
            Reset
          </Button>
        </Buttons>
        <Tempo>
          <span>Change the speed: </span>
          <select
            value={dataValue.tempo}
            onChange={(e) => {
              dataValue.setTempo(parseInt(e.target.value));
            }}
          >
            <option value="50">0.05 s (very fast)</option>
            <option value="300">0.3 s</option>
            <option value="500">0.5 s (medium)</option>
            <option value="700">0.7 s</option>
            <option value="2000">2 s (very slow)</option>
          </select>
        </Tempo>
      </DataContext.Provider>
    </div>
  );
};

export default App;
