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

  launch() {
    const { exec } = require('child_process');
    const launchcommand = `"${this.attributes.file_path}"`
    exec(launchcommand, (err, stdout, stderr) => {
      if (err) {
      // node couldn't execute the command
      console.error("Could Not Execute Game ${this.title}")
      return;
    }

    // the *entire* stdout and stderr (buffered)
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
  }

  async findLauncher() {
    return knexClient.select('*').from('launchers_games')
      .where({game_id: `${this.id}`}).then((rows) => {
        if(rows.length > 0){
          return LauncherModel.where({id: rows[0].launcher_id}).fetch().then((element) =>{
            return element
          })
        }
      })
  }

  async allGames() {
    return await GameModel.fetchAll()
  }

  async find_by_id(id: String): GameModel | null {
    await new GameModel({ id: id}).fetch()
  }

  async find(modelAttrbutes: Object): GameModel | null {
    await new GameModel(modelAttrbutes).fetch()
  }

  setLauncher() {
  }
}

export default Bookshelf.model('Games', GameModel);
