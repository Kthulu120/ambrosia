// @flow
import type {Platform, Game as GameType} from './Games/Game';
import {Game} from './Games/Game'
import {platforms} from './Platform/Platform'
import Parser from './../internals/Core/Parser'
import GameModel from './Models/Game'
const axios = require('axios');

export default async function readGameDirectory(folder: string) {
  // reads Emulation Directory
  const fsPromises = require('fs').promises
  const glob = require('glob');
  const path = require('path');

  // assume games are broken into Directories
  // since we don't have to this in fast manner we use async so we dont clog
  Object.keys(platforms).forEach(async (konsole) => {
    glob(__dirname + '/*.iso', {}, (err, files)=>{
      if (!err && files.length > 0) {
        filesToGame(files, platforms[konsole])
      }
    })
  });
}


// finds game from filename and platform, then return the most likely game
export function filesToGame(files: Array<string>, platform: string, altTitles: Array<string> | null, launcherName: string | null): Array<GameType>{
  const path = require('path');
  const games = []
  files.forEach((file, index) => {
      // look up game based off name and platform
      let title;
      let year = "";
      if(altTitles != null){
        title = altTitles[index]
      }else{
        let gameInfo = Parser.parseGameTitle(path.basename(file), true)
        year = gameInfo.year
        title = gameInfo.title
      }
      axios.get('http://127.0.0.1:8000/search/game', {
          params: {
            "year": year,
            "title":title,
            platform
          }
        })
        .then(async function (response) {
          const { data } = response
          const {gameSearch}: Object = data
          if (gameSearch.length != 0){
            const primaryChoice = gameSearch[0]
            const id: number = primaryChoice.id
            const name: string = primaryChoice.name
            const g  = new Game(id, name, id, file.toString());
            if(launcherName){
              const possibleLaunchers = primaryChoice.altstoreproductSet.edges;
              const gameLauncherArr = possibleLaunchers.filter(storeNode => storeNode.node.store.name === launcherName)
              if(gameLauncherArr.length == 1){
                if(launcherName == "Steam"){
                  let gameID = gameLauncherArr[0].node.gameStoreId
                  gameID = gameID.substring(gameID.indexOf('/app/') + 5).replace('/', '')
                  console.log(gameID)
                  g.launcher_id = gameID
                }else{
                  g.launcher_id = ""
                }
              }

            }

            g.platform = platforms[platform]
            await saveGamesToDB([g])
          }
        })

  })

  return games;
}

export async function findGame(title: string, year: number| null,platform ){
  return axios.get('http://127.0.0.1:8000/search/game', {
          params: {
            "year":title.year,
            "title":title.title,
            platform
          }
        }).then(function (response) {
          const { data } = response
          const {gameSearch}: Object = data
          if (gameSearch.length != 0){
            const primaryChoice = gameSearch[0]
            const id: number = primaryChoice.id
            const name: string = primaryChoice.name
            const g  = new Game(id, name, id, file.toString());
            g.platform = platforms[platform]
            saveGamesToDB([g])
          }
        })
}


  function saveGamesToDB(games: Array<GameType>){
    return new Promise((resolve, reject) => {
      const game_list = []
      games.forEach(async (g, index) => {
        // check if exists
        let element = await GameModel.where({nectar_id: g.nectar_id}).fetch()
        if(element == null){
          element = await GameModel.forge({ nectar_id:g.id, title: g.name, file_path: g.file_path, launcher_id: g.launcher_id}).save().error(err => console.error(err))
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
        game_list.push(element)
        if(index + 1 == games.length){
            resolve(game_list)
        }
      })
    })
  }


  function saveGamesToDBi(games: Array<GameType>){
    games.forEach((g) => {
      // check if exists
      GameModel.where({nectar_id: g.nectar_id}).fetch().then((element) => {
        if(element == null){
          GameModel.forge({ nectar_id:g.id, title: g.name,
            file_path: g.file_path,
           }).save().error(err => {
            console.error(err)
          }).then((newElement) => {
            // Go get platform
            let platform_id = null
            Object.keys(platforms).forEach(function(key, index) {
              if (platforms[key] === g.platform){
                platform_id = index + 1
              }
          });
          if(platform_id != null){
            // Update Platform Game Junction Table
            newElement.platforms().attach(platform_id)
          }
          })
        }
      })
    })
  }
