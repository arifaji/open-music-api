const AlbumController = require('../controller/albumController');

module.exports = [
  {
    method: 'GET',
    path: '/albums/{id}',
    handler: AlbumController.getAlbumById,
  },
];
