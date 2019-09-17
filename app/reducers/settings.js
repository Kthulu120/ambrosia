// @flow
import { SET_INSTALLED_LAUNCHERS, SET_GAME_LIBRARIES } from '../actions/settings';
import type { Action } from './types';

const stateobj = {
  installed_launchers: [],
  game_libraries: []
}

export default function settings(state: Object = stateobj, action: Action) {
  switch (action.type) {
    case SET_INSTALLED_LAUNCHERS:
      return Object.assign({}, state, {
        installed_launchers: action.installed_launchers
      })
    case SET_GAME_LIBRARIES:
        return Object.assign({}, state, {
          game_libraries: action.game_libraries
        })
    default:
      return state;
  }
}
