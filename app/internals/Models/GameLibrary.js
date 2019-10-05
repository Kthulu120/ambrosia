// @flow

let Bookshelf = require('./../database');

/**
 * The Database Model
 */
class GameLibraryModel extends Bookshelf.Model {

  get file_path() { return this.get('file_path')}

  get launcher() { return this.get('launcher_name')}

  get tableName() { return 'game_libraries'; }

  async find_by_id(id: String): GameLibrary | null {
    return await new GameLibraryModel({ id: id}).fetch()
  }

  async find(modelAttrbutes: Object): GameLibrary | null {
    await new GameLibraryModel(modelAttrbutes).fetch()
  }
}

export default Bookshelf.model('GameLibrary', GameLibraryModel);
