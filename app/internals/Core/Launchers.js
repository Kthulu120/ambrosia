import type { Platform } from './../Games/Games'
import type { Game } from "../Games/Game";
import {AmbrosiaApp} from './../../index'
import type { LauncherModelType } from './../../index'
import Settings from './Settings/Settings'
const { spawn } = require('child_process');

/**
 * A gaming client launcher
 */
class Launcher{

  platforms: Array<Platform>;
  path_to_executable: string;
  name: string;
  flags: string | null;

  constructor(name: string, install_folder: string, path_to_executable: string | null, flags: string | null | undefined, model: LauncherModelType| null){
    this.name = name;
    this.path_to_executable = path_to_executable;
    this.install_folder = install_folder;
    this.flags = flags;
    if(model){
      this.model.attachLauncher = self
    }
  }

  // builds commandline for each client
  buildCommandLine(game: Game): string{
    let command;
    switch (this.name) {
      case 'PC':
        command = `${game.path_to_executable}`
        break
      case 'Steam':
        command = `"${launcher_model.attributes.path_to_launcher}" -applaunch ${game.launcher_id} -no-browser`
    }
    return command
  }

  // launches chosen game
  launcheGame(game: Game): void{
    const command = this.buildCommandLine(game)
    const program = spawn(command, { detached: true, stdio: 'ignore' })
    // TODO: add event listener for on close
    program.on('close', () => console.info(`${game.name} has been closed`))
  }

  static ModelToLauncherFactory(launcher_model: LauncherModelType){
    return new Launcher (
      launcher_model.get('name'),
      launcher_model.get('path_to_launcher'),
      launcher_model.get('path_to_launcher'),
      launcher_model.get('flags'),
      launcher_model
    )
  }

  getInstallLocation(){
    this.path_to_executable = AmbrosiaApp.settings.get('installLocations')[this.name]
    return this.path_to_executable
  }

}


// Default Install Location, Default Game Install Location,
// launcher names and path to execute
const launchers = {
  // Default Installation Locaions
  'PCSX2': new Launcher('PCSX2', "C:\Program Files (x86)\PCSX2 1.4.0\pcsx2.exe"),
  'Dolphin': "",
  'RPCS3':"",
  'MAME': "",
  'DeSmuMe': "",
  'Mednafen': "",
  'Cemu': "",
  'Higan': "",
  'Citra': "",
  'PPSSPP': "",
  // 3rd Party Launchers
  'Steam': "C:\Program Files (x86)\Steam\Steam.exe",
  'Origin': "",
  'GOG': "",
  'PC': ""
}

export type GameLauncher = $Keys<typeof launchers>;

