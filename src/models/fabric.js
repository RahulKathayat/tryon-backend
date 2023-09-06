module.exports = (sequelize, DataTypes) => {
  const Fabric = sequelize.define(
    'Fabric',
    {
      fabricType: {
        type: DataTypes.STRING
      },
      weight: {
        type: DataTypes.INTEGER
      },
      printType: {
        type: DataTypes.STRING
      },
      usage: {
        type: DataTypes.STRING
      },
      properties: {
        type: DataTypes.STRING
      },
      handle: {
        type: DataTypes.STRING
      },
      construction: {
        type: DataTypes.STRING
      },
      transparency: {
        type: DataTypes.STRING
      },
      reflection: {
        type: DataTypes.STRING
      },
      price: {
        type: DataTypes.INTEGER
      },
      maxWidth: {
        type: DataTypes.INTEGER
      },
      gsm: {
        type: DataTypes.INTEGER
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    },
    {
      tableName: 'Fabric',
      freezeTableName: true
    }
  );
  return Fabric;
};
