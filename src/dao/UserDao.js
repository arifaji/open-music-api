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
      attributes: ['id'],
    });
  }

  static findUser(username) {
    return userBean.findOne({
      where: { username },
      attributes: ['id', 'password'],
    });
  }

  static findUserById(id) {
    return userBean.findOne({
      where: { id },
      attributes: ['id'],
    });
  }
}

module.exports = AlbumDao;
