// @flow
import type { GetState, Dispatch } from '../reducers/types';
import GameGal from './../internals/Core/gamegal'
import LauncherModel from './../internals/Models/Launcher'
import AmbrosiaApp from '../internals/AmbrosiaApp';

export const ADD_LAUNCHER = 'ADD_LAUNCHER';
export const REMOVE_LAUNCHER = 'REMOVE_LAUNCHER';
export const SET_INSTALLED_LAUNCHERS = 'SET_INSTALLED_LAUNCHERS'
export const SET_GAME_LIBRARIES = 'SET_GAME_LIBRARIES'

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

export function setGameLibraries(game_libraries) {
  return {
    type: SET_GAME_LIBRARIES,
    game_libraries
  };
}

export function setInstalledLaunchersRedux() {
  return async (dispatch: Dispatch, getState: GetState) => {
    await GameGal.fetchAll('Launcher').then((collection) => {
      dispatch(setInstalledLaunchers(collection))
    })
  };
}


export function loadGameLibraries() {
  return async (dispatch: Dispatch, getState: GetState) => {
    await GameGal.fetchAll('GameLibrary').then((collection) => {
      dispatch(setInstalledLaunchers(collection))
    })
  };
}

export function createLauncherModel(launcher_name: String, launcher_flags: String, executable_path: String, game_libraries: Array | null) {
  return async (dispatch: Dispatch, getState: GetState) => {
    const state = getState()
    const {installed_launchers} = state.settings
    const existing_libraries = state.settings.game_libraries
    const alreadyExists = installed_launchers.some((ele) => ele.get('name') === launcher_name)
    if(!alreadyExists){
      const launcher = GameGal.create('Launcher', { path_to_launcher: executable_path, name: launcher_name, flags: launcher_flags })
      installed_launchers.push(launcher)
      dispatch(addLauncher(launcher))
      if (game_libraries) {
        game_libraries.forEach(async (library_path) => {
        const path_already_exists = existing_libraries.some((existing_library_model) => existing_library_model.get('file_path') === library_path)
        const saved_game = await GameGal.create('Game', {'file_path': file_path, 'metacritic_score': game.metacritic_score, })
        installed_games.push(saved_game)
        dispatch(setInstalledGames(installed_games))
        });
      }
    }
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
