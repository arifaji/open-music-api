module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    'albumBean',
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
      year: {
        type: DataTypes.INTEGER,
        field: 'year',
        allowNull: false,
      },
      coverImg: {
        type: DataTypes.STRING,
        field: 'cover_img',
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
      tableName: 'albums',
      timestamps: false,
    }
  );

  model.associate = ({ songBean }) => {
    model.hasManySong = model.hasMany(songBean, {
      as: 'songs',
      foreignKey: 'albumId',
      targetKey: 'id',
    });
  };

  model.attributes = [
    'id',
    'name',
    'year',
    'coverImg',
    'created_date',
    'modified_date',
  ];

  return model;
};
