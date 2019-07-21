// @flow

export default class Settings{

  constructor(file_path: string){
    this.settings = {}
    this._file_path = file_path || "resources/ambrosia-settings.json"
    this.settings = this._readFromSettingsFile()
  }

  _readFromSettingsFile(settings: Object){
    const fs = require("fs");
    const contents = fs.readFileSync(this._file_path, 'utf-8');
    return JSON.parse(contents)
  }

  _writeToSettings(){
    const fs = require("fs");
    const contents = fs.writeFileSync(this._file_path, this.settings);
    this.settings = JSON.parse(contents);
  }

  set(setting_name: string, value: any){
    this.settings[setting_name] = value
    this._writeToSettings(this.settings.toString())
  }

  get(setting_name: string){
    return this.settings[setting_name]
  }

  read(){
    return this.settings
  }

}

