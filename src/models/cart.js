module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define(
      'Cart',
      {
        userId: {
          type: DataTypes.INTEGER
        },
        cartDetail: {
          type: DataTypes.JSON
        },
        totalAmount: {
          type: DataTypes.INTEGER
        },
        totalItems: {
          type: DataTypes.INTEGER
        },
        totalQuantity: {
          type: DataTypes.INTEGER
        },
        discountCode: {
          type: DataTypes.STRING
        },
        status: {
          type: DataTypes.BOOLEAN,
          defaultValue: true
        }
      },
      {
        tableName: 'Cart',
        freezeTableName: true
      }
    );
    return Cart;
  };
  