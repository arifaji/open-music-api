const logger = require('../util/logger');
const res = require('../util/response');
const errorHandler = require('../util/errorHandler');
const AlbumService = require('../service/AlbumService');

class AlbumController {
  static async getAlbumById(request, h) {
    try {
      const { id } = request.params;
      const album = await AlbumService.getAlbumById(id);
      return res.ok({ h, data: { album } });
    } catch (error) {
      logger.debug(error.message);
      return errorHandler(h, error);
    }
  }

  static async postAlbum(request, h) {
    try {
      const payload = request.body;
      const albumId = await AlbumService.insertAlbum(payload);
      return res.ok({ h, data: { albumId } });
    } catch (error) {
      logger.debug(error.message);
      return errorHandler(h, error);
    }
  }
}

module.exports = AlbumController;
