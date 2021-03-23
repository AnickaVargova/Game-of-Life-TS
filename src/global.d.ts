import { GlobalActions, GlobalState } from "./reducers/reducer";

export type ThunkReturnType = (
  dispatch: (
    act: GlobalActions | ThunkReturnType
  ) => unknown | Promise<unknown>,
  getState: () => GlobalState
) => unknown | Promise<unknown>;

declare module "redux" {
  export function combineReducers<T>(reducers: T): T;
  interface StoreCreator {
    (...args: any[]): any;
  }
}

declare module "react-redux" {
  export function useDispatch(): (
    action: GlobalActions | ThunkReturnType
  ) => unknown | Promise<unknown>;
}
