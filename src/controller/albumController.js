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

  static async insertAlbum(request, h) {
    try {
      const { payload } = request;
      const albumId = await AlbumService.insertAlbum(payload);
      return res.created({ h, data: { albumId: albumId.id } });
    } catch (error) {
      logger.debug(error.message);
      return errorHandler(h, error);
    }
  }

  static async editAlbum(request, h) {
    try {
      const { id } = request.params;
      const { payload } = request;
      const message = await AlbumService.editAlbum(id, payload);
      return res.ok({ h, message });
    } catch (error) {
      logger.debug(error.message);
      return errorHandler(h, error);
    }
  }

  static async deleteAlbum(request, h) {
    try {
      const { id } = request.params;
      const message = await AlbumService.deleteAlbum(id);
      return res.ok({ h, message });
    } catch (error) {
      logger.debug(error.message);
      return errorHandler(h, error);
    }
  }
}

module.exports = AlbumController;
