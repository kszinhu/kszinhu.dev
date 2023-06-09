import type { HeaderAction } from "../../../types/context/header";
import type { HeaderState } from "../../../types/context/store";
import type { AppReducer } from "../../../types/context/utils";

const HeaderReducer: AppReducer<HeaderState, HeaderAction> = (
  state,
  action
) => {
  switch (action.type) {
    case "SET_ITEMS":
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
};

export default HeaderReducer;
