import Board from "./Board";
import styled from "styled-components";
import Login from "./Login";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { config } from "../config";

import {
  setTempoAction,
  setRunningAction,
  getTempo,
  startGame,
  changeBoardSetting,
  getErrorMsg,
} from "../reducers/gameReducer";

const Setting = styled.div`
  text-align: center;
`;
const Label = styled.label`
  margin: 5px;
  color: blue;
  font-size: 20px;
`;

const Select = styled.select`
  margin: 10px;
  margin-right: 30px;
  border: 2px solid black;
  &: hover {
    border: 2px solid blue;
  }
`;

const Message = styled.p`
  color: red;
`;

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

const App = () => {
  const tempo = useSelector(getTempo);
  const msg = useSelector(getErrorMsg);
  const dispatch = useDispatch();
  const [pattern, setPattern] = useState("Example");

  return (
    <div className="App">
      <Login />
      <Setting>
        <Label>Choose a pattern:</Label>
        <Select
          onChange={(e) => {
            dispatch(changeBoardSetting(e.target.value));
            setPattern(e.target.value);
          }}
        >
          <option value="example">Example</option>
          <option value="blinker">Blinker</option>
          <option value="toad">Toad</option>
          <option value="beacon">Beacon</option>
          <option value="pentadecathlon">Pentadecathlon</option>
          <option value="pulsar">Pulsar</option>
        </Select>
        <Message>{msg}</Message>
      </Setting>
      <Board />
      <Buttons>
        <Button onClick={() => dispatch(startGame())}>Play</Button>
        <Button onClick={() => dispatch(setRunningAction(false))}>Stop</Button>
        <Button
          onClick={() => {
            dispatch(setRunningAction(false));
            dispatch(changeBoardSetting(pattern));
            dispatch(setTempoAction(config.DEFAULT_SPEED));
          }}
        >
          Reset
        </Button>
      </Buttons>
      <Tempo>
        <Label>Change the speed: </Label>
        <Select
          value={tempo}
          onChange={(e) => {
            dispatch(setTempoAction(parseInt(e.target.value)));
          }}
        >
          <option value="50">0.05 s (very fast)</option>
          <option value="300">0.3 s</option>
          <option value="500">0.5 s (medium)</option>
          <option value="700">0.7 s</option>
          <option value="2000">2 s (very slow)</option>
        </Select>
      </Tempo>
    </div>
  );
};

export default App;
