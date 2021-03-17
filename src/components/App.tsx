import Board from "./Board";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setTempoAction, setRunningAction, getTempo, resetAction } from "../reducer";

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
  const dispatch = useDispatch();

  return (
    <div className="App">
      <Board />

      <Buttons>
        <Button onClick={() => dispatch(setRunningAction(true))}>Play</Button>
        <Button onClick={() => dispatch(setRunningAction(false))}>Stop</Button>
        <Button
          onClick={() => {
            dispatch(setRunningAction(false));
            dispatch(resetAction());
        }}
        >
          Reset
        </Button>
      </Buttons>
      <Tempo>
        <span>Change the speed: </span>
        <select
          value={tempo}
          onChange={(e) => {
            dispatch(setTempoAction(e.target.value));
          }}
        >
          <option value="50">0.05 s (very fast)</option>
          <option value="300">0.3 s</option>
          <option value="500">0.5 s (medium)</option>
          <option value="700">0.7 s</option>
          <option value="2000">2 s (very slow)</option>
        </select>
      </Tempo>
    </div>
  );
};

export default App;
