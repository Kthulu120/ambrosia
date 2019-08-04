// @flow
import { Game } from "../../Games/Game";
import {GameLauncher, launchers } from "../Launchers"
import GameModel from './../../Models/Game'

export default class Library {

  games: Array<Game>
  launchers: GameLauncher


  constructor(games=[]){
    this.games = games || GameModel.allGames().map((game_model) => Game.gameModelToGame(game_model))
  }

  setGames(games: Array<Game>): void {
    this.games = games
    this.launchers = launchers
  }

  // Search Games by name
  findGameByName(search: string){
    this.games.filter((game) => game.title.includes(search))
  }
}

