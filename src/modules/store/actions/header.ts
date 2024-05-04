import type { HeaderActions } from '../../../types/context/header';
import type { HeaderState, StoreState } from '../../../types/context/store';
import type { AppDispatch } from '../../../types/context/utils';

const setItems = (items: HeaderState['items'], dispatch: AppDispatch<HeaderActions>) => {
  dispatch({
    type: 'SET_ITEMS',
    payload: items,
  });
};

const toggleOpened = (
  _: React.MouseEvent,
  dispatch: AppDispatch<HeaderActions>,
  state: StoreState
) => {
  dispatch({
    type: 'TOGGLE_OPENED',
    payload: !state.header?.opened,
  });
};

export { setItems, toggleOpened };
