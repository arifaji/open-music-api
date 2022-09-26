module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    'songBean',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        field: 'id',
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        field: 'title',
        allowNull: false,
      },
      year: {
        type: DataTypes.INTEGER,
        field: 'year',
        allowNull: false,
      },
      genre: {
        type: DataTypes.STRING,
        field: 'genre',
        allowNull: false,
      },
      performer: {
        type: DataTypes.STRING,
        field: 'performer',
        allowNull: false,
      },
      duration: {
        type: DataTypes.INTEGER,
        field: 'duration',
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
      tableName: 'songs',
      timestamps: false,
    }
  );

  model.attributes = [
    'id',
    'title',
    'year',
    'genre',
    'performer',
    'duration',
    'albumId',
    'created_date',
    'modified_date',
  ];

  return model;
};
