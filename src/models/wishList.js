module.exports = (sequelize, DataTypes) => {
    const WishList = sequelize.define(
      'WishList',
      {
        productId:{
            type: DataTypes.INTEGER
          },
        productDetailId:{
            type: DataTypes.INTEGER
          },
        userId:{
            type: DataTypes.INTEGER
          },
        status: {
          type: DataTypes.BOOLEAN,
          defaultValue:true
        },
      },
      {
        tableName: 'WishList',
        freezeTableName: true,
      }
    );
     return WishList;
  };
  