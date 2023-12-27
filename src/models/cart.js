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
        type: DataTypes.REAL
      },
      totalItems: {
        type: DataTypes.INTEGER
      },
      totalQuantity: {
        type: DataTypes.INTEGER
      },
      discountAmount: {
        type: DataTypes.REAL
      },
      finalAmount: {
        type: DataTypes.REAL
      },
      couponPercent: {
        type: DataTypes.REAL
      },
      couponCode: {
        type: DataTypes.TEXT
      },
      addressId: {
        type: DataTypes.INTEGER
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
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

  Cart.associate = function (models) {
    Cart.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'SET NULL',
      allowNull: true
    });
  };
  return Cart;
};
