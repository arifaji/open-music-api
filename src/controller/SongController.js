const _ = require('lodash');
const res = require('../util/response');
const SongService = require('../service/SongService');

class SongController {
  static async insertSong(request, h) {
    const { payload } = request;
    const song = await SongService.insertSong(payload);
    return res.created({ h, data: { songId: song.id } });
  }

  static async getSong(request, h) {
    const title = _.get(request, 'query.title', '');
    const performer = _.get(request, 'query.performer', '');
    const songs = await SongService.getSong({ title, performer });
    return res.ok({ h, data: { songs } });
  }

  static async getSongById(request, h) {
    const { id } = request.params;
    const song = await SongService.getSongById(id);
    return res.ok({ h, data: { song } });
  }

  static async editSong(request, h) {
    const { id } = request.params;
    const { payload } = request;
    const message = await SongService.editSong(id, payload);
    return res.ok({ h, message });
  }

  static async deleteSong(request, h) {
    const { id } = request.params;
    const message = await SongService.deleteSong(id);
    return res.ok({ h, message });
  }
}

module.exports = SongController;
