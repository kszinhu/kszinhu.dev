import type { HeaderAction } from "../../../types/context/header";
import type { HeaderState } from "../../../types/context/store";
import type { AppDispatch } from "../../../types/context/utils";

const setItems = (
  items: HeaderState["items"],
  dispatch: AppDispatch<HeaderAction>
) => {
  dispatch({
    type: "SET_ITEMS",
    payload: items,
  });
};

export { setItems };
