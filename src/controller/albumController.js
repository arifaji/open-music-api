const res = require('../util/response');
const AlbumService = require('../service/AlbumService');

class AlbumController {
  static async getAlbumById(request, h) {
    const { id } = request.params;
    const album = await AlbumService.getAlbumById(id);
    return res.ok({ h, data: { album } });
  }

  static async insertAlbum(request, h) {
    const { payload } = request;
    const albumId = await AlbumService.insertAlbum(payload);
    return res.created({ h, data: { albumId: albumId.id } });
  }

  static async editAlbum(request, h) {
    const { id } = request.params;
    const { payload } = request;
    const message = await AlbumService.editAlbum(id, payload);
    return res.ok({ h, message });
  }

  static async deleteAlbum(request, h) {
    const { id } = request.params;
    const message = await AlbumService.deleteAlbum(id);
    return res.ok({ h, message });
  }
}

module.exports = AlbumController;
