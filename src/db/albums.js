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
      created_at: {
        type: DataTypes.DATE,
        field: 'year',
        allowNull: false,
      },
      update_at: {
        type: DataTypes.DATE,
        field: 'year',
        allowNull: false,
      },
    },
    {
      tableName: 'albums',
      timestamps: false,
    }
  );

  model.attributes = ['id', 'name', 'year', 'created_at', 'update_at'];

  return model;
};
