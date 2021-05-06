import Board from "./Board";
import styled from "styled-components";
import Login from "./Login";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { config } from "../config";

import {
  setTempoAction,
  setRunningAction,
  getTempo,
  startGame,
  changeBoardSetting,
  getMsg,
  savePattern,
  editPattern,
  deletePattern,
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
  const msg = useSelector(getMsg);
  const dispatch = useDispatch();
  const [pattern, setPattern] = useState("blinker");
  const [settings, setSettings] = useState([
    // "example",
    "blinker",
    // "toad",
    "beacon",
    "pentadecathlon",
    // "pulsar",
    "random",
  ]);

  useEffect(() => {
    let setting = pattern;
     // @ts-expect-error
    if(setting === 'random'){setting=1}
    dispatch(changeBoardSetting(setting));
    fetch("http://localhost:8080")
      .then((response) => response.json())
      .then((data) => setSettings(data));
  }, [pattern, dispatch]);

  return (
    <div className="App">
      <Login />
      <Setting>
        <Label>Choose a pattern:</Label>
        <Select
          onChange={(e) => {
            let setting = e.target.value;
            // @ts-expect-error
            if(setting === 'random') {setting = 1}
            dispatch(changeBoardSetting(setting));
            setPattern(e.target.value);
          }}
          value={pattern}
        >
          {settings.map((setting, index) => (
            <option key={index} value={setting}>
              {setting}
            </option>
          ))}
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
            let setting = pattern;
            // @ts-expect-error
           if(setting === 'random'){setting=1}
           dispatch(changeBoardSetting(setting));
            dispatch(setTempoAction(config.DEFAULT_SPEED));
          }}
        >
          Reset
        </Button>
        <Button
          onClick={() => {
            let newPattern = prompt("Type the name of your pattern:");
            // @ts-expect-error
            dispatch(savePattern(newPattern));
            // @ts-expect-error
            setSettings([...settings, newPattern]);
            // @ts-expect-error
            setPattern(newPattern);
          }}
        >
          Save new pattern
        </Button>
        <Button
          onClick={() => {
            dispatch(editPattern(pattern));
          }}
        >
          Edit pattern
        </Button>
        <Button
          onClick={() => {
            dispatch(deletePattern(pattern));
          }}
        >
          Delete pattern
        </Button>
      </Buttons>
      <Tempo>
        <Label>Change the speed: </Label>
        <Select
          value={tempo ? tempo : config.DEFAULT_SPEED}
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
