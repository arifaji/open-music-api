const { nanoid } = require('nanoid');
const { Sequelize, playlistSongActivityBean } = require('../db/index');

class PlaylistSongActivityDao {
  static insertActivity(payload, transaction) {
    return playlistSongActivityBean.create(
      {
        id: `activity-${nanoid(16)}`,
        ...payload,
        time: new Date(),
      },
      { transaction }
    );
  }

  static getAllActivityByPlaylistId(playlistId) {
    return playlistSongActivityBean.findAll({
      where: { playlistId },
      attributes: [
        [Sequelize.col('user.username'), 'username'],
        [Sequelize.col('song.title'), 'title'],
        'action',
        'time',
      ],
      include: [
        {
          association: playlistSongActivityBean.belongsToUser,
          attributes: [],
        },
        {
          association: playlistSongActivityBean.belongsToSong,
          attributes: [],
        },
      ],
    });
  }
}

module.exports = PlaylistSongActivityDao;
