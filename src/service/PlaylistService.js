const _ = require('lodash');

const SongDao = require('../dao/SongDao');
const PlaylistDao = require('../dao/PlaylistDao');
const PlaylistSongDao = require('../dao/PlaylistSongDao');
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

  static async insertSongToPlaylist(userId, playlistId, payload) {
    const { value } = validate(validationSchema.INSERT_SONG_PLAYLIST, payload);
    const { songId } = value;

    const playlist = await PlaylistDao.getPlaylistById(playlistId);
    if (!playlist) {
      throw new NotFoundError('Playlist Not Found...');
    }
    if (playlist.userId !== userId) {
      const collaboration =
        await CollaborationDao.findCollaborationByPlaylistAndUser({
          playlistId,
          userId,
        });
      if (!collaboration) {
        throw new AuthorizationError('Forbidden...');
      }
    }
    const song = await SongDao.getSongById(songId);
    if (!song) {
      throw new NotFoundError('Song Not Found...');
    }
    await PlaylistSongDao.insertPlaylistSong({
      playlistId,
      songId,
      userId,
    });
    return 'Success add song to playlist...';
  }

  static async getAllPlaylistSongs(userId, playlistId) {
    const playlist = await PlaylistDao.getPlaylistById(playlistId);
    if (!playlist) {
      throw new NotFoundError('Playlist Not Found...');
    }
    if (playlist.userId !== userId) {
      const collaboration =
        await CollaborationDao.findCollaborationByPlaylistAndUser({
          playlistId,
          userId,
        });
      if (!collaboration) {
        throw new AuthorizationError('Forbidden...');
      }
    }
    const playlistSongs = await PlaylistDao.findAllPlaylistSongsByAndPlaylistId(
      playlistId
    );
    return playlistSongs;
  }

  static async deleteSongPlaylist(userId, playlistId, payload) {
    const { value } = validate(validationSchema.INSERT_SONG_PLAYLIST, payload);
    const { songId } = value;
    const playlist = await PlaylistDao.getPlaylistById(playlistId);
    if (!playlist) {
      throw new NotFoundError('Playlist Not Found...');
    }
    if (playlist.userId !== userId) {
      const collaboration =
        await CollaborationDao.findCollaborationByPlaylistAndUser({
          playlistId,
          userId,
        });
      if (!collaboration) {
        throw new AuthorizationError('Forbidden...');
      }
    }
    const playlistSong = await PlaylistSongDao.findBySongId(songId);
    if (!playlistSong) {
      throw new InvariantError('Song in Playlist Not Found...');
    }
    await PlaylistSongDao.deleteBySongId(songId);
    return 'Success Delete Song From Playlist...';
  }

  static async deletePlaylist(userId, playlistId) {
    const playlist = await PlaylistDao.getPlaylistById(playlistId);
    if (!playlist) {
      throw new NotFoundError('Playlist Not Found...');
    }
    if (playlist.userId !== userId) {
      throw new AuthorizationError('Forbidden...');
    }
    await PlaylistDao.deletePlaylistById(playlistId);
    return 'Success Delete Playlist...';
  }
}

module.exports = PlaylistService;
