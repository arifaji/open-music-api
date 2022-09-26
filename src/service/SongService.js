const _ = require('lodash');
const SongDao = require('../dao/SongDao');
const AlbumDao = require('../dao/AlbumDao');
const InvariantError = require('../exceptions/InvariantError');
const NotFoundError = require('../exceptions/NotFoundError');
const { validate } = require('../validator/validator');
const { validationSchema } = require('../util/enums');

class SongService {
  static async insertSong(payload) {
    const valid = validate(validationSchema.INSERT_SONG, payload);
    const { value } = valid;
    if (value.albumId) {
      const existingAlbum = await AlbumDao.getAlbumById(value.albumId);
      if (!existingAlbum) {
        throw new InvariantError('Album ID does not exist...');
      }
    }
    const song = await SongDao.insertSong(value);
    return _.pick(song, ['id']);
  }

  static async getSong(params) {
    const song = await SongDao.getSong(params);
    return song;
  }

  static async getSongById(id) {
    if (!id) {
      throw new InvariantError('please provide ID...');
    }
    const song = await SongDao.getSongById(id);
    if (!song) {
      throw new NotFoundError('Song not found..');
    }
    return song;
  }

  static async editSong(id, payload) {
    const valid = validate(validationSchema.INSERT_SONG, payload);
    const { value } = valid;
    const existingSong = await SongDao.getSongById(id);
    if (!existingSong) {
      throw new NotFoundError('Song not found..');
    }
    if (value.albumId) {
      const existingAlbum = await AlbumDao.getAlbumById(value.albumId);
      if (!existingAlbum) {
        throw new InvariantError('Album ID does not exist...');
      }
    }
    await SongDao.updateSongById(id, value);
    return 'Success Update Song...';
  }

  static async deleteSong(id) {
    const existingSong = await SongDao.getSongById(id);
    if (!existingSong) {
      throw new NotFoundError('Song not found..');
    }
    await SongDao.deleteSongById(id);
    return 'Success delete song...';
  }
}

module.exports = SongService;
