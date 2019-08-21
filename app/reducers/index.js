// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import library from './libraryHome';
import global from './global'
import settings from './settings'

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    library,
    settings,
    global
  });
}
