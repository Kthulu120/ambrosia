// @flow
import React from 'react';
import Settings from './../../app/internals/Core/Settings/Settings.js'
import ParsingService from './../../app/internals/Games/ParsingService'
fixture `Settings`;

const settings = new Settings("resources/ambrosia-settings.test.json")

test('Settings can read and write from file', async t => {
  const fs = require("fs");
  const contents = JSON.parse(fs.readFileSync("resources/ambrosia-settings.test.json"), 'utf-8')
  await t.expect(settings.read()).eql(contents ,
  "Settings did not contained expect base configuration",
  );
});

test('Test2', async t => {
    settings.addGameLibrary('PC', "C:/Games/Sid Meier's Civilization 6")
    await t.expect(ParsingService.parseGamesFromFolder(settings.get('gameLibraries'),'PC', 'PC')).eql([],'Did not find default Game')
});
