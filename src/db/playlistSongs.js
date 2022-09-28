module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    'playlistSongBean',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        field: 'id',
        allowNull: false,
      },
      playlistId: {
        type: DataTypes.STRING,
        field: 'playlist_id',
        allowNull: false,
      },
      songId: {
        type: DataTypes.STRING,
        field: 'song_id',
        allowNull: false,
      },
      created_date: {
        type: DataTypes.DATE,
        field: 'created_date',
        allowNull: false,
      },
      modified_date: {
        type: DataTypes.DATE,
        field: 'modified_date',
        allowNull: true,
      },
    },
    {
      tableName: 'playlist_songs',
      timestamps: false,
    }
  );

  model.associate = ({ songBean }) => {
    model.belongsToSong = model.belongsTo(songBean, {
      as: 'song',
      foreignKey: 'song_id',
      targetKey: 'id',
    });
  };

  model.attributes = ['id', 'name', 'year', 'created_date', 'modified_date'];

  return model;
};
