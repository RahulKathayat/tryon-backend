module.exports = (sequelize, DataTypes) => {
    const OrderDetails = sequelize.define(
      'OrderDetails',
      {
        orderId: {
            type: DataTypes.INTEGER
          },
          type:{
              type:DataTypes.STRING
          },
          amount:{
              type:DataTypes.INTEGER
          },
          status: {
            type: DataTypes.BOOLEAN,
            defaultValue:true
          },
      },
      {
        tableName: 'OrderDetails',
        freezeTableName: true,
      }
    );
     return OrderDetails;
  };
  