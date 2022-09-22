const { albumBean } = require('../db/index');

class AlbumDao {
  static getAlbumById (id) {
    return albumBean.findOne({
      where: { id },
      attributes: ['id', 'name', 'year'],
    });
  }
}

module.exports = AlbumDao;
