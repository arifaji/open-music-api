/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.addColumn('albums', {
    cover_img: {
      type: 'TEXT',
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumn('albums', 'cover_img');
};
