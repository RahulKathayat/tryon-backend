module.exports = (sequelize, DataTypes) => {
    const ProductDetails = sequelize.define(
      'ProductDetails',
      {
        productId:{
            type: DataTypes.INTEGER
          },
        description: {
          type: DataTypes.STRING
        },
        additionalInformation: {
          type: DataTypes.STRING
        },
        sku:{
          type:DataTypes.STRING
        },
        tags:{
          type:DataTypes.STRING
        },
        fabric:{
          type: DataTypes.STRING

        },
        size: {
          type: DataTypes.STRING
        },
        colour: {
            type: DataTypes.STRING
        },
        status: {
          type: DataTypes.BOOLEAN,
          defaultValue:true
        },
      },
      {
        tableName: 'ProductDetails',
        freezeTableName: true,
      }
    );
     return ProductDetails;
  };
  