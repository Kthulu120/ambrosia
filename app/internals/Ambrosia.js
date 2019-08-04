// @flow
import Settings from "./Core/Settings/Settings"
import Library from './Core/Library/Library'

export default class Ambrosia {

  id: number | string;

  name: string;

  settings: Settings;

  login: string

  client: KnexClient

  constructor(){
    this.settings = new Settings()
    this.library = new Library()
  }

  // Bootstraps app and sets up core
  _bootstrap (){

    




  }
}
