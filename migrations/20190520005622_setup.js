
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('games', function(table){
      table.increments('id').primary();
      table.string('title');
      table.string('cover_img');
      table.integer('metacritic_score');


    }),
    knex.schema.createTable('platforms_games', function(table){
      table.increments('id').primary();
      table.integer('game_id').references('games.id');
      table.integer('platform_id').references('platforms.id');
    }),
    knex.schema.createTable('platforms', function(table){
      table.increments('id').primary();
      table.string('name');
      table.string('slug').nullable();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('games'),
    knex.schema.dropTable('platforms_games'),
    knex.schema.dropTable('platforms')
  ]);
};
