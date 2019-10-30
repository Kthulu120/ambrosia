// @flow
import Game from './Game'
import FileSystem from '../Core/FileSystem'
import {platform} from 'os'
import Parser from '../Core/Parser'
const axios = require('axios');
import { AmbrosiaApp } from '../AmbrosiaApp'

export default class ParsingService {

  // gets files from folders and determines which are video games
  static parseGamesFromFolder(libraries: Array<string>, launcher_name:string, gamePlatform: string): Array<Game>{
    const files = []
    // TODO: move to parallel file searching
    // grab files for each folder
    libraries.forEach((folder) => {
      const folderFiles = []
      FileSystem.walkDir(folder.file_path, (ele) => {
      const fileInfo = FileSystem.checkFileInfo(ele, ["dmg", "exe", "iso"], true)
      if (fileInfo) {
        folderFiles.push(fileInfo)
      }
      })
      const gFiles = this._findGamesInFolder(folderFiles)
      gFiles.forEach(ele => files.push(ele))
    })
    const games = files.map(ele => {
      let g = this._matchGameWithFile(ele, gamePlatform)
      if (g){
        g.launcher_name = launcher_name
        return g
      }
    })
    return games
  }

  // finds games based off title and file size
  static _findGamesInFolder(files): Array<Object> {
    const gameFiles = []
    files.forEach((file) => {
      const filesSameFolder = files.filter(f => f.folder == file.folder)
      if (filesSameFolder.length == 1) {
        gameFiles.push(file)
      }
      else{
        const largerFileExists = filesSameFolder.some((ele) => file.size < ele.size)
        !largerFileExists ? gameFiles.push(file) : null
      }
    })
    return gameFiles
  }

  static async _matchGameWithFile(file: Object, platform: string=""): Game{
    const {title, year} = Parser.parseGameTitle(file.name)
    const data = await axios.get('http://127.0.0.1:8000/search/game', {
          params: {
            "year": year,
            "title":title,
            platform
          }
    }).then(res => res.data)
    const {gameSearch}: Object = data
    if (gameSearch.length != 0){
      const primaryChoice = gameSearch[0]
      const id: number = primaryChoice.id
      const name: string = primaryChoice.name
      const g  = new Game({id, name, file_path: file.file_path});
      g.platform = platform
      return g
    } else {
      return null
    }
  }

  static async matchGameFromPath(file_path, platform=""): Game {
    const found_game = await new Promise(async function(resolve, reject){
      const {title, year} = Parser.parseGameTitle(file_path)
      let data = await axios.get('http://127.0.0.1:8000/search/game', {
            params: {
              "year": year,
              "title":title,
              platform: platform
            }
      }).then(res => {
        console.log(res)
        let responseData = JSON.parse(res.data)
        const {gameSearch}: Object = responseData
        if (gameSearch.length != 0){
        const primaryChoice = gameSearch[0]
        const id: number = primaryChoice.id
        const name: string = primaryChoice.name
        const g  = new Game({id, title:name, file_path: file_path});
        resolve(g)
        } else {
        resolve(null)
        }
      })
    })

    if(found_game){
      return found_game
    }
    return null
  }
}
