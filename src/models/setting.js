module.exports = (sequelize, DataTypes) => {
  const Setting = sequelize.define(
    'Setting',
    {
      name: {
        type: DataTypes.STRING,
        unique: true
      },
      html: {
        type: DataTypes.JSON
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
