module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    'collaborationBean',
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
      tableName: 'collaborations',
      timestamps: false,
    }
  );

  // model.associate = ({ playlistBean }) => {
  //   model.hasOnePlaylist = model.hasOne(playlistBean, {
  //     as: 'playlist',
  //     targetKey: 'playlist_id',
  //   });
  // };

  model.attributes = [
    'id',
    'playlistId',
    'userId',
    'created_date',
    'modified_date',
  ];

  return model;
};
