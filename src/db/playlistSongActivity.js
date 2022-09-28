module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    'playlistSongActivityBean',
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
      userId: {
        type: DataTypes.STRING,
        field: 'user_id',
        allowNull: false,
      },
      action: {
        type: DataTypes.STRING,
        field: 'action',
        allowNull: false,
      },
      time: {
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
      tableName: 'playlist_song_activities',
      timestamps: false,
    }
  );

  model.associate = ({ userBean, songBean }) => {
    model.belongsToUser = model.belongsTo(userBean, {
      as: 'user',
      foreignKey: 'user_id',
      targetKey: 'id',
    });
    model.belongsToSong = model.belongsTo(songBean, {
      as: 'song',
      foreignKey: 'song_id',
      targetKey: 'id',
    });
  };

  model.attributes = [
    'id',
    'playlistId',
    'songId',
    'userId',
    'action',
    'time',
    'modified_date',
  ];

  return model;
};
