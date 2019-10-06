/*
 * GameGal handles the creation, fetching, and deletion of Models for the application for node
 */
import GameModel from './../Models/Game'
import LauncherModel from './../Models/Launcher'
import PlatformModel from './../Models/Platform'
import Game from './../Games/Game';
import Launcher from './Launchers'
import Platform from './../Models/Platform';
import GameLibraryModel from './../Models/GameLibrary'


const MODEL_TYPES = ['Game', 'Launcher', 'Platform']

function get_model (modelName) {
  switch (modelName) {
    case 'Game':
      return GameModel
   case 'Launcher':
     return LauncherModel
   case 'Platform':
     return PlatformModel
   case 'GameLibrary':
     return GameLibraryModel
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
    return model.forge({ ...modelAttributes }).save()
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
      case 'GameLibrary':
        return await new GameLibraryModel(modelAttributes).fetch()
    }
    return null
  }

  static async delete(modelName, modelAttributes){
    switch (modelName){
      case 'Game':
        return await new GameModel(modelAttributes).destroy()
      case 'Launcher':
        return await new LauncherModel(modelAttributes).destroy()
      case 'Platform':
        return await new PlatformModel(modelAttributes).destroy()
      case 'GameLibrary':
        return await new GameLibraryModel(modelAttributes).destroy()
    }
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



