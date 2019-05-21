import type { Platform } from './../Games/Games'


class Launcher{

  platforms: Array<Platform>;
  path_to_launcher: string;
  name: string;
  flags: string | null;

  constructor(){

  }
}



// launcher names and path to execute
const launchers = {
  //
  'PCSX2': "",
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
