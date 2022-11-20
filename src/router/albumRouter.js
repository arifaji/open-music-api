const AlbumController = require('../controller/AlbumController');
const { path: defaultPath } = require('../util/enums');

module.exports = [
  {
    method: 'GET',
    path: '/albums/{id}',
    handler: AlbumController.getAlbumById,
  },
  {
    method: 'POST',
    path: '/albums',
    handler: AlbumController.insertAlbum,
  },
  {
    method: 'PUT',
    path: '/albums/{id}',
    handler: AlbumController.editAlbum,
  },
  {
    method: 'DELETE',
    path: '/albums/{id}',
    handler: AlbumController.deleteAlbum,
  },
  {
    method: 'POST',
    path: '/albums/{id}/covers',
    handler: AlbumController.uploadCover,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
        maxBytes: 512000,
      },
    },
  },
  {
    method: 'GET',
    path: '/albums/covers/{param*}',
    handler: {
      directory: {
        path: `${defaultPath.ALBUM_COVER}`,
      },
    },
  },
];
