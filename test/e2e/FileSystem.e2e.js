/* eslint-disable no-unused-expressions */
import FileSystem from './../../app/internals/Core/FileSystem.js'

fixture `FileSystem`;

const settings = new FileSystem("resources/ambrosia-settings.test.json")

test('FileSystem can read and write from system', async t => {
  const fs = require("fs");
  const fileSystem = new FileSystem()
  console.log(await FileSystem.getAllFilesSync("C:/Users/Colon/Downloads/Nav", {withSha: true}))
});

test('Test2', async t => {
    /* Test 2 Code */
    const fs = require("fs");

    console.log(await FileSystem.getFiles("C:/Users/Colon/Downloads/Nav", {withSha: true}))

    // const contents = fs.readFileSync("resources/ambrosia-settings.test.json", { encoding: 'utf8' })

});
