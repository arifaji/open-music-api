const { v4: uuid } = require('uuid');
const { albumBean } = require('../db/index');

class AlbumDao {
  static getAlbumById(id) {
    return albumBean.findOne({
      where: { id },
      attributes: ['id', 'name', 'year'],
    });
  }

  static insertAlbum(name, year) {
    const generateAlbumId = `album-${uuid}`;
    return albumBean.create({
      id: generateAlbumId,
      name,
      year,
      created_at: new Date(),
    });
  }
}

module.exports = AlbumDao;
