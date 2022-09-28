const { nanoid } = require('nanoid');
const { playlistSongBean } = require('../db/index');

class PlaylistSongDao {
  static insertPlaylistSong(payload) {
    return playlistSongBean.create({
      id: `playlist-song-${nanoid(16)}`,
      ...payload,
      created_date: new Date(),
    });
  }

  static findBySongId(songId) {
    return playlistSongBean.findOne({
      where: { songId },
      attributes: ['id'],
    });
  }

  static deleteBySongId(songId) {
    return playlistSongBean.destroy({
      where: { songId },
    });
  }
}

module.exports = PlaylistSongDao;
