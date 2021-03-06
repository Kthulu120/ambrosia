// @flow


export const platforms =  {
  "PlayStation 1": "PlayStation 1",
  "PlayStation 2": "PlayStation 2",
  "PlayStation 3": "PlayStation 3",
  "PlayStation 4": "PlayStation 4",
  "PS Vita": "PS Vita",
  "Xbox 360": "Xbox 360",
  "Xbox": "Xbox",
  "Xbox One": "Xbox One",
  "Playstation Portable": "Playstation Portable",
  "Wii": "Wii",
  "PC": "PC",
  "Wii U": "Wii U",
  "Nintendo Switch": "Nintendo Switch",
  'Mac OS': 'Mac OS',
  'Linux': 'Linux',
  'iOS': 'iOS',
  'Android': 'Android',
  'Nintendo 3DS': "Nintendo 3DS",
  "Nintendo DS": "Nintendo DS",
  "Nintendo DSi": "Nintendo DSi",
  'GameCube': 'GameCube',
  'Nintendo 64': 'Nintendo 64',
  "Game Boy Advance": 'Game Boy Advance',
  'Game Boy Color': "Game Boy Color",
  'Game Boy': 'Game Boy',
  'SNES': 'SNES',
  'NES': 'NES',
  'Original Macintosh':'Original Macintosh',
  'Apple': 'Apple',
  'Commodore/Amiga':'Commodore / Amiga',
  "Atari 7800": "Atari 7800",
  "Atari 5200":"Atari 5200",
  "Atari 2600":"Atari 2600",
  "Atari Flashback":"Atari Flashback",
  "Atari 8-bit":"Atari 8-bit",
  "Atari ST":"Atari ST",
  "Atari Lynx": "Atari Lynx",
  "Atari XEGS": "Atari XEGS",
  "Genesis": "Genesis",
  "SEGA Saturn": "SEGA Saturn",
  "SEGA CD": "SEGA CD",
  "SEGA 32X":"SEGA 32X",
  "SEGA Master System": "SEGA Master System",
  "Dreamcast": "Dreamcast",
  "3DO": "3DO",
  "Jaguar": "Jaguar",
  "Game Gear": "Game Gear",
  "Nat Geo": "Nat Geo",
  "Web": "Web"
}

export type GameLibraryFolder = {
  file_path: string,
  launcher: string
}

// Platform is essential a Enum
export type Platform = $Keys<typeof platforms>;

