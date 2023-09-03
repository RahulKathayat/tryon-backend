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
  