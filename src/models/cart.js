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
      addressId: {
        type: DataTypes.INTEGER
      },
      isActive:{
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
