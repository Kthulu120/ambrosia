// @flow

export default PlatformModel = bookshelf.Model.extend({
  tableName: 'platforms',
  viewGames() {
    return this.belongsToMany(GameModel, 'platforms_games', 'platform_id', 'game_id').query({where: {access: 'readonly'}});
  }
});
