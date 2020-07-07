import { combineReducers } from 'redux';
import { modalReducer } from './modalReducer';
import { queryReducer } from './queryReducer';
import { drawerReducer } from './drawerReducer';
import { searchOptionsReducer } from './searchOptionsReducer';

const reducers = combineReducers({
  modalReducer,
  queryReducer,
  drawerReducer,
  searchOptionsReducer,
});

export default reducers;
