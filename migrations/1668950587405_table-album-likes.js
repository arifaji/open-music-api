/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('albums_likes', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    album_id: {
      type: 'VARCHAR(50)',
      notNull: false,
    },
    created_date: {
      type: 'TIMESTAMP',
      notNull: false,
    },
    modified_date: {
      type: 'TIMESTAMP',
      notNull: false,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('albums_likes');
};
