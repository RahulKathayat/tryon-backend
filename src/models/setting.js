module.exports = (sequelize, DataTypes) => {
  const Setting = sequelize.define(
    'Setting',
    {
      name: {
        type: DataTypes.JSON,
        unique: true
      },
      html: {
        type: DataTypes.TEXT
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    },
    {
      tableName: 'Setting',
      freezeTableName: true
    }
  );

  return Setting;
};
