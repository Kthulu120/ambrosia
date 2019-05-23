// @flow
import { Game } from "../internals/Games/Game";
import { GetState, Dispatch } from '../reducers/types';
import {GameModel} from './../index'
export const SET_CLOUD_GAMES = 'SET_CLOUD_GAMES';
export const SET_INSTALLED_GAMES = 'SET_INSTALLED_GAMES';

export function setInstalledGames(games: Array<Game>) {
  return {
    type: SET_INSTALLED_GAMES,
    games
  };
}

// check for installed games and add them to redux
export function setInstGamesRedux() {
  return (dispatch: Dispatch, getState: GetState) => {
    // Initiate Search
    const all_games = GameModel.fetchAll().then((collection) =>{
      const game_list = []
      collection.forEach(element => {
        game_list.push(Game.ModelToGameFactory(element))
      });
      dispatch(setInstalledGames(game_list));
    })

  };
}

export function incrementAsync(delay: number = 1000) {
  return (dispatch: Dispatch) => {
    setTimeout(() => {
      dispatch(setInstalledGames([]));
    }, delay);
  };
}
