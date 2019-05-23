// @flow
import { SET_INSTALLED_GAMES } from '../actions/library';
import type { Action } from './types';

const stateobj = {
  installed_games: [],
}

export default function library(state: Object = stateobj, action: Action) {
  switch (action.type) {
    case SET_INSTALLED_GAMES:
      return Object.assign({}, state, {
        installed_games: action.games
      })
    default:
      return state;
  }
}
