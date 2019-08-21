// @flow
import { SET_INSTALLED_LAUNCHERS } from '../actions/settings';
import type { Action } from './types';

const stateobj = {
  installed_launchers: [],
}

export default function settings(state: Object = stateobj, action: Action) {
  switch (action.type) {
    case SET_INSTALLED_LAUNCHERS:
      return Object.assign({}, state, {
        installed_launchers: action.installed_launchers
      })
    default:
      return state;
  }
}
