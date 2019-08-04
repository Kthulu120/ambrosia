// @flow
let Bookshelf = require('./../database');


class PlatformModel extends Bookshelf.Model {

  get tableName() { return 'platforms'; }

  viewGames() {
    return this.belongsToMany(GameModel, 'platforms_games', 'platform_id', 'game_id').query({where: {access: 'readonly'}});
  }
}

export default Bookshelf.model('Platforms', PlatformModel);
