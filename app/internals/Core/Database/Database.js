import { PlatformModel, GameModel, LauncherModel } from './../../../index'
import {platforms} from './../../Games/Game'
import {slugify} from './../Parser'
import FileSystem from './../FileSystem'
import {filesToGame} from './../../FileWatcher'
const fs = require('fs')
const fsPromises = fs.promises
const glob = require('glob');
const path = require('path');

export default class Database {

  constructor(knex: any){
    this.knex = knex
  }

  initializeDB() {
    // if database exists
    // make sure all platforms exist
    PlatformModel.fetchAll().then((collection)=> {
      if(collection.length != 49) {
        Object.keys(platforms).forEach(function(key) {
          PlatformModel.forge({name: platforms[key], slug: slugify(platforms[key])}).save()
      });
      }
    });

    this.getInstalledSteamGames()
  }

  async getInstalledSteamGames(folders: null | Array<string>){
    if (folders != null && folders != undefined){
      // check custom install locations
      for(let i=0; i < folders.length; i++) {

      }
    }else{
        // look in default install location for offline launching
        // TODO: Set Up Global Switches for OS
        const install_path = "C:/Program Files (x86)/Steam/steamapps/common"
        const { lstatSync, readdirSync } = require('fs')
        const { join } = require('path')
        const isDirectory = source => lstatSync(source).isDirectory() && !source.includes('Steamworks Shared')
        const getDirectories = source =>
        readdirSync(source).map(name => join(source, name)).filter(isDirectory)
        const directories = getDirectories(install_path)
        await directories.forEach( async (folder) => {
          // largest exe probably game file?
          let largest_exe = null
          let largestSize = 0
          fs.readdirSync(folder).forEach(filename => {
            const fileExt = FileSystem.getFileExtension(filename)
            if(fileExt == 'exe'){
              const full_path = folder.replace(/\\/g, '/') + '/' + filename
              const fSize = FileSystem.getFilesizeInBytes(full_path)
              if(fSize > largestSize){
                largest_exe = full_path
              }
            }
          });
          if(largest_exe != null){
            // save games and add launcher to junction table
            await filesToGame([largest_exe], "PC", [path.basename(folder)], "Steam")
            GameModel.where({file_path: largest_exe.toString()}).fetch().then((element)=> {
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
        })
      }
  }
}
