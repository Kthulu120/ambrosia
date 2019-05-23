// @flow
import type {Platform, Game as GameType} from './Games/Game';
import {Game} from './Games/Game'
import {platforms} from './Games/Game'
import Parser from './../internals/Core/Parser'
import { GameModel } from './../index'
const axios = require('axios');

export default async function readGameDirectory(folder: string) {
  // reads Emulation Directory
  const fsPromises = require('fs').promises
  const glob = require('glob');
  const path = require('path');

  // assume games are broken into Directories
  // since we don't have to this in fast manner we use async so we dont clog
  Object.keys(platforms).forEach(async (konsole) => {
    const __dirname = `${folder}/${platforms[konsole]}`
    //console.log(__dirname)
    //const gameDir = await fsPromises.readdir(folder, {'withFileTypes ': true})
    glob(__dirname + '/*.iso', {}, (err, files)=>{
      if (!err && files.length > 0) {
        console.log(files)
        filesToGame(files, platforms[konsole])
      }
    })
  });
  //const readNonEmulateGames = await fsPromises.readdir('C:/Games', {'withFileTypes ': true})
  //console.log(dotReachable)
}


// finds game from filename and platform, then return the most likely game
function filesToGame(files: Array<string>, platform: string): Array<GameType>{
  const path = require('path');
  const games = []
  files.forEach(file => {
      // look up game based off name and platform
      const title = Parser.parseGameTitle(path.basename(file), true)
      axios.get('http://127.0.0.1:8000/search/game', {
          params: {
            "year":title.year,
            "title":title.title,
            platform
          }
        })
        .then(function (response) {
          const { data } = response
          const {gameSearch}: Object = data
          if (gameSearch.length != 0){
            const primaryChoice = gameSearch[0]
            const id: number = primaryChoice.id
            const name: string = primaryChoice.name
            const g  = new Game(id, name);
            g.platform = platforms[platform]
            g.file_path = file.toString();
            g.nectar_id = id
            saveGamesToDB([g])
          }
        })

  })

  return games;
}



  function saveGamesToDB(games: Array<GameType>){
    games.forEach((g) => {
      // check if exists
      GameModel.where({nectar_id: g.nectar_id}).fetch().then((element) => {
        if(element == null){
          GameModel.forge({ nectar_id:g.id, title: g.name,
            file_path: g.file_path,
           }).save().error(err => {
            console.error(err)
          })
        }
      })
    })
  }
