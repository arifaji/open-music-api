const AlbumController = require('../controller/AlbumController');

module.exports = [
  {
    method: 'GET',
    path: '/song/{id}',
    handler: AlbumController.getAlbumById,
  },
];
