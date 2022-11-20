const Sequelize = require('sequelize');
const logger = require('../util/logger');
const models = [].concat(
  require('./albums'),
  require('./albumsLikes'),
  require('./songs'),
  require('./users'),
  require('./authentications'),
  require('./playlists'),
  require('./playlistSongs'),
  require('./collaborations'),
  require('./playlistSongActivity')
);

const db = {};

const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    dialect: 'postgres',
  }
);

models.forEach((modelBean) => {
  const model = modelBean(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.authenticateDb = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Database connected');
  } catch (error) {
    logger.info('Unable to connect to the database : ', error);
  }
};

module.exports = db;
