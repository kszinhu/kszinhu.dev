import { AppDispatch } from "../../../types/context/utils";
import * as headerActions from "./header";

const PrepareAction = <T extends Record<string, (...args: any[]) => any>>(
  action: T,
  dispatch: AppDispatch<any>
) => {
  // pass dispatch to each action creator to create a new function with dispatch bound
  const boundActions = Object.keys(action).reduce((acc, key) => {
    acc[key] = (...args: any[]) => action[key](...args, dispatch);
    return acc;
  }, {} as Record<string, (...args: any[]) => any>);

  return boundActions as { [K in keyof T]: (...args: any[]) => any };
};

const Actions = (dispatch: AppDispatch<any>) =>
  PrepareAction<typeof headerActions>(headerActions, dispatch);

export default Actions;
