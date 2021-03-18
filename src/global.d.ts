import { Actions, State } from "./reducer";

export type ThunkReturnType = (
  dispatch: (act: Actions | (() => any)) => any,
  getState: () => State
) => any;
