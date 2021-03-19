import { combineReducers } from "redux";
import { loginReducer } from "./loginReducer";
import { gameReducer } from "./gameReducer";

import {
  updateSquareAction,
  setTempoAction,
  setRunningAction,
  updateBoardAction,
  resetAction,
} from "./gameReducer";

import { setNameAction } from "./loginReducer";

export type Actions =
  | ReturnType<typeof updateSquareAction>
  | ReturnType<typeof setTempoAction>
  | ReturnType<typeof setRunningAction>
  | ReturnType<typeof updateBoardAction>
  | ReturnType<typeof resetAction>
  | ReturnType<typeof setNameAction>;

export type GetStateFromReducers<T> = T extends (...args: any[]) => infer Ret
  ? Ret
  : T extends Record<any, any>
  ? {
      [K in keyof T]: GetStateFromReducers<T[K]>;
    }
  : T;

export const reducers = combineReducers({
  name: loginReducer,
  game: gameReducer,
});

export type GlobalState = GetStateFromReducers<typeof reducers>;
