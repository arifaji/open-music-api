const path = require('path');

exports.validationSchema = Object.freeze({
  INSERT_SONG: 'insertSong',
  INSERT_ALBUM: 'insertAlbum',
  INSERT_USER: 'insertUser',
  LOGIN_USER: 'loginUser',
  REFRESH_TOKEN: 'refreshToken',
  INSERT_PLAYLIST: 'insertPlaylist',
  INSERT_SONG_PLAYLIST: 'insertSongPlaylist',
  COLLABORATION: 'collaboration',
  EXPORT_PLAYLIST: 'exportPlaylist',
  ALBUM_COVER_IMG: 'albumCoverImg',
});

exports.path = Object.freeze({
  ALBUM_COVER: path.resolve('./', 'uploads/file/images/albums'),
  ALBUM_COVER_LINK: `http://${process.env.HOST}:${process.env.PORT}/albums/covers`,
  ALBUM_COVER_LINKs: `/albums/covers`,
});
