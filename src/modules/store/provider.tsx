import { createContext, useContext, useMemo, useReducer } from 'react';

import type { StoreState } from '../../types/context/store';
import Actions from './actions';
import AppReducer from './reducers';

type StoreProviderProps = React.PropsWithChildren<object>;
type StoreContext = {
  state: StoreState;
  actions: ReturnType<typeof Actions>;
};

const StoreContext = createContext({} as StoreContext);

const initialState = {
  header: { items: [], opened: false },
  jobs: {},
  projects: {},
  skills: {},
  testimonials: {},
  contact: {},
} as StoreState;

const StoreProvider: React.FC<StoreProviderProps> = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const memoizedActions = useMemo(() => Actions(dispatch, state), [dispatch, state]);
  const memoizedState = useMemo(() => state, [state]);

  return (
    <StoreContext.Provider value={{ state: memoizedState, actions: memoizedActions }} {...props} />
  );
};

const useStore = () => {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }

  return context;
};

export { useStore, StoreProvider };
