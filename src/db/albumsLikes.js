module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    'albumLikesBean',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        field: 'id',
        allowNull: false,
      },
      userId: {
        type: DataTypes.STRING,
        field: 'user_id',
        allowNull: true,
      },
      albumId: {
        type: DataTypes.STRING,
        field: 'album_id',
        allowNull: true,
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
      tableName: 'albums_likes',
      timestamps: false,
    }
  );

  model.attributes = [
    'id',
    'userId',
    'albumId',
    'created_date',
    'modified_date',
  ];

  return model;
};
