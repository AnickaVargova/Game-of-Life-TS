import { name } from "../data";
import { GlobalState, Actions } from "./reducer";

export const getName = (state: GlobalState) => state.name;
export const setNameAction = (name: string) => ({
  type: "SET_NAME" as const,
  payload: name,
});

export const loginReducer = (state = name, action: Actions): string => {
  switch (action.type) {
    case "SET_NAME":
      return action.payload;
    default:
      return state;
  }
};
