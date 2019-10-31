// @flow

import os from 'os'
import fs from 'fs'
import {store} from './../../../index'
import {setInstalledGames} from './../../../actions/library'
import ParsingService from './../../Games/ParsingService'
import GameGal from './../gamegal'
import FileSystem from './../FileSystem'


const OSType = os.type()
const NONGAMES = ["Steamworks Common Redistributables"]

export default class Steam {

  static commitSearchTransaction(){
    const vdfFiles = FileSystem.readFilesFromFolder(Steam.getDefaultSteamAppsLoc(), ['acf'])
    this.readVdfGames(vdfFiles)
  }

  static async readVdfGames(filepaths){
    const {library} = store.getState()
    const {installed_games} = library
    filepaths.forEach(filePath => {
      fs.readFile(filePath, {encoding: 'utf-8'}, async function(err,data){
        if (!err) {
          //console.log('received data: ' + data);
          const name = Steam.getVdfValue("name", data)
          const appid = Steam.getVdfValue("appid", data)
          const doesExist = await GameGal.find('Game', {launcher_id: appid})
          if(NONGAMES.includes(name) || doesExist){
            return
          }
          const foundGame = await ParsingService.matchGameFromPath(name + ".extension")
          let saved_game;
          if(foundGame){
            saved_game = await GameGal.create('Game', { title:name, launcher_name: 'Steam',
                                launcher_id: appid, nectar_id: foundGame.database_id })
          }else{
            // cant match so use existing file information
            saved_game = await GameGal.create('Game', {launcher_id: appid, title: name, launcher_name: 'Steam' })
          }
          await GameGal.fetchAll('Game').then((collection) => {
            store.dispatch(setInstalledGames(collection + [saved_game]))
          })
        } else {
            console.error(err);
        }
      })
    });
  }


  static getVdfValue(key, text){
    var lines = text.split("\n"); // create array of lines
    let value = null
    lines.forEach((line) => {
      if (line.includes(key)){
        const foundLine = line.replace(`"${key}"`, "").replace(/"/gi, "")
        value  = foundLine.trim()
        console.log(value)
      }
    })
    return value
  }


  static getDefaultSteamAppsLoc(){
    switch(OSType){
      case 'Windows_NT':
        return "C:/Program Files (x86)/Steam/steamapps"
      case 'Linux':
        return ""
      case 'Darwin': // MacOS
        return "~/Library/Application Support/Steam/SteamApps/"
      default:
        return "C:/Program Files (x86)/Steam/steamapps"
    }
  }



}
