module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define(
    'Orders',
    {
      productId: {
        type: DataTypes.INTEGER
      },
      productDetailId: {
        type: DataTypes.INTEGER
      },
      userId: {
        type: DataTypes.INTEGER
      },
      orderDetailId: {
        type: DataTypes.INTEGER
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    },
    {
      tableName: 'Orders',
      freezeTableName: true
    }
  );

  Orders.associate = function (models) {
    Orders.belongsTo(models.OrderDetails, {
      foreignKey: 'orderDetailId',
      // targetKey: 'id'
      onDelete: 'SET NULL',
      allowNull: true
    });

    Orders.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'SET NULL',
      allowNull: true
    });

    Orders.hasMany(models.Refund, {
      foreignKey: 'orderId'
    });

    Orders.belongsTo(models.Product, {
      foreignKey: 'productId',
      onDelete: 'SET NULL',
      allowNull: true
    });
  };

  return Orders;
};
