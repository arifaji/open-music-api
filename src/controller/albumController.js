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

  static async uploadCover(request, h) {
    const { id } = request.params;
    const { cover: data } = request.payload;
    const message = await AlbumService.uploadCover(id, data);
    return res.created({ h, message });
  }

  static async likeOrDislikeAlbum(request, h) {
    const { id: credentialId } = request.auth.credentials;
    const { id: albumId } = request.params;
    const message = await AlbumService.likeOrDislikeAlbum(
      albumId,
      credentialId
    );
    return res.created({ h, message });
  }

  static async totalLikesAlbum(request, h) {
    const { id: albumId } = request.params;
    try {
      const likes = await AlbumService.totalLikesAlbumCache(albumId);
      const response = res.ok({ h, data: { likes } });
      response.header('X-Data-Source', 'cache');
      return response;
    } catch (error) {
      const likes = await AlbumService.totalLikesAlbum(albumId);
      return res.ok({ h, data: { likes } });
    }
  }
}

module.exports = AlbumController;
