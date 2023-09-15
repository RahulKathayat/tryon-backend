module.exports = (sequelize, DataTypes) => {
  const OrderDetails = sequelize.define(
    'OrderDetails',
    {
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
      totalQuantity:{
        type:DataTypes.INTEGER

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
    OrderDetails.hasMany(models.Orders, {
      foreignKey: 'orderDetailId'
    });
  };

  return OrderDetails;
};
