import {
  HANDLE_MODAL,
  SET_QUERY,
  CLEAN_QUERY,
  SEARCH_OPTIONS,
  CLEAR_SEARCH_OPTIONS,
  HANDLE_DRAWER,
} from './actionTypes';

export const handleModal = (payload) => {
  return {
    type: HANDLE_MODAL,
    payload,
  };
};

export const setQuery = (payload) => {
  return {
    type: SET_QUERY,
    payload,
  };
};
export const cleanQuery = (payload) => {
  return {
    type: CLEAN_QUERY,
    payload,
  };
};
export const searchOptions = (payload) => {
  return {
    type: SEARCH_OPTIONS,
    payload,
  };
};
export const clearSearchOptions = () => {
  return {
    type: CLEAR_SEARCH_OPTIONS,
  };
};
export const handleDrawer = () => {
  return {
    type: HANDLE_DRAWER,
  };
};
