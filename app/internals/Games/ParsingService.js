// @flow
import Game from './Game'
import FileSystem from '../Core/FileSystem'
import {platform} from 'os'
import Parser from '../Core/Parser'
const axios = require('axios');
import { AmbrosiaApp } from '../../index'
const axios = require('axios');

export default class ParsingService {

  // gets files from folders and determines which are video games
  static parseGamesFromFolder(launcher_name:string, gamePlatform: string): Array<Game>{
    const libraries = AmbrosiaApp.settings.get('gameLibraries')
    const files = []
    // TODO: maove to parallel file searching
    // grab files for each folder
    libraries.forEach((folder) => files.concat(this._findGamesInFolder(FileSystem.getAllFilesSync(folder.file_path, {withSha: true}))))
    const games = files.map(ele => {
      let g = this._matchGameWithFile(ele, gamePlatform)
      g.launcher_name = launcher_name
      return g
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
        const isLargest = filesSameFolder.some((ele) => file.size < ele.size)
        isLargest ? gameFiles.push(file) : null
      }
    })
    return gameFiles
  }

  static _matchGameWithFile(file: Object, platform: string=""): Game{
    const {title, year} = Parser.parseGameTitle(file.name)
    const response = await axios.get('http://127.0.0.1:8000/search/game', {
          params: {
            "year": year,
            "title":title,
            platform
          }
    })
    const { data } = response
    const {gameSearch}: Object = data
    if (gameSearch.length != 0){
      const primaryChoice = gameSearch[0]
      const id: number = primaryChoice.id
      const name: string = primaryChoice.name
      const g  = new Game(id, name, id, file.toString());
      g.platform = platform
      g.save
    }
  }

  _parseGameInfo(file): Game{
    GameModel.where({file_path: file.file_path)}).fetch().then((element)=> {
      if(element == null){
        console.error(`Game: ${largest_exe} did not save`)
      }else{
        element.findLauncher().then(async (launcher) => {
          if(launcher == null){
            const launcher = await LauncherModel.where({name: 'Steam'}).fetch()
            element.launchers().attach(launcher.attributes.id)
          }
        })
      }
    })
  }
}
