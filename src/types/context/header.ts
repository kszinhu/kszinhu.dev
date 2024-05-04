import type { HeaderState } from './store';
import type { Action } from './utils';

export type HeaderActions =
  | Action<'SET_ITEMS', HeaderState['items']>
  | Action<'TOGGLE_OPENED', boolean>;
