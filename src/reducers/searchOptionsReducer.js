import { SEARCH_OPTIONS, CLEAR_SEARCH_OPTIONS } from '../actions/actionTypes';

const initialState = [];

export const searchOptionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_OPTIONS:
      state = [];
      action.payload.forEach((game) => {
        state.push({ value: game.name });
      });
      return state;
    case CLEAR_SEARCH_OPTIONS:
      return [];
    default:
      return state;
  }
};
