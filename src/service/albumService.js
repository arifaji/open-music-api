const AlbumDao = require('../dao/AlbumDao');
const InvariantError = require('../exceptions/InvariantError');
const NotFoundError = require('../exceptions/NotFoundError');
const logger = require('../util/logger');
const { validate } = require('../validator/validator');

class AlbumService {
  static async getAlbumById(id) {
    if (!id) {
      throw new InvariantError('please provide ID...');
    }
    const album = await AlbumDao.getAlbumById(id);
    if (!album) {
      throw new NotFoundError('Album not found..');
    }
    return album;
  }

  static async insertAlbum(payload) {
    const valid = validate('insertAlbum', payload);
    console.log(valid);
    return 'album-id';
  }
}

module.exports = AlbumService;
