// @flow
import {bookshelf} from './../AmbrosiaApp'

export const LauncherModel = bookshelf.Model.extend({
  tableName: 'launchers',
  viewGames() {
    return this.belongsToMany(GameModel, 'launchers_games','launcher_id', 'game_id').query({where: {access: 'readonly'}});
  },
  initialize() {
    this.on('saved', (model) => {
      // This is fired after a model is updated
        if(model.hasOwnProperty('attachedLauncher')){
          console.log('TO WWE GOT AN ATTACHED LAUCHER')
              this.attachedLauncher.path_to_executable = model.attributes.path_to_executable;
              this.attachedLauncher.install_folder = path.dirname(this.attachLauncher.path_to_executable);
        }
    })
    this.on('saving', (model) => {
      if (model.get('status') !== 'active') {
        // Throwing an error will prevent the model from being saved
      }
    })
  }
});

export default LauncherModel
