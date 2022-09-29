const _ = require('lodash');
const { sequelize } = require('../db/index');
const SongDao = require('../dao/SongDao');
const PlaylistDao = require('../dao/PlaylistDao');
const PlaylistSongDao = require('../dao/PlaylistSongDao');
const PlaylistSongActivityDao = require('../dao/PlaylistSongActivityDao');
const CollaborationDao = require('../dao/CollaborationDao');
const { validate } = require('../validator/validator');
const { validationSchema } = require('../util/enums');
const InvariantError = require('../exceptions/InvariantError');
const AuthorizationError = require('../exceptions/AuthorizationError');
const NotFoundError = require('../exceptions/NotFoundError');

class PlaylistService {
  static async insertPlaylist(userId, payload) {
    const { value } = validate(validationSchema.INSERT_PLAYLIST, payload);
    const playlist = await PlaylistDao.insertPlaylist({
      userId,
      ...value,
    });
    return _.pick(playlist, ['id']);
  }

  static async getAllPlaylistByUser(userId) {
    const playlists = await PlaylistDao.findAllPlaylistByUserId(userId);
    return playlists;
  }

  static async insertSongToPlaylist(credentialId, playlistId, payload) {
    const { value } = validate(validationSchema.INSERT_SONG_PLAYLIST, payload);
    const { songId } = value;
    const playlist = await PlaylistService.validateExistingPlaylistById(
      playlistId
    );
    await PlaylistService.validatePlaylistOwnerAndCollaborator(
      playlist,
      credentialId
    );
    const song = await SongDao.getSongById(songId);
    if (!song) {
      throw new NotFoundError('Song Not Found...');
    }
    let transaction;
    try {
      transaction = await sequelize.transaction();
      await PlaylistSongDao.insertPlaylistSong(
        {
          playlistId,
          songId,
          userId: credentialId,
        },
        transaction
      );
      await PlaylistSongActivityDao.insertActivity(
        {
          playlistId,
          songId,
          userId: credentialId,
          action: 'add',
        },
        transaction
      );
      await transaction.commit();
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw new Error(error.message);
    }
    return 'Success add song to playlist...';
  }

  static async getAllPlaylistSongs(credentialId, playlistId) {
    const playlist = await PlaylistService.validateExistingPlaylistById(
      playlistId
    );
    await PlaylistService.validatePlaylistOwnerAndCollaborator(
      playlist,
      credentialId
    );
    const playlistSongs = await PlaylistDao.findAllPlaylistSongsByAndPlaylistId(
      playlistId
    );
    return playlistSongs;
  }

  static async deleteSongPlaylist(credentialId, playlistId, payload) {
    const { value } = validate(validationSchema.INSERT_SONG_PLAYLIST, payload);
    const { songId } = value;
    const playlist = await PlaylistService.validateExistingPlaylistById(
      playlistId
    );
    await PlaylistService.validatePlaylistOwnerAndCollaborator(
      playlist,
      credentialId
    );
    const playlistSong = await PlaylistSongDao.findBySongId(songId);
    if (!playlistSong) {
      throw new InvariantError('Song in Playlist Not Found...');
    }
    let transaction;
    try {
      transaction = await sequelize.transaction();
      await PlaylistSongDao.deleteBySongId(songId, transaction);
      await PlaylistSongActivityDao.insertActivity(
        {
          playlistId,
          songId,
          userId: credentialId,
          action: 'delete',
        },
        transaction
      );
      await transaction.commit();
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw new Error(error.message);
    }
    return 'Success Delete Song From Playlist...';
  }

  static async deletePlaylist(userId, playlistId) {
    const playlist = await PlaylistService.validateExistingPlaylistById(
      playlistId
    );
    if (playlist.userId !== userId) {
      throw new AuthorizationError('Forbidden...');
    }
    await PlaylistDao.deletePlaylistById(playlistId);
    return 'Success Delete Playlist...';
  }

  static async getPlaylistActivity(credentialId, playlistId) {
    const playlist = await PlaylistService.validateExistingPlaylistById(
      playlistId
    );
    await PlaylistService.validatePlaylistOwnerAndCollaborator(
      playlist,
      credentialId
    );
    const activities = await PlaylistSongActivityDao.getAllActivityByPlaylistId(
      playlistId
    );
    return {
      playlistId,
      activities,
    };
  }

  static async validateExistingPlaylistById(playlistId) {
    const playlist = await PlaylistDao.getPlaylistById(playlistId);
    if (!playlist) {
      throw new NotFoundError('Playlist Not Found...');
    }
    return _.get(playlist, 'dataValues', playlist);
  }

  static async validatePlaylistOwnerAndCollaborator(playlist, credentialId) {
    if (playlist.userId !== credentialId) {
      const collaboration =
        await CollaborationDao.findCollaborationByPlaylistAndUser({
          playlistId: playlist.id,
          userId: credentialId,
        });
      if (!collaboration) {
        throw new AuthorizationError('Forbidden...');
      }
    }
  }
}

module.exports = PlaylistService;
