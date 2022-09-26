/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.addConstraint(
    'songs',
    'fk_songs.song_album.id',
    'FOREIGN KEY("album_id") REFERENCES albums(id) ON DELETE CASCADE'
  );
};

exports.down = (pgm) => {
  pgm.dropConstraint('songs', 'fk_songs.song_album.id');
};
