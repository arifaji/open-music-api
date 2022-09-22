const AlbumController = require('../controller/AlbumController');

module.exports = [
  {
    method: 'GET',
    path: '/albums/{id}',
    handler: AlbumController.getAlbumById,
  },
];
