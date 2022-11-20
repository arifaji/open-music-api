const _ = require('lodash');

const AlbumDao = require('../dao/AlbumDao');
const InvariantError = require('../exceptions/InvariantError');
const NotFoundError = require('../exceptions/NotFoundError');
const { validate } = require('../validator/validator');
const { validationSchema } = require('../util/enums');

class AlbumService {
  static async getAlbumById(id) {
    if (!id) {
      throw new InvariantError('please provide ID...');
    }
    const album = await AlbumDao.getAlbumIncludeSongById(id);
    if (!album) {
      throw new NotFoundError('Album not found..');
    }
    return album;
  }

  static async insertAlbum(payload) {
    const { value } = validate(validationSchema.INSERT_ALBUM, payload);
    const album = await AlbumDao.insertAlbum(value);
    return _.pick(album, ['id']);
  }

  static async editAlbum(id, payload) {
    const { value } = validate(validationSchema.INSERT_ALBUM, payload);
    await AlbumService.validateExistingAlbumById(id);
    await AlbumDao.updateAlbumById(id, value);
    return 'Success update album';
  }

  static async deleteAlbum(id) {
    await AlbumService.validateExistingAlbumById(id);
    await AlbumDao.deleteAlbumById(id);
    return 'Success delete album...';
  }

  static async validateExistingAlbumById(id) {
    const existingAlbum = await AlbumDao.getAlbumById(id);
    if (!existingAlbum) {
      throw new NotFoundError('Album not found..');
    }
  }
}

module.exports = AlbumService;
