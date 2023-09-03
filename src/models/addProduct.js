module.exports = (sequelize, DataTypes) => {
    const AddProduct = sequelize.define(
      'AddProduct',
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
        type: {
          type: DataTypes.STRING
        },
        status: {
          type: DataTypes.BOOLEAN,
          defaultValue:true
        },
      },
      {
        tableName: 'AddProduct',
        freezeTableName: true,
      }
    );
     return AddProduct;
  };
  