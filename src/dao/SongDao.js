const { nanoid } = require('nanoid');
const { songBean, Sequelize } = require('../db/index');

const { Op } = Sequelize;

class SongDao {
  static insertSong(payload) {
    const generateSongId = `song-${nanoid()}`;
    return songBean.create({
      ...payload,
      id: generateSongId,
      created_date: new Date(),
    });
  }

  static getSong({ title = '', performer = '' }) {
    return songBean.findAll({
      where: {
        title: {
          [Op.iLike]: `%${title}%`,
        },
        performer: {
          [Op.iLike]: `%${performer}%`,
        },
      },
      attributes: ['id', 'title', 'performer'],
    });
  }

  static getSongById(id) {
    return songBean.findOne({
      where: { id },
      attributes: [
        'id',
        'title',
        'year',
        'performer',
        'genre',
        'duration',
        'albumId',
      ],
    });
  }

  static updateSongById(id, payload) {
    return songBean.update(
      { ...payload, modified_date: new Date() },
      { where: { id } }
    );
  }

  static deleteSongById(id) {
    return songBean.destroy({ where: { id } });
  }
}

module.exports = SongDao;
