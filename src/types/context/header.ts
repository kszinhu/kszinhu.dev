import type { Action } from "./utils";
import type { HeaderState } from "./store";

export type HeaderAction = Action<"SET_ITEMS", HeaderState["items"]>;
