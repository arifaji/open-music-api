const { authenticationBean } = require('../db/index');

class AlbumDao {
  static insertToken(token) {
    return authenticationBean.create({
      token,
    });
  }
}

module.exports = AlbumDao;
