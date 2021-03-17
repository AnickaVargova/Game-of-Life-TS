import { Actions } from "./reducer";

declare module "react-redux" {
  export function useDispatch(): (arg: Actions) => Promise<any>;
}
