const _ = require('lodash');
const AlbumDao = require('../dao/AlbumDao');
const InvariantError = require('../exceptions/InvariantError');
const NotFoundError = require('../exceptions/NotFoundError');
const { validate } = require('../validator/validator');

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
    const valid = validate('insertAlbum', payload);
    const { value } = valid;
    const album = await AlbumDao.insertAlbum(value);
    return _.pick(album, ['id']);
  }

  static async editAlbum(id, payload) {
    const valid = validate('insertAlbum', payload);
    const { name, year } = valid.value;
    const existingAlbum = await AlbumDao.getAlbumById(id);
    if (!existingAlbum) {
      throw new NotFoundError('Album not found..');
    }
    await AlbumDao.updateAlbumById(id, { name, year });
    return 'Success update album';
  }

  static async deleteAlbum(id) {
    const existingAlbum = await AlbumDao.getAlbumById(id);
    if (!existingAlbum) {
      throw new NotFoundError('Album not found..');
    }
    await AlbumDao.deleteAlbumById(id);
    return 'Success delete album...';
  }
}

module.exports = AlbumService;
