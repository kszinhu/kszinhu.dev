import type { HeaderActions } from '../../../types/context/header';
import type { HeaderState } from '../../../types/context/store';
import type { AppReducer } from '../../../types/context/utils';

const HeaderReducer: AppReducer<HeaderState, HeaderActions> = (state, action) => {
  switch (action.type) {
    case 'SET_ITEMS':
      return {
        ...state,
        items: action.payload,
      };
    case 'TOGGLE_OPENED':
      return {
        ...state,
        opened: action.payload,
      };
    default:
      return state;
  }
};

export default HeaderReducer;
