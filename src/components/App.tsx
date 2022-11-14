import Board from "./Board";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setTempoAction, setRunningAction, getTempo, resetAction, startGame } from "../reducers/gameReducer";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background: linear-gradient(45deg, #03a1fc, #e590e8);
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  background-color: #1911f5;
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

const Header = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  color:#1911f5;
  -webkit-text-stroke: 0.5px white;
  font-size:5rem;
  padding-top:20px;
`;

const Select = styled.select`
  padding: 5px;
`;

const Instructions = styled.div`
  margin: 10px 20px 0 20px;
  text-align: center;
  max-width: 700px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  line-height: 1.5;
`;

const App = () => {
  const tempo = useSelector(getTempo);
  const dispatch = useDispatch();


  return (
    <Wrapper>
      <Header>Game of Life</Header>
      {/* <Login/> */}
      <Instructions><span>I programmed this Game of Life as an exercise in React.js. The explanation of this self-playing game can be found </span>
        <a href='https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life' target='_blank' rel="noreferrer">here</a><span>. You can look at my code on </span><a href='https://github.com/AnickaVargova/Game-of-Life-TS' target='_blank' rel="noreferrer">Github</a>
        <span>. The setting can be changed before or during the game by clicking on individual squares. You can also modify the speed by selecting one of the options below the board.</span></Instructions>
      <Board />
      <Buttons>
        <Button onClick={() => dispatch(startGame())}>Play</Button>
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
      <footer>
        <small>
          <span>©Anna Vargova, </span
          ><a href="mailto:anna.vargova@seznam.cz?Subject=''"
          >anna.vargova@seznam.cz
          </a></small
        >
      </footer>
    </Wrapper>
  );
};

export default App;
