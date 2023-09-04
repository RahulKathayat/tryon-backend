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
          categoryId:{
            type: DataTypes.INTEGER
          },
          subCategoryId:{
              type: DataTypes.INTEGER
            },
          subSubCategoryId:{
              type: DataTypes.INTEGER
            },
            image:{
              type: DataTypes.STRING
            },
            featuredImage:{
              type: DataTypes.STRING
    
            },
            trendingProduct:{
              type: DataTypes.BOOLEAN
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
  