/* eslint-disable promise/always-return */
// @flow
import { Game } from "../internals/Games/Game";
import { GetState, Dispatch } from '../reducers/types';
import GameModel from './../internals/Models/Game'
import slash from './../internals/Core/slash'
import AmbrosiaApp from './../internals/AmbrosiaApp'
import GameGal from './../internals/Core/gamegal'
import FileSystem from './../internals/Core/FileSystem'
import ParsingService from "../internals/Games/ParsingService";
import {store} from './../index'


export const SET_CLOUD_GAMES = 'SET_CLOUD_GAMES';
export const SET_INSTALLED_GAMES = 'SET_INSTALLED_GAMES';

export function setInstalledGames(games: Array<Game>) {
  return {
    type: SET_INSTALLED_GAMES,
    games
  };
}

// check for installed games and add them to redux
export function setInstalledGamesRedux() {
  return async (dispatch: Dispatch, getState: GetState) => {
    await GameGal.fetchAll('Game').then((collection) => {
      dispatch(setInstalledGames(collection))
    })
  };
}


export function addVideoGame(file_path, launcher_name) {
  return async (dispatch: Dispatch, getState: GetState) => {
    const state = getState()
    let installed_games = state.library.installed_games
    const gameExists = await GameGal.find('Game', { file_path })
    if(!gameExists) {
      const game = await ParsingService.matchGameFromPath(file_path)
      if (game){
        const saved_game = await GameGal.create('Game', {title: game.title, 'file_path': file_path,
                              launcher_name: launcher_name, nectar_id: game.database_id})
        installed_games.push(saved_game)
        dispatch(setInstalledGames(installed_games))
      }else{
        const saved_game = await GameGal.create('Game', {title: FileSystem.getFilename(file_path), 'file_path': file_path, launcher_name: launcher_name })
        installed_games.push(saved_game)
        dispatch(setInstalledGames(installed_games))
      }
    }
  }
}

export function validateAddedGame(fullPath,  launcher) {
  const settingsFolders = AmbrosiaApp.get('gameLibraries')
  const doesExist = settingsFolders.some(ele => fullPath === ele)
  if(!doesExist) {
    AmbrosiaApp.settings.addGameLibrary(Game.gameModelToGame())
  }
}

export function incrementAsync(delay: number = 1000) {
  return (dispatch: Dispatch) => {
    setTimeout(() => {
      dispatch(setInstalledGames([]));
    }, delay);
  };
}


export async function intiateGameSearch(installed_libraries=[]){
  // search game libraries
  const { settings } = store.getState()
  let installed_games
  await GameGal.fetchAll('Game').then((collection) => {
      installed_games = collection
    })
  const {game_libraries} = settings
  installed_libraries = game_libraries && !installed_libraries ? game_libraries : installed_libraries
  installed_libraries.forEach(element => {
    const files = FileSystem.getAllFilesSync(element.file_path,{fileExtensions: FileSystem.getFileExtensionForLauncher(element.launcher)})
    // loop over games see if games alreayExist in DB if not create new game
    files.forEach(async (f) => {
      const alreadyExists = installed_games.find((existingGame) => existingGame.get('file_path') === f.path)
      if(!alreadyExists){
        // see if we can match game for additional info
        const foundGame = await ParsingService.matchGameFromPath(f.path)
        let saved_game;
        if(foundGame){
          saved_game = await GameGal.create('Game', { title: foundGame.title, 'file_path': slash(f.path),
                              launcher_name: element.get('launcher_name'), nectar_id: foundGame.database_id })
        }else{
          // cant match so use existing file information
          saved_game = await GameGal.create('Game', {'file_path': slash(f.path), title: f.name, launcher_name: element.get('launcher_name') })
        }
        installed_games.push(saved_game)
        store.dispatch(setInstalledGames(installed_games))
      }
    })
  });
}
