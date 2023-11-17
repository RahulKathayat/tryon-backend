module.exports = (sequelize, DataTypes) => {
  const OrderDetails = sequelize.define(
    'OrderDetails',
    {
      orderId: {
        type: DataTypes.INTEGER
      },
      productId: {
        type: DataTypes.INTEGER
      },
      type: {
        type: DataTypes.STRING
      },
      amount: {
        type: DataTypes.INTEGER
      },
      trackingId: {
        type: DataTypes.STRING
      },
      trackingLink: {
        type: DataTypes.STRING
      },
      totalQuantity: {
        type: DataTypes.INTEGER
      },
      calculatedAmount:{
        type: DataTypes.INTEGER
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    },
    {
      tableName: 'OrderDetails',
      freezeTableName: true
    }
  );

  OrderDetails.associate = function (models) {
    OrderDetails.belongsTo(models.Orders, {
      foreignKey: 'orderId',
      onDelete: 'SET NULL',
      allowNull: true
    });

    OrderDetails.belongsTo(models.Product, {
      foreignKey: 'productId',
      onDelete: 'SET NULL',
      allowNull: true
    });
  };

  return OrderDetails;
};
