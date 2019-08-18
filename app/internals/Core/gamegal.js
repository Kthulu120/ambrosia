/*
 * GameGal handles the creation, fetching, and deletion of Models for the application for node
 */
import GameModel from './../Models/Game'
import LauncherModel from './../Models/Launcher'
import PlatformModel from './../Models/Platform'
import Game from './../Games/Game';
import Launcher from './Launchers'
import Platform from './../Models/Platform';


const MODEL_TYPES = ['Game', 'Launcher', 'Platform']

function get_model (modelName) {
  switch (modelName) {
    case 'Game':
      return GameModel
   case 'Launcher':
     return LauncherModel
   case 'Platform':
     return PlatformModel
  }
}

export default class GameGal {

  /**
   * Creates model object and returns associated object type
   * @param {*} modelName
   * @param {*} modelAttributes
   */
  static async create(modelName: String, modelAttributes: Object) {

    if (modelAttributes.hasOwnProperty('id')) {
      throw Error('ValidaionError: you attempted to create a game with a predefined id attribute')
    }


    const model = get_model(modelName)
    const createdRecord = await model.forge({ ...modelAttributes }).save()
    switch (modelName) {
      case 'Game':
       return new Game({id: model.modelAttributes.id, ...modelAttributes})
     case 'Launcher':
       return new Launcher({id: model.modelAttributes.id, db_model: l,  ...modelAttributes})
     case 'Platform':
       const p = await PlatformModel.forge({ ...modelAttributes }).save()
    }
  }

  static async find(modelName, modelAttributes) {
    if (!modelAttributes || modelAttributes.hasOwnProperty('id')){
      throw Error('ValidaionError: you attempted to create a game with a predefined id attribute')
    }

    switch (modelName){
      case 'Game':
      return await new GameModel(modelAttributes).fetch()
     case 'Launcher':
      return await new LauncherModel(modelAttributes).fetch()
     case 'Platform':
      return await new PlatformModel(modelAttributes).fetch()
    }

    return null
  }

  static async fetchAll(modelName): Collection {
    const model = get_model(modelName)
    try {
      const collection = await model.fetchAll()
      return collection.models
    } catch (e) {
        console.info("GameGal: fetchAll() failed")
        return []
      }
  }
}



