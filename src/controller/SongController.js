const _ = require('lodash');
const logger = require('../util/logger');
const res = require('../util/response');
const errorHandler = require('../util/errorHandler');
const SongService = require('../service/SongService');

class SongController {
  static async insertSong(request, h) {
    try {
      const { payload } = request;
      const song = await SongService.insertSong(payload);
      return res.created({ h, data: { songId: song.id } });
    } catch (error) {
      logger.debug(error.message);
      return errorHandler(h, error);
    }
  }

  static async getSong(request, h) {
    try {
      const title = _.get(request, 'query.title', '');
      const performer = _.get(request, 'query.performer', '');
      console.log(title, performer);
      const songs = await SongService.getSong({ title, performer });
      return res.ok({ h, data: { songs } });
    } catch (error) {
      logger.debug(error.message);
      return errorHandler(h, error);
    }
  }

  static async getSongById(request, h) {
    try {
      const { id } = request.params;
      const song = await SongService.getSongById(id);
      return res.ok({ h, data: { song } });
    } catch (error) {
      logger.debug(error.message);
      return errorHandler(h, error);
    }
  }

  static async editSong(request, h) {
    try {
      const { id } = request.params;
      const { payload } = request;
      const message = await SongService.editSong(id, payload);
      return res.ok({ h, message });
    } catch (error) {
      logger.debug(error.message);
      return errorHandler(h, error);
    }
  }

  static async deleteSong(request, h) {
    try {
      const { id } = request.params;
      const message = await SongService.deleteSong(id);
      return res.ok({ h, message });
    } catch (error) {
      logger.debug(error.message);
      return errorHandler(h, error);
    }
  }
}

module.exports = SongController;
