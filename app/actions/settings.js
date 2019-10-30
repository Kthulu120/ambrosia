// @flow
import type { GetState, Dispatch } from '../reducers/types';
import GameGal from './../internals/Core/gamegal'
import LauncherModel from './../internals/Models/Launcher'
import AmbrosiaApp from '../internals/AmbrosiaApp';
import { intiateGameSearch } from './library';

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
      if(collection){
        intiateGameSearch(collection)
        dispatch(setGameLibraries(collection))
      }
    })
  };
}

/**
 * Takes in launcher attributes and creates a launcher model and its game_libraries
 * @param {string} launcher_name
 * @param {string} launcher_flags
 * @param {string} executable_path
 * @param {array<string>} game_libraries
 */
export function createLauncherModel(launcher_name: String, launcher_flags: String, executable_path: String, game_libraries: Array | null) {
  return async (dispatch: Dispatch, getState: GetState) => {
    const state = getState()
    const {installed_launchers} = state.settings
    const existing_libraries = state.settings.game_libraries
    const alreadyExists = installed_launchers.some((ele) => ele.get('name') === launcher_name)
    if(!alreadyExists){
      const launcher =await GameGal.create('Launcher', { path_to_launcher: executable_path, name: launcher_name, flags: launcher_flags })
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



export function addGameLibrary(file_path: String, launcher_name: String){
  return async(dispatch: Dispatch, getState: GetState) => {
    const state = getState()
    const { game_libraries } = state.settings
    const pathAlreadyExists = game_libraries.some((lib) => lib.file_path == file_path)
    if(!pathAlreadyExists){
      const created_library = await GameGal.create('GameLibrary', {'file_path': file_path, 'launcher_name': launcher_name })
      game_libraries.push(created_library)
      dispatch(setGameLibraries(game_libraries))
      intiateGameSearch(game_libraries)
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

export function deleteGameLibrary(game_library: LauncherModel) {
  return (dispatch: Dispatch, getState: GetState) => {
    const state = getState()
    const {game_libraries} = state.settings
    game_library.destroy()
    dispatch(setGameLibraries(game_libraries.filter(ele => ele.get('file_path') !== game_library.get('file_path'))))
  }
}

export function incrementAsync(delay: number = 1000) {
  return (dispatch: Dispatch) => {
    setTimeout(() => {
      dispatch(increment());
    }, delay);
  };
}
