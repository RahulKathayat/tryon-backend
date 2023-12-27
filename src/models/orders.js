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
      orderDetails: {
        type: DataTypes.JSON
      },
      totalAmount: {
        type: DataTypes.REAL
      },
      couponPercent: {
        type: DataTypes.REAL
      },
      discountAmount: {
        type: DataTypes.REAL
      },
      finalAmount: {
        type: DataTypes.REAL
      },
      couponCode: {
        type: DataTypes.TEXT
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      orderStatus: {
        type: DataTypes.TEXT,
        defaultValue: 'In Process'
      },
      addressId: {
        type: DataTypes.INTEGER,
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
    // Orders.belongsTo(models.Address, {
    //   foreignKey: 'userId',
    //   onDelete: 'SET NULL',
    //   allowNull: true
    // });

    Orders.hasMany(models.Refund, {
      foreignKey: 'orderId'
    });

    Orders.hasMany(models.OrderDetails, {
      foreignKey: 'orderId'
    });

    Orders.hasMany(models.paymentLog, {
      foreignKey: 'orderId'
    });
    Orders.belongsTo(models.Address, {
      foreignKey: 'addressId'
    });
    Orders.hasOne(models.Ratings, {
      foreignKey: 'orderId'
    });
  };

  return Orders;
};
