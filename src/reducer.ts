import data from "./data";
import updateSquare from "./utils/updateSquare";
import updateBoard from "./utils/updateBoard";

export const getBoard = (state:{boardInfo: boolean[][], tempo: number, isRunning: boolean}) => state.boardInfo;
export const getTempo = (state:{boardInfo: boolean[][], tempo: number, isRunning: boolean}) => state.tempo;
export const getIsRunning = (state:{boardInfo: boolean[][], tempo: number, isRunning: boolean}) => state.isRunning;
export const updateSquareAction = (index:number, rowIndex:number) => ({
  type: "UPDATE_SQUARE",
  payload: { index, rowIndex },
});
export const setTempoAction = (value: string) => ({
  type: "SET_TEMPO",
  payload: parseInt(value),
});
export const setRunningAction = (bool: boolean) => ({
  type: "SET_RUNNING",
  payload: bool,
});

function reducer(state = data, action: {type:string, payload:any}) {
  switch (action.type) {
    case "UPDATE_SQUARE":
      return {
        ...state,
        boardInfo: updateSquare(
          state.boardInfo,
          action.payload.index,
          action.payload.rowIndex
        ),
      };
    case "UPDATE_BOARD":
      return { ...state, boardInfo: updateBoard(state.boardInfo) };
    case "RESET":
      return data;
    case "SET_RUNNING":
      return { ...state, isRunning: action.payload };
    case "SET_TEMPO":
      return { ...state, tempo: action.payload };
    default:
      return state;
  }
}

export default reducer;
