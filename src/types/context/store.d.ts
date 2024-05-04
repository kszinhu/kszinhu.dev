import type { NavItem } from '../components/header';
import type { HeaderAction } from './header';

export interface HeaderState {
  items: NavItem[];
  opened: boolean;
}

export type AppActions = HeaderAction;

export interface StoreState {
  header?: HeaderState;
}
