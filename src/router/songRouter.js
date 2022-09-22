const AlbumController = require('../controller/albumController');

module.exports = [
  {
    method: 'GET',
    path: '/song/{id}',
    handler: AlbumController.getAlbumById,
  },
];
