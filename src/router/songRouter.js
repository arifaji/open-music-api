const SongController = require('../controller/SongController');

module.exports = [
  {
    method: 'POST',
    path: '/songs',
    handler: SongController.insertSong,
  },
  {
    method: 'GET',
    path: '/songs',
    handler: SongController.getSong,
  },
  {
    method: 'GET',
    path: '/songs/{id}',
    handler: SongController.getSongById,
  },
  {
    method: 'PUT',
    path: '/songs/{id}',
    handler: SongController.editSong,
  },
  {
    method: 'DELETE',
    path: '/songs/{id}',
    handler: SongController.deleteSong,
  },
];
