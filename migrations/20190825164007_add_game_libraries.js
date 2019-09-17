
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('game_libraries', function(table){
      table.increments('id').primary();
      table.string('launcher_name');
      table.string('file_path').unique();
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('game_libraries'),
  ]);
};
