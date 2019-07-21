import Settings from './../../app/internals/Core/Settings/Settings.js'

fixture `Settings`;

const settings = new Settings("resources/ambrosia-settings.test.json")

test('Settings can read and write from file', async t => {
  const fs = require("fs");
  const contents = JSON.parse(fs.readFileSync("resources/ambrosia-settings.test.json"), 'utf-8')
  await t.expect(settings.read()).eql(contents ,
  "Settings did not expected configuration",
  );
});

test('Test2', async t => {
    /* Test 2 Code */
});
