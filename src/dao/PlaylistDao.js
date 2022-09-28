const { nanoid } = require('nanoid');
const { Sequelize, playlistBean, playlistSongBean } = require('../db/index');

class PlaylistDao {
  static insertPlaylist(payload) {
    return playlistBean.create({
      id: `playlist-${nanoid(16)}`,
      ...payload,
      created_date: new Date(),
    });
  }

  static findAllPlaylistByUserId(userId) {
    return playlistBean.findAll({
      where: { userId },
      attributes: ['id', 'name', [Sequelize.col('user.username'), 'username']],
      include: [
        {
          association: playlistBean.belongsToUser,
          attributes: [],
        },
      ],
    });
  }

  static getPlaylistById(id) {
    return playlistBean.findOne({
      where: { id },
      attributes: ['id', 'userId'],
    });
  }

  static findAllPlaylistSongsByUserIdAndPlaylistId(userId, playlistId) {
    return playlistBean.findOne({
      where: { userId, id: playlistId },
      attributes: ['id', 'name', [Sequelize.col('user.username'), 'username']],
      include: [
        {
          association: playlistBean.belongsToUser,
          attributes: [],
        },
        {
          association: playlistBean.hasManyPlaylistSong,
          attributes: [
            [Sequelize.literal(`"songs->song"."id"`), 'id'],
            [Sequelize.literal(`"songs->song"."title"`), 'title'],
            [Sequelize.literal(`"songs->song"."performer"`), 'performer'],
          ],
          include: [
            {
              association: playlistSongBean.belongsToSong,
              attributes: [],
            },
          ],
        },
      ],
    });
  }

  static deletePlaylistById(id) {
    return playlistBean.destroy({
      where: { id },
    });
  }
}

module.exports = PlaylistDao;
