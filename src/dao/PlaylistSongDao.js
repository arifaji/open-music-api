const { nanoid } = require('nanoid');
const { playlistSongBean } = require('../db/index');

class PlaylistSongDao {
  static insertPlaylistSong(payload, transaction) {
    return playlistSongBean.create(
      {
        id: `playlist-song-${nanoid(16)}`,
        ...payload,
        created_date: new Date(),
      },
      { transaction }
    );
  }

  static findBySongId(songId) {
    return playlistSongBean.findOne({
      where: { songId },
      attributes: ['id'],
    });
  }

  static deleteBySongId(songId, transaction) {
    return playlistSongBean.destroy(
      {
        where: { songId },
      },
      { transaction }
    );
  }
}

module.exports = PlaylistSongDao;
