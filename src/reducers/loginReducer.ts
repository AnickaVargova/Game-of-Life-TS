import { metadata } from "../data";
import { GlobalState } from "./reducer";

export const getName = (state: GlobalState) => state.metadata.login.name;
export const setLoginAction = (name: string, password: string) => ({
  type: "SET_NAME" as const,
  payload: { name, password },
});

type NameAction = ReturnType<typeof setLoginAction>;
type Metadata = typeof metadata;

export const loginReducer = (
  state = metadata,
  action: NameAction
): Metadata => {
  switch (action.type) {
    case "SET_NAME":
      return { name: action.payload.name, password: action.payload.password };
    default:
      return state;
  }
};
