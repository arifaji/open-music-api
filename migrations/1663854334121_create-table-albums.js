/* eslint-disable */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('albums', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    name: {
      type: 'TEXT',
      notNull: true,
    },
    year: {
      type: 'INT',
      notNull: true,
    },
    created_at: {
      type: 'TIMESTAMP',
      notNull: false,
    },
    updated_at: {
      type: 'TIMESTAMP',
      notNull: false,
    },
  });
};

exports.down = pgm => {};
