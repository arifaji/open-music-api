const PlaylistController = require('../controller/PlaylistController');

module.exports = [
  {
    method: 'POST',
    path: '/playlists',
    handler: PlaylistController.createPlaylist,
    options: {
      auth: 'openmusic_jwt',
    },
  },
  {
    method: 'GET',
    path: '/playlists',
    handler: PlaylistController.getUserPlaylist,
    options: {
      auth: 'openmusic_jwt',
    },
  },
  {
    method: 'POST',
    path: '/playlists/{id}/songs',
    handler: PlaylistController.addSongToPlaylist,
    options: {
      auth: 'openmusic_jwt',
    },
  },
  {
    method: 'GET',
    path: '/playlists/{id}/songs',
    handler: PlaylistController.getSongsInPlaylist,
    options: {
      auth: 'openmusic_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{id}/songs',
    handler: PlaylistController.deleteSongPlaylist,
    options: {
      auth: 'openmusic_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{id}',
    handler: PlaylistController.deletePlaylist,
    options: {
      auth: 'openmusic_jwt',
    },
  },
  {
    method: 'GET',
    path: '/playlists/{id}/activities',
    handler: PlaylistController.getPlaylistActivity,
    options: {
      auth: 'openmusic_jwt',
    },
  },
  {
    method: 'POST',
    path: '/export/playlists/{id}',
    handler: PlaylistController.exportPlaylist,
    options: {
      auth: 'openmusic_jwt',
    },
  },
];
