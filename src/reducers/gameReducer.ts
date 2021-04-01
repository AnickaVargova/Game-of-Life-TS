import data from "../data";
import updateSquare from "../utils/updateSquare";
import updateBoard from "../utils/updateBoard";
import { ThunkReturnType } from "../global";
import { GlobalState } from "./reducer";

export type State = typeof data;

export const startGame = (): ThunkReturnType => (dispatch, getState) => {
  dispatch(setRunningAction(true));
  dispatch(setTempoAction(getTempo(getState())));

  const doStep = () => {
    if (!getIsRunning(getState())) {
      return;
    }
    dispatch(updateBoardAction());
    setTimeout(doStep, getTempo(getState()));
  };

  setTimeout(doStep, getTempo(getState()));
};

export const changeBoardSetting = (pattern: string): ThunkReturnType => (
  dispatch,
  getState
) => {
  fetch(`http://localhost:8080/${pattern}`, { mode: "cors" })
    .then((response) => response.json())
    .then((data) => dispatch(fetchDataAction(data)))
    .catch(() => dispatch(errorAction()));
};

export const getBoard = (state: GlobalState) => state.game.boardInfo;
export const getTempo = (state: GlobalState) => state.game.tempo;
export const getIsRunning = (state: GlobalState) => state.game.isRunning;
export const getErrorMsg = (state: GlobalState) => state.game.msg;
export const updateSquareAction = (index: number, rowIndex: number) => ({
  type: "UPDATE_SQUARE" as const,
  payload: { index, rowIndex },
});
export const setTempoAction = (value: number) => ({
  type: "SET_TEMPO" as const,
  payload: value,
});
export const setRunningAction = (bool: boolean) => ({
  type: "SET_RUNNING" as const,
  payload: bool,
});
export const updateBoardAction = () => ({ type: "UPDATE_BOARD" as const });
export const resetAction = () => ({ type: "RESET" as const });
export const fetchDataAction = (data: boolean[][]) => ({
  type: "FETCH_DATA" as const,
  payload: data,
});
export const errorAction = () => ({
  type: "ERROR" as const,
  msg: "Unfortunately this action wasn't successful.",
});

type GameActions =
  | ReturnType<typeof setTempoAction>
  | ReturnType<typeof setRunningAction>
  | ReturnType<typeof updateSquareAction>
  | ReturnType<typeof updateBoardAction>
  | ReturnType<typeof fetchDataAction>
  | ReturnType<typeof errorAction>;

export const gameReducer = (state = data, action: GameActions) => {
  switch (action.type) {
    case "UPDATE_SQUARE":
      return {
        ...state,
        boardInfo: updateSquare(
          state?.boardInfo,

          action.payload.index,

          action.payload.rowIndex
        ),
      };
    case "UPDATE_BOARD":
      return { ...state, boardInfo: updateBoard(state?.boardInfo) };
    case "SET_RUNNING":
      return { ...state, isRunning: action.payload };
    case "SET_TEMPO":
      return { ...state, tempo: action.payload };
    case "FETCH_DATA":
      return { ...state, boardInfo: action.payload };
    case "ERROR":
      return { ...state, error: action.msg };
    default:
      return state;
  }
};
