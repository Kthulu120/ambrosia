// @flow
import type { GetState, Dispatch } from '../reducers/types';
import GameGal from './../internals/Core/gamegal'
import LauncherModel from './../internals/Models/Launcher'

export const ADD_LAUNCHER = 'ADD_LAUNCHER';
export const REMOVE_LAUNCHER = 'REMOVE_LAUNCHER';
export const SET_INSTALLED_LAUNCHERS = 'SET_INSTALLED_LAUNCHERS'

export function addLauncher(launcher) {
  return {
    type: ADD_LAUNCHER,
    launcher
  };
}

export function removeLauncher(launcher_id) {
  return {
    type: REMOVE_LAUNCHER,
    launcher_id
  };
}

export function setInstalledLaunchers(installed_launchers) {
  return {
    type: SET_INSTALLED_LAUNCHERS,
    installed_launchers
  };
}

export function createLauncherModel(launcher_name: String, launcher_flags: String, executable_path: String) {
  return (dispatch: Dispatch, getState: GetState) => {
    const state = getState()
    const {installed_launchers} = state.settings
    const launcher = GameGal.create('Launcher', { path_to_launcher: executable_path, name: launcher_name, flags: launcher_flags })
    installed_launchers.push(launcher)
    dispatch(addLauncher(launcher))
  }
}

export function deleteLauncherModel(launcher: LauncherModel) {
  return (dispatch: Dispatch, getState: GetState) => {
    const state = getState()
    const {installed_launchers} = state.settings
    launcher.destroy()

    dispatch(setInstalledLaunchers(installed_launchers.filter(ele => ele.get('id') !== launcher.get('id'))))
  }
}

export function incrementAsync(delay: number = 1000) {
  return (dispatch: Dispatch) => {
    setTimeout(() => {
      dispatch(increment());
    }, delay);
  };
}
