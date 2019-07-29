
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('games', function(table){
      table.string('launcher_name')
      table.string('platform_name')
    }),
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
  knex.schema.table('games', function(table){
    table.dropColumn('launcher_name');
    table.dropColumn('platform_name');
  }),
  ])
};
