

/**
 * Models Modified
 *
 * games - Added nectar_id, file path to game
 */
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('games', function(table){
      table.string('file_path').nullable();
      table.string('nectar_id').nullable();
    }),
    knex.schema.table('launchers', function(table){
      table.increments('id').primary();
      table.string('name').notNull();
      // Universal Flags that enabled for every game
      table.string('flags').nullable();
      table.string('path_to_launcher').nullable();
    }),
    knex.schema.createTable('launchers_platforms', function(table){
      table.increments('id').primary();
      table.integer('platform_id').references('games.id');
      table.integer('launcher.id').references('launchers.id');
    }),
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('games', function(table){
      table.dropColumn('file_path');
      table.dropColumn('nectar_id');
    }),
    knex.schema.dropTable('launchers'),
    knex.schema.dropTable('launchers'),
  ])
};
