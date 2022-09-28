module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    'playlistBean',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        field: 'id',
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        field: 'name',
        allowNull: false,
      },
      userId: {
        type: DataTypes.STRING,
        field: 'user_id',
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
      tableName: 'playlists',
      timestamps: false,
    }
  );

  model.associate = ({ userBean, playlistSongBean }) => {
    model.belongsToUser = model.belongsTo(userBean, {
      as: 'user',
      foreignKey: 'user_id',
      targetKey: 'id',
    });
    model.hasManyPlaylistSong = model.hasMany(playlistSongBean, {
      as: 'songs',
      foreignKey: 'playlist_id',
      targetKey: 'id',
    });
  };

  model.attributes = [
    'id',
    'name',
    'year',
    'userId',
    'created_date',
    'modified_date',
  ];

  return model;
};
