module.exports = (sequelize, DataTypes) => {
    const ProductFabric = sequelize.define(
      'ProductFabric',
      {
        fabricId: {
            type: DataTypes.INTEGER
          },
          productId: {
              type: DataTypes.INTEGER
          },
          defaultFabric: {
              type: DataTypes.BOOLEAN
          },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue:true
        },
      },
      {
        tableName: 'ProductFabric',
        freezeTableName: true,
      }
    );

    ProductFabric.associate = function (models) {
      ProductFabric.belongsTo(models.Fabric, {
        foreignKey: 'fabricId',
        onDelete: 'SET NULL',
        allowNull: true
      });

      ProductFabric.belongsTo(models.Product, {
        foreignKey: 'productId',
        onDelete: 'SET NULL',
        allowNull: true
      });

    }

     return ProductFabric;
  };
  