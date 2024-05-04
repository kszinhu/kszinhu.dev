import type { AppDispatch, AppState, AdditionalAppParameters } from '../../../types/context/utils';
import type { RemoveItemsByTypes } from '../../../types/utils';
import * as headerActions from './header';

const PrepareAction = <T extends Record<string, (...args: any[]) => any>>(
  action: T,
  dispatch: AppDispatch<any>,
  store: AppState<any>
) => {
  // pass dispatch to each action creator to create a new function with dispatch bound
  const boundActions = Object.keys(action).reduce(
    (acc, key) => {
      acc[key] = (...args: any[]) => action[key](...args, dispatch, store);
      return acc;
    },
    {} as Record<string, (...args: any[]) => any>
  );

  return boundActions as {
    [K in keyof T]: (
      ...args: [RemoveItemsByTypes<Parameters<T[K]>, AdditionalAppParameters<any, any>>]
    ) => ReturnType<T[K]>;
  };
};

const Actions = (dispatch: AppDispatch<any>, store: AppState<any>) =>
  PrepareAction<typeof headerActions>(headerActions, dispatch, store);

export default Actions;
