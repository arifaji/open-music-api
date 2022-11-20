const _ = require('lodash');

const AlbumDao = require('../dao/AlbumDao');
const InvariantError = require('../exceptions/InvariantError');
const NotFoundError = require('../exceptions/NotFoundError');
const { validate } = require('../validator/validator');
const { validationSchema } = require('../util/enums');
const StorageService = require('./StorageService');
const cacheService = require('./CacheService');
const CacheService = require('./CacheService');

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

  static async uploadCover(id, data) {
    validate(validationSchema.ALBUM_COVER_IMG, _.get(data, 'hapi.headers'));
    await AlbumService.validateExistingAlbumById(id);
    const filename = await StorageService.writeFile(data, data.hapi, id);
    await AlbumDao.updateAlbumById(id, { coverImg: filename });
    return 'Success Upload Album Cover...';
  }

  static async likeOrDislikeAlbum(albumId, credentialId) {
    await AlbumService.validateExistingAlbumById(albumId);
    const existingLike = await AlbumDao.getLikesAlbum(albumId, credentialId);
    if (existingLike) {
      await AlbumDao.dislikeAlbum(albumId, credentialId);
    } else {
      await AlbumDao.likeAlbum(albumId, credentialId);
    }
    await CacheService.delete(`album-likes:${albumId}`);
    return 'Success like album...';
  }

  static async totalLikesAlbum(id) {
    await AlbumService.validateExistingAlbumById(id);
    const likes = await AlbumDao.getTotalLikes(id);
    await CacheService.set(`album-likes:${id}`, likes);
    return likes;
  }

  static async totalLikesAlbumCache(id) {
    const result = await CacheService.get(`album-likes:${id}`);
    return Number(result);
  }
}

module.exports = AlbumService;
