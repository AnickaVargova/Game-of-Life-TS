import { Actions, GlobalState } from "./reducers/reducer";

export type ThunkReturnType = (
  dispatch: (act: Actions | (() => any)) => any,
  getState: () => GlobalState
) => any;
