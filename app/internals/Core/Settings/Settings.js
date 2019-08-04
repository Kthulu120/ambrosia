// @flow

export default class Settings{

  constructor(file_path: string){
    this.settings = {}
    this._file_path = file_path || "resources/ambrosia-settings.json"
    this.settings = this._readFromSettingsFile()
  }

  _readFromSettingsFile(settings: Object): Object{
    const fs = require("fs");
    const contents = fs.readFileSync(this._file_path, 'utf-8');
    return JSON.parse(contents)
  }

  _writeToSettingsFile(){
    const fs = require("fs");
    const contents = fs.writeFileSync(this._file_path, this.settings);
    this.settings = JSON.parse(contents);
  }

  set(setting_name: string, value: any){
    this.settings[setting_name] = value
    this._writeToSettingsFile(this.settings.toString())
  }

  get(setting_name: string){
    return this.settings[setting_name]
  }

  read(){
    return this.settings
  }

  addGameLibrary(launcher_name: String, file_path: string): void{
    if (!launcher_name && !file_path) return
    const gameLibraries = this.get('gameLibraries')
    const alreadyExists = gameLibraries.some((ele) => ele.file_path === file_path)
    if(!alreadyExists){
      gameLibraries.push({
        launcher: launcher_name,
        file_path: file_path
      })
      this.set('gameLibraries', gameLibraries)
    }
  }

}

