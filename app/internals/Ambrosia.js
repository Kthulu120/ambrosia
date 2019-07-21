// @flow
import Settings from "./Core/Settings/Settings"


export default class Ambrosia {

  id: number | string;

  name: string;

  platform: Platform;

  settings: Object;

  login: string

  client: KnexClient

  constructor(){
    this.settings = new Settings()
  }
}
