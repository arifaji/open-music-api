const { nanoid } = require('nanoid');
const _ = require('lodash');
const { albumBean, albumLikesBean } = require('../db/index');
const { path } = require('../util/enums');

class AlbumDao {
  static async getAlbumIncludeSongById(id) {
    const album = await albumBean.findOne({
      where: { id },
      attributes: ['id', 'name', 'year', 'coverImg'],
      include: [
        {
          association: albumBean.hasManySong,
          attributes: ['id', 'title', 'performer'],
        },
      ],
    });
    const result = _.get(album, 'dataValues', album);
    if (result) {
      result.coverUrl = null;
      if (_.get(result, 'coverImg')) {
        result.coverUrl = `http://${process.env.HOST}:${process.env.PORT}${path.ALBUM_COVER_LINKs}/${result.coverImg}`;
      }
      result.coverImg = undefined;
    }
    return result;
  }

  static getAlbumById(id) {
    return albumBean.findOne({
      where: { id },
      attributes: ['id', 'name', 'year'],
    });
  }

  static insertAlbum(payload) {
    const generateAlbumId = `album-${nanoid(16)}`;
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

  static getLikesAlbum(albumId, userId) {
    return albumLikesBean.findOne({
      where: { albumId, userId },
    });
  }

  static likeAlbum(albumId, userId) {
    const generateAlbumLikeId = `album-like-${nanoid(16)}`;
    return albumLikesBean.create({
      id: generateAlbumLikeId,
      albumId,
      userId,
      created_date: new Date(),
    });
  }

  static dislikeAlbum(albumId, userId) {
    return albumLikesBean.destroy({ where: { albumId, userId } });
  }

  static getTotalLikes(albumId) {
    return albumLikesBean.count({ where: { albumId } });
  }
}

module.exports = AlbumDao;
