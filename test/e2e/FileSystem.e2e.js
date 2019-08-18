/* eslint-disable no-unused-expressions */
import FileSystem from './../../app/internals/Core/FileSystem.js'

fixture `FileSystem`;

const settings = new FileSystem("resources/ambrosia-settings.test.json")

test('FileSystem can read and write from system', async t => {
  const fs = require("fs");
  const fileSystem = new FileSystem()
  //console.log(await FileSystem.getAllFilesSync("C:/Users/Colon/Downloads/Nav", {withSha: true}))
});

test('FileSystem returns proper amount of files for directory', async t => {
    /* Test 2 Code */
    const fs = require("fs");
    const files = []
    const filePath = "C:/Games/Sid Meier's Civilization 6"
    FileSystem.walkDir(filePath,(f) => files.push(f))
    await t.expect(files.length).eql(18094)
    // await t.expect(ParsingService.parseGamesFromFolder(settings.get('gameLibraries'),'PC', 'PC')).eql([],'Did not find default Game')
});
