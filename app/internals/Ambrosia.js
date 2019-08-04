// @flow
import Settings from "./Core/Settings/Settings"

export default class Ambrosia {

  id: number | string;

  name: string;

  settings: Settings;

  login: string

  client: KnexClient

  constructor(){
    this.settings = new Settings()
  }
}
