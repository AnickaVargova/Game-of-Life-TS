import { combineReducers } from "redux";
import { loginReducer } from "./loginReducer";
import { gameReducer } from "./gameReducer";

export type GetAllReduxActions<T> = T extends (
  state: any,
  actions: infer Actions,
  ...args: any[]
) => any
  ? // omit empty objects like `{}`
    keyof Actions extends []
    ? never
    : Actions
  : T extends Record<string, infer Values>
  ? GetAllReduxActions<Values>
  : never;

export type GetStateFromReducers<T> = T extends (...args: any[]) => infer Ret
  ? Ret
  : T extends Record<any, any>
  ? {
      [K in keyof T]: GetStateFromReducers<T[K]>;
    }
  : T;

export const reducers = combineReducers({
  metadata: combineReducers({ login: loginReducer }),
  game: gameReducer,
});

export type GlobalState = GetStateFromReducers<typeof reducers>;
export type GlobalActions = GetAllReduxActions<typeof reducers>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type GlobalActionTypes = GlobalActions["type"];
