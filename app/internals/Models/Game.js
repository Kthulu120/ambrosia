// @flow
import type LauncherModel from './../Models/Launcher'
import type PlatformModel from './../Models/Platform'
let Bookshelf = require('./../database');

/**
 * The Database Model
 */
class GameModel extends Bookshelf.Model {

  get tableName() { return 'games'; }

  platforms() {
    return this.belongsToMany(PlatformModel, 'platforms_games','game_id', 'platform_id').query({where: {access: 'readonly'}});
  }

  launchers() {
    return this.belongsToMany(LauncherModel, 'launchers_games','game_id', 'launcher_id').query({where: {access: 'readonly'}});
  }
  async findLauncher(){
    return knexClient.select('*').from('launchers_games')
      .where({game_id: `${this.id}`}).then((rows) => {
        if(rows.length > 0){
          return LauncherModel.where({id: rows[0].launcher_id}).fetch().then((element) =>{
            return element
          })
        }
      })
  }

  async allGames(){
    return await this.fetchAll()
  }

  setLauncher(){
  }
}

export default Bookshelf.model('Games', GameModel);
