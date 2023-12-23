module.exports = (sequelize, DataTypes) => {
  const Setting = sequelize.define(
    'Setting',
    {
      DISCOUNT_BANNER: {
        type: DataTypes.JSON,
        unique: true
      },
      CMS: {
        type: DataTypes.TEXT
      },
      STATUS: {
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
