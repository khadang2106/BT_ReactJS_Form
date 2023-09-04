import { combineReducers, createStore } from 'redux';
import { studentReducer } from './reducers/studentReducer';

const rootReducer = combineReducers({
  studentReducer,
});

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
