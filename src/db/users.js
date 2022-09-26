module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    'userBean',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        field: 'id',
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        field: 'username',
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        field: 'password',
        allowNull: false,
      },
      fullname: {
        type: DataTypes.STRING,
        field: 'fullname',
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
      tableName: 'users',
      timestamps: false,
    }
  );

  model.attributes = [
    'id',
    'username',
    'password',
    'fullname',
    'created_date',
    'modified_date',
  ];

  return model;
};
