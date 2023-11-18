module.exports = (sequelize, DataTypes) => {
  const Fabric = sequelize.define(
    'Fabric',
    {
      fabricType: {
        type: DataTypes.STRING
      },
      weight: {
        type: DataTypes.STRING
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
      quantity: {
        type: DataTypes.INTEGER
      },
      image: {
        type: DataTypes.STRING
      },
      isActive:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
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

  Fabric.associate = function (models) {
    Fabric.hasMany(models.ProductFabric, {
      foreignKey: 'fabricId'
    });
  };
  return Fabric;
};
