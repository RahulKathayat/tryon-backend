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
          status: {
            type: DataTypes.BOOLEAN,
            defaultValue:true
          },
      },
      {
        tableName: 'Orders',
        freezeTableName: true,
      }
    );
     return Orders;
  };
  