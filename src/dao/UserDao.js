const { nanoid } = require('nanoid');
const { userBean } = require('../db/index');

class AlbumDao {
  static insertUser(payload) {
    return userBean.create({
      id: `user-${nanoid(16)}`,
      ...payload,
      created_date: new Date(),
    });
  }

  static findUserByUsername(username) {
    return userBean.findOne({
      where: { username },
    });
  }
}

module.exports = AlbumDao;
