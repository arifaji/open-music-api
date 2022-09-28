const { nanoid } = require('nanoid');
const { collaborationBean } = require('../db/index');

class AlbumDao {
  static insertCollaboration(payload) {
    return collaborationBean.create({
      id: `collaboration-${nanoid(16)}`,
      ...payload,
      created_date: new Date(),
    });
  }

  static findCollaborationByPlaylistId(playlistId) {
    return collaborationBean.findOne({
      where: { playlistId },
      attributes: ['id', 'userId'],
    });
  }

  static findCollaborationByPlaylistAndUser(payload) {
    return collaborationBean.findOne({
      where: { ...payload },
      attributes: ['id', 'userId'],
    });
  }

  static deleteCollaborationByPlaylistAndUser(payload) {
    return collaborationBean.destroy({
      where: { ...payload },
    });
  }
}

module.exports = AlbumDao;
