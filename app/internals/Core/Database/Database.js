import { PlatformModel } from './../../../index'
import {platforms} from './../../Games/Game'
import {slugify} from './../Parser'


export default class Database {

  constructor(knex: any){
    this.knex = knex
  }

  static initializeDB(){
    // if database exists
    // make sure all platforms exist
    PlatformModel.fetchAll().then((collection)=> {
      if(collection.length != 49) {
        Object.keys(platforms).forEach(function(key) {
          PlatformModel.forge({name: platforms[key], slug: slugify(platforms[key])}).save()
      });
      }
    })

  }

}
