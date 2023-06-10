import type { HeaderState } from "./store";
import type { Action } from "./utils";

export type HeaderAction = Action<"SET_ITEMS", HeaderState["items"]>;
