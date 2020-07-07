import { HANDLE_MODAL } from '../actions/actionTypes';

const initialState = {
  modalOpen: false,
  game: {},
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_MODAL:
      return {
        ...state,
        modalOpen: !state.modalOpen,
        game: action.payload ? action.payload : {},
      };
    default:
      return state;
  }
};
