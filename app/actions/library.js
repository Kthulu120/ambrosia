// @flow
import type { Game } from "../internals/Games/Game";
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
    const { games } = getState();
    const all_games = GameModel.fetchAll()
    console.log(all_games)
    dispatch(setInstalledGames(all_games));
  };
}

export function incrementAsync(delay: number = 1000) {
  return (dispatch: Dispatch) => {
    setTimeout(() => {
      dispatch(setInstalledGames([]));
    }, delay);
  };
}
