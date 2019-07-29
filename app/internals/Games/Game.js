import { LauncherModel } from "../..";
import {knexClient, GameModel} from './../../index';

// @flow

export class Game{

  id: number | string;
  name: string;
  platform: Platform;
  nectar_id: string
  file_path: string;
  alternativePlatforms: Array<string>;
  launcher_model: Object;
  launcher_id: string | number | null;
  cover_img: string | null
  launcher_name: string



  constructor(id: number, name: string, nectar_id: string, file_path: string, launcher_model: Object){
    this.id = id;
    this.name = name;
    this.nectar_id = nectar_id;
    this.file_path = file_path;
    this.launcher_model = launcher_model;
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
          console.error("Could Not Execute Game ${this.name}")
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
  save(){
    let element = await GameModel.where({nectar_id: this.nectar_id}).fetch()
    if(element == null){
      element = await GameModel.forge({ nectar_id:this.id, launcher_name:this.launcher_name, platform_name: this.platform, title: this.name, file_path: this.file_path, launcher_id: this.launcher_id}).save().error(err => console.error(err))
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

  find_by_id(id: string): GameModel{
    return await GameModel.where({id: id}).fetch()
  }



  static ModelToGameFactory(game_model: Game){
    const g = new Game (
      game_model.get('id'),
      game_model.get('title'),
      game_model.get('nectar_id'),
      game_model.get('file_path'),
      game_model,
    )
    g.launcher_id = game_model.get('launcher_id')
    g.cover_img = game_model.get('cover_img')
    return g;
  }



}

export const platforms =  {
  "PlayStation 1": "PlayStation 1",
  "PlayStation 2": "PlayStation 2",
  "PlayStation 3": "PlayStation 3",
  "PlayStation 4": "PlayStation 4",
  "PS Vita": "PS Vita",
  "Xbox 360": "Xbox 360",
  "Xbox": "Xbox",
  "Xbox One": "Xbox One",
  "Playstation Portable": "Playstation Portable",
  "Wii": "Wii",
  "PC": "PC",
  "Wii U": "Wii U",
  "Nintendo Switch": "Nintendo Switch",
  'Mac OS': 'Mac OS',
  'Linux': 'Linux',
  'iOS': 'iOS',
  'Android': 'Android',
  'Nintendo 3DS': "Nintendo 3DS",
  "Nintendo DS": "Nintendo DS",
  "Nintendo DSi": "Nintendo DSi",
  'GameCube': 'GameCube',
  'Nintendo 64': 'Nintendo 64',
  "Game Boy Advance": 'Game Boy Advance',
  'Game Boy Color': "Game Boy Color",
  'Game Boy': 'Game Boy',
  'SNES': 'SNES',
  'NES': 'NES',
  'Original Macintosh':'Original Macintosh',
  'Apple': 'Apple',
  'Commodore/Amiga':'Commodore / Amiga',
  "Atari 7800": "Atari 7800",
  "Atari 5200":"Atari 5200",
  "Atari 2600":"Atari 2600",
  "Atari Flashback":"Atari Flashback",
  "Atari 8-bit":"Atari 8-bit",
  "Atari ST":"Atari ST",
  "Atari Lynx": "Atari Lynx",
  "Atari XEGS": "Atari XEGS",
  "Genesis": "Genesis",
  "SEGA Saturn": "SEGA Saturn",
  "SEGA CD": "SEGA CD",
  "SEGA 32X":"SEGA 32X",
  "SEGA Master System": "SEGA Master System",
  "Dreamcast": "Dreamcast",
  "3DO": "3DO",
  "Jaguar": "Jaguar",
  "Game Gear": "Game Gear",
  "Nat Geo": "Nat Geo",
  "Web": "Web"
}

export type Platform = $Keys<typeof platforms>;

