import { PlatformModel } from './../../../index'
import {platforms} from './../../Games/Game'
import {slugify} from './../Parser'
const fsPromises = require('fs').promises
const glob = require('glob');
const path = require('path');

export default class Database {

  constructor(knex: any){
    this.knex = knex
  }

  initializeDB() {
    // if database exists
    // make sure all platforms exist
    this.getInstalledSteamGames()
    PlatformModel.fetchAll().then((collection)=> {
      if(collection.length != 49) {
        Object.keys(platforms).forEach(function(key) {
          PlatformModel.forge({name: platforms[key], slug: slugify(platforms[key])}).save()
      });
      }
    });
  }

  getInstalledSteamGames(folders: null | Array<string>){
    if (folders != null && folders != undefined){
      // check custom install locations
      for(let i=0; i < folders.length; i++) {

      }
    }else{
        // look in default install location
        const install_path = "C:/Program Files (x86)/Steam/steamapps/common"
        const { lstatSync, readdirSync } = require('fs')
        const { join } = require('path')
        const isDirectory = source => lstatSync(source).isDirectory() && !source.includes('Steamworks Shared')
        const getDirectories = source =>
        readdirSync(source).map(name => join(source, name)).filter(isDirectory)
        console.log(getDirectories(install_path))
        
      }
  }
}
