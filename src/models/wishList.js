module.exports = (sequelize, DataTypes) => {
  const WishList = sequelize.define(
    'WishList',
    {
      productId: {
        type: DataTypes.INTEGER
      },
      userId: {
        type: DataTypes.INTEGER
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      isWishlisted: {
<<<<<<< HEAD
        type: DataTypes.BOOLEAN,
        defaultValue: false
=======
        type: DataTypes.VIRTUAL(DataTypes.BOOLEAN),
        defaultValue: true
>>>>>>> 85adc015d4b9977b319af59204b2106e1446a0a0
      }
    },
    {
      tableName: 'WishList',
      freezeTableName: true
    }
  );

  WishList.associate = function (models) {
    WishList.belongsTo(models.Product, {
      foreignKey: 'productId',
      onDelete: 'SET NULL',
      allowNull: true
    });

    WishList.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'SET NULL',
      allowNull: true
    });
  };
  return WishList;
};
