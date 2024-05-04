import { StoreState } from './store';

export type Action<T extends string, P = undefined> = {
  type: T;
  payload: P;
};

export type AppReducer<S, A extends Action<string, any>> = (state: S, action: A) => S;

export type AppDispatch<A extends Action<string, any>> = (action: A) => void;
export type AppState<N extends string> = StoreState[N] & StoreState;
export type AdditionalAppParameters<A extends Action<string, any>, N extends string> = [
  AppState<N>,
  AppDispatch<A>,
];
