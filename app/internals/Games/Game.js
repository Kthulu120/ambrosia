// @flow
import LauncherModel from "./../Models/Launcher";
import { knexClient } from './../database'
import type Platform from './../Platform/Platform'
import GameModel from './../Models/Game';

export class Game {

  database_id: number | string;
  title: string;
  platform: Platform;
  nectar_id: string;
  file_path: string;
  alternativePlatforms: Array<string>;
  launcher_model: Object;
  launcher_id: string | number | null;
  cover_img: string | null;
  launcher_name: string;
  platform_name: string;

  constructor({id, title, nectar_id, file_path, db_model, cover_img, launcher_name}){
    this.database_id = id || null
    this.title = title;
    this.nectar_id = nectar_id || null;
    this.file_path = file_path;
    this.db_model = db_model || null;
    this.launcher_name = launcher_name || null
    this.cover_img = cover_img || null

  }

  set id (value) {
    console.warn('Cannot overwrite id of Game, must call _setID to override id')
  }

  async __onSaveDatabaseProp(prop, value){
    if(this.db_model) {
      await this.db_model.set({[prop] : value })
      this[prop] = value
    }
    else{
      this[prop], value
    }
  }

  set name(value: String){
    this.__onSaveDatabaseProp('name', value)
  }

  set file_path(value: String){
    this.__onSaveDatabaseProp('file_path', value)
  }

  set platform_name(value: String){
    this.__onSaveDatabaseProp('platform_name', value)
  }

  set launcher_name(value: String){
    this.__onSaveDatabaseProp('launcher_name', value)
  }

  set cover_img(value: String){
    this.__onSaveDatabaseProp('cover_img', value)
  }

  _setID (id: string) {
    this.id = id
  }

  launch() {
    this.getLauncher().then((launcher_model) => {
      const { exec } = require('child_process');
      let launchcommand = "";
      if(launcher_model != null && launcher_model.attributes.name == "Steam" && this.launcher_id != null){
        launchcommand = `"${launcher_model.attributes.path_to_launcher}" -applaunch ${this.launcher_id} -no-browser`;
      }else{
        launchcommand = `"${launcher_model.attributes.path_to_launcher}" "${this.file_path}"`
      }
      exec(launchcommand, (err, stdout, stderr) => {
          if (err) {
          // node couldn't execute the command
          console.error("Could Not Execute Game ${this.title}")
          return;
        }

        // the *entire* stdout and stderr (buffered)
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
      });
          })
    }

  // get launcher model associated with game
  async getLauncher(){
    return knexClient.select('*')
    .from('launchers_games')
    .where({game_id: `${this.id}`}).then((rows) => {
      if(rows.length > 0){
        return LauncherModel.where({id: rows[0].launcher_id}).fetch().then((element) =>{
          if(element != null){
            return element
          }
        })
      }
    })
  }

  // persist Game
  async save(){
    let element = await GameModel.where({nectar_id: this.nectar_id}).fetch()
    if(element == null){
      element = await GameModel.forge({ nectar_id:this.id, launcher_name:this.launcher_name, platform_name: this.platform, title: this.title, file_path: this.file_path, launcher_id: this.launcher_id}).save().error(err => console.error(err))
      let platform_id = null
      Object.keys(platforms).forEach(function(key, index) {
        if (platforms[key] === g.platform){
            platform_id = index + 1
        }
      });
      if(platform_id != null){
          // Update Platform Game Junction Table
          element.platforms().attach(platform_id)
      }
    }
  }

  async find_by_id(id: string): GameModel{
    return await GameModel.where({id: id}).fetch()
  }

  // Converts GameModel to Game
  static modelToGame(game_model) {
    return new Game ({
      id: game_model.attributes['id'],
      title: game_model.get('title'),
      nectar_id: game_model.get('nectar_id'),
      file_path: game_model.get('file_path'),
      cover_img: game_model.get('cover_img'),
      db_model: game_model,
    })
  }



}

export default Game
