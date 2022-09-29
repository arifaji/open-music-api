const _ = require('lodash');
const SongDao = require('../dao/SongDao');
const AlbumDao = require('../dao/AlbumDao');
const InvariantError = require('../exceptions/InvariantError');
const NotFoundError = require('../exceptions/NotFoundError');
const { validate } = require('../validator/validator');
const { validationSchema } = require('../util/enums');

class SongService {
  static async insertSong(payload) {
    const { value } = validate(validationSchema.INSERT_SONG, payload);
    await SongService.validateExistingAlbum(value);
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
    const song = await SongService.validateExistingSongById(id);
    return song;
  }

  static async editSong(id, payload) {
    const { value } = validate(validationSchema.INSERT_SONG, payload);
    await SongService.validateExistingSongById(id);
    await SongService.validateExistingAlbum(value);
    await SongDao.updateSongById(id, value);
    return 'Success Update Song...';
  }

  static async deleteSong(id) {
    await SongService.validateExistingSongById(id);
    await SongDao.deleteSongById(id);
    return 'Success delete song...';
  }

  static async validateExistingAlbum(value) {
    if (_.get(value, 'albumId')) {
      const existingAlbum = await AlbumDao.getAlbumById(value.albumId);
      if (!existingAlbum) {
        throw new InvariantError('Album ID does not exist...');
      }
    }
  }

  static async validateExistingSongById(id) {
    const existingSong = await SongDao.getSongById(id);
    if (!existingSong) {
      throw new NotFoundError('Song not found..');
    }
    return existingSong;
  }
}

module.exports = SongService;
