const res = require('../util/response');
const logger = require('../util/logger');

class AlbumController {
  static getAlbumById(request, h) {
    try {
      const { id } = request.params;
      const album = {
        id,
        name: '',
        year: '',
      };
      return res.ok({ h, data: { album } });
    } catch (error) {
      logger.debug(error.message);
      return res.internalServerError({ h });
    }
  }
}

module.exports = AlbumController;
