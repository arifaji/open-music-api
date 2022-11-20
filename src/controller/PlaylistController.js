const res = require('../util/response');
const PlaylistService = require('../service/PlaylistService');

class PlaylistController {
  static async createPlaylist(request, h) {
    const { payload } = request;
    const { id: credentialId } = request.auth.credentials;
    const playlist = await PlaylistService.insertPlaylist(
      credentialId,
      payload
    );
    return res.created({ h, data: { playlistId: playlist.id } });
  }

  static async getUserPlaylist(request, h) {
    const { id: credentialId } = request.auth.credentials;
    const playlists = await PlaylistService.getAllPlaylistByUser(credentialId);
    return res.ok({ h, data: { playlists } });
  }

  static async addSongToPlaylist(request, h) {
    const { id } = request.params;
    const { payload } = request;
    const { id: credentialId } = request.auth.credentials;
    const message = await PlaylistService.insertSongToPlaylist(
      credentialId,
      id,
      payload
    );
    return res.created({ h, message });
  }

  static async getSongsInPlaylist(request, h) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;
    const playlist = await PlaylistService.getAllPlaylistSongs(
      credentialId,
      id
    );
    return res.ok({ h, data: { playlist } });
  }

  static async deleteSongPlaylist(request, h) {
    const { id } = request.params;
    const { payload } = request;
    const { id: credentialId } = request.auth.credentials;
    const message = await PlaylistService.deleteSongPlaylist(
      credentialId,
      id,
      payload
    );
    return res.ok({ h, message });
  }

  static async deletePlaylist(request, h) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;
    const message = await PlaylistService.deletePlaylist(credentialId, id);
    return res.ok({ h, message });
  }

  static async getPlaylistActivity(request, h) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;
    const activities = await PlaylistService.getPlaylistActivity(
      credentialId,
      id
    );
    return res.ok({ h, data: { ...activities } });
  }

  static async exportPlaylist(request, h) {
    const { id: playlistId } = request.params;
    const { payload } = request;
    const { id: credentialId } = request.auth.credentials;
    const message = await PlaylistService.exportPlaylist(
      credentialId,
      playlistId,
      payload
    );
    return res.created({ h, message });
  }
}

module.exports = PlaylistController;
