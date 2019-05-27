
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('games', function(table){
      table.string('launcher_id').nullable();
    }),
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
  knex.schema.table('games', function(table){
    table.dropColumn('launcher_id');
  }),
  ])
};
