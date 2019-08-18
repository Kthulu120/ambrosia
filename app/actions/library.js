/* eslint-disable promise/always-return */
// @flow
import { Game } from "../internals/Games/Game";
import { GetState, Dispatch } from '../reducers/types';
import GameModel from './../internals/Models/Game'
import slash from './../internals/Core/slash'
import AmbrosiaApp from './../internals/AmbrosiaApp'
import GameGal from './../internals/Core/gamegal'

import ParsingService from "../internals/Games/ParsingService";

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
    const installed_games = state.library.installed_games
    const gameExists = await GameGal.find('Game', { file_path })
    if(!gameExists) {
      const game = ParsingService.matchGameFromPath(file_path)
      if (game){
        const saved_game = await GameGal.create('Game', {'file_path': file_path, 'metacritic_score': game.metacritic_score, })
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
