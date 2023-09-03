module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define(
      'Payment',
      {
        userId: {
            type: DataTypes.INTEGER
          },
        orderDetailId: {
            type: DataTypes.INTEGER
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue:true
        },
      },
      {
        tableName: 'Payment',
        freezeTableName: true,
      }
    );
     return Payment;
  };
  