import { SET_QUERY, CLEAN_QUERY } from '../actions/actionTypes';

const initialState = {
  page: 1,
  category: '',
  search: '',
};

export const queryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_QUERY:
      return {
        ...state,
        [action.payload.param]: action.payload.query,
      };
    case CLEAN_QUERY:
      for (let param of action.payload) {
        state = {
          ...state,
          [param]: param === 'page' ? 1 : '',
        };
      }
      return state;
    default:
      return state;
  }
};
