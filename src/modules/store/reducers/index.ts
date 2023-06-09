import HeaderReducer from "./header";

import type { AppReducer } from "../../../types/context/utils";
import { StoreState, AppActions } from "../../../types/context/store";

// interface Reducer {
//   stateName: keyof StoreState;
//   reducer: typeof HeaderReducer;
// }

const AppReducer: AppReducer<StoreState, AppActions> = (state, action) => {
  switch (action.type) {
    case "SET_ITEMS":
      return {
        ...state,
        header: {
          ...state.header,
          items: action.payload,
        },
      };
    default:
      return state;
  }
};

// const PrepareReducers = (reducers: Reducer[]): AppReducer<any, any> => {
//   return (state, action) =>
//     reducers.reduce((acc, { stateName, reducer }) => {
//       acc[stateName] = reducer(acc[stateName], action);
//       return acc;
//     }, state);
// };

// const Reducers = PrepareReducers([
//   {
//     stateName: "header",
//     reducer: HeaderReducer,
//   },
// ]);

export default AppReducer;
