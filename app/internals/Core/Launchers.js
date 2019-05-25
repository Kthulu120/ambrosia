import type { Platform } from './../Games/Games'
import type { LauncherModelType } from './../../index'

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
    if(model !== null && model !== undefined){
      this.model.attachLauncher = self
    }
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

}



// launcher names and path to execute
const launchers = {
  // Default Installation Locaions
  'PCSX2': "C:\Program Files (x86)\PCSX2 1.4.0\pcsx2.exe",
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
  'Steam': "",
  'Origin': "",
  'GOG': "",



}

export type GameLauncher = $Keys<typeof launchers>;
