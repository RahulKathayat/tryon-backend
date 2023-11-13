module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define(
    'Orders',
    {
      userId: {
        type: DataTypes.INTEGER
      },
      totalItems: {
        type: DataTypes.INTEGER
      },
      totalQuantity: {
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
    Orders.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'SET NULL',
      allowNull: true
    });

    Orders.hasMany(models.Refund, {
      foreignKey: 'orderId'
    });

    Orders.hasMany(models.OrderDetails, {
      foreignKey: 'orderId'
    });
  };

  return Orders;
};
