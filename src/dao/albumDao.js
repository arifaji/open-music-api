const { nanoid } = require('nanoid');
const { albumBean } = require('../db/index');

class AlbumDao {
  static getAlbumIncludeSongById(id) {
    return albumBean.findOne({
      where: { id },
      attributes: ['id', 'name', 'year'],
      include: [
        {
          association: albumBean.hasManySong,
          attributes: ['id', 'title', 'performer'],
        },
      ],
    });
  }

  static getAlbumById(id) {
    return albumBean.findOne({
      where: { id },
      attributes: ['id', 'name', 'year'],
    });
  }

  static insertAlbum(payload) {
    const generateAlbumId = `album-${nanoid()}`;
    return albumBean.create({
      id: generateAlbumId,
      ...payload,
      created_date: new Date(),
    });
  }

  static updateAlbumById(id, payload) {
    return albumBean.update(
      { ...payload, modified_date: new Date() },
      { where: { id } }
    );
  }

  static deleteAlbumById(id) {
    return albumBean.destroy({ where: { id } });
  }
}

module.exports = AlbumDao;
