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
    /* isWishlisted: {
      type: DataTypes.VIRTUAL(DataTypes.BOOLEAN),
        defaultValue: true

    },*/
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
