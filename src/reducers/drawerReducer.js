import { HANDLE_DRAWER } from '../actions/actionTypes';

export const drawerReducer = (state = false, action) => {
  switch (action.type) {
    case HANDLE_DRAWER:
      return !state;
    default:
      return state;
  }
};
