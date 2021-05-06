import updateSquare from "../utils/updateSquare";
import updateBoard from "../utils/updateBoard";
import { ThunkReturnType } from "../global";
import { GlobalState } from "./reducer";
import { config } from "../config";

export type State = {
  boardInfo: boolean[][];
  tempo: number;
  isRunning: boolean;
  msg: string;
};

export const startGame = (): ThunkReturnType => (dispatch, getState) => {
  const tempo = getTempo(getState());
  dispatch(setRunningAction(true));

  if (tempo) {
    dispatch(setTempoAction(tempo));
  } else {
    dispatch(setTempoAction(config.DEFAULT_SPEED));
  }

  const doStep = () => {
    if (!getIsRunning(getState())) {
      return;
    }
    dispatch(updateBoardAction());
    setTimeout(doStep, getTempo(getState()));
  };

  setTimeout(doStep, getTempo(getState()));
};

export const changeBoardSetting = (pattern: string|number): ThunkReturnType => (
  dispatch
) => {
  dispatch(messageAction("Loading..."));
  fetch(`http://localhost:8080/${pattern}`)
    .then((response) => {
      if (!response.ok) {
        dispatch(messageAction("Unable to fetch data."));
      } else {
        return response.json();
      }
    })
    .then((data) => {
      dispatch(fetchDataAction(data));
    })
    .then(() => dispatch(messageAction("")))
    .catch(() => {
      dispatch(messageAction("ERROR: Unable to fetch data."));
    });
};

export const savePattern = (pattern: string): ThunkReturnType => (
  dispatch,
  getState
) => {
  fetch(`http://localhost:8080/${pattern}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(getState().game.boardInfo),
  })
    .then((response) => {
      if (!response.ok) {
        dispatch(messageAction("ERROR: Pattern name is already in use."));
      } else {
        dispatch(messageAction("Your pattern has been saved."));
      }
    })
    .catch(() => {
      dispatch(messageAction("ERROR: Unable to save data."));
    });
};

export const editPattern = (pattern: string): ThunkReturnType => (
  dispatch,
  getState
) => {
  fetch(`http://localhost:8080/${pattern}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(getState().game.boardInfo),
  })
    .then((response) => {
      if (!response.ok) {
        dispatch(messageAction("ERROR: unable to save data"));
      } else {
        dispatch(messageAction("Your pattern has been successfully edited."));
      }
    })
    .catch(() => {
      dispatch(messageAction("ERROR: unable to save data"));
    });
};

export const deletePattern = (pattern: string): ThunkReturnType => (
  dispatch,
  getState
) => {
  fetch(`http://localhost:8080/${pattern}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      if (!response.ok) {
        dispatch(messageAction("ERROR: unable to save data"));
      } else {
        dispatch(messageAction("The pattern has been deleted."));
      }
    })
    .catch(() => {
      dispatch(messageAction("ERROR: unable to delete"));
    });
};

export const getBoard = (state: GlobalState) => state.game.boardInfo;
export const getTempo = (state: GlobalState) => state.game.tempo;
export const getIsRunning = (state: GlobalState) => state.game.isRunning;
export const getMsg = (state: GlobalState) => state.game.msg;
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
export const messageAction = (msg: string) => ({
  type: "MESSAGE" as const,
  payload: msg,
});

type GameActions =
  | ReturnType<typeof setTempoAction>
  | ReturnType<typeof setRunningAction>
  | ReturnType<typeof updateSquareAction>
  | ReturnType<typeof updateBoardAction>
  | ReturnType<typeof fetchDataAction>
  | ReturnType<typeof messageAction>;

export const gameReducer = (state = {} as State, action: GameActions) => {
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
    case "MESSAGE":
      return { ...state, msg: action.payload };
    default:
      return state;
  }
};
