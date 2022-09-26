/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.addConstraint(
    'playlists',
    'fk_playlist.user_id',
    'FOREIGN KEY("user_id") REFERENCES users(id) ON DELETE CASCADE'
  );
};

exports.down = (pgm) => {
  pgm.dropConstraint('playlists', 'fk_playlist.user_id');
};
