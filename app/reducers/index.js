// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import library from './libraryHome';
import global from './global'
export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    library,
    global
  });
}
