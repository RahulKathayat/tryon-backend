module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define(
      'Product',
      {
        productName: {
            type: DataTypes.STRING
          },
          productNumber:{
            type: DataTypes.INTEGER
          },
          brandName: {
            type: DataTypes.STRING
          },
          originalPrice: {
            type: DataTypes.INTEGER
          },
          discountedPrice: {
              type: DataTypes.INTEGER
            },
          category:{
            type: DataTypes.STRING
          },
          subCategory:{
              type: DataTypes.STRING
            },
          status: {
            type: DataTypes.BOOLEAN,
            defaultValue:true
          },
      },
      {
        tableName: 'Product',
        freezeTableName: true,
      }
    );
     return Product;
  };
  