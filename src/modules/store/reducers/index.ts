import HeaderReducer from "./header";

import type { AppReducer } from "../../../types/context/utils";
import { StoreState, AppActions } from "../../../types/context/store";

const combineReducers =
  (slices: Record<string, AppReducer<any, any>>) =>
  (state: StoreState, action: AppActions) =>
    Object.keys(slices).reduce(
      (acc, prop) => ({
        ...acc,
        [prop]: slices[prop](acc[prop as keyof StoreState], action),
      }),
      state
    );

const AppReducer = combineReducers({
  header: HeaderReducer,
});

export default AppReducer;
