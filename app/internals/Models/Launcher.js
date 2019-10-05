// @flow

let Bookshelf = require('./../database');

// Icons for each launcher
import dolphinIcon from './../../assets/icons/dolphinlogo_64.png'
import pcsx2Icon from './../../assets/icons/pcsx2.png'
import rpcs3Icon from './../../assets/icons/rpcs3.png'
import pcGamingIcon from './../../assets/icons/pc_icon.png'

class LauncherModel extends Bookshelf.Model {

  get name() { return this.get('name')}

  get path() { return this.get('path_to_launcher')}

  get path_to_launcher() { return this.get('path_to_launcher')}

  get tableName() { return 'launchers'; }

  static getGameLauncherIcon = (launcher_name) => {
    switch(launcher_name){
      case "PC":
        return pcGamingIcon
      case "PCSX2":
        return pcsx2Icon
      case "RPCS3":
        return rpcs3Icon
      case "Dolphin":
        return dolphinIcon
      default:
        pcGamingIcon;
    }
  }

  launcher_icon = () => {
    switch(this.name){
      case "PC":
        return pcGamingIcon
      case "PCSX2":
        return pcsx2Icon
      case "RPCS3":
        return rpcs3Icon
      case "Dolphin":
        return dolphinIcon
      default:
        return pcGamingIcon;
    }
  }

  viewGames() {
    return this.belongsToMany(GameModel, 'launchers_games','launcher_id', 'game_id').query({where: {access: 'readonly'}});
  }

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
}





export default LauncherModel
