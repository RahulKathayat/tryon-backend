module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      fabricId: {
        type: DataTypes.STRING
      },
      designerName: {
        type: DataTypes.STRING
      },
      productName: {
        type: DataTypes.STRING
      },
      productNumber: {
        type: DataTypes.INTEGER
      },
      brandName: {
        type: DataTypes.STRING
      },
      basePrice: {
        type: DataTypes.BIGINT
      },
      discountPercentage: {
        type: DataTypes.REAL
      },
      categoryId: {
        type: DataTypes.INTEGER
      },
      subCategoryId: {
        type: DataTypes.INTEGER
      },
      subSubCategoryId: {
        type: DataTypes.INTEGER
      },
      image: {
        type: DataTypes.JSON
      },
      featuredImage: {
        type: DataTypes.JSON
      },
      productType: {
        type: DataTypes.INTEGER
      },
      length: {
        type: DataTypes.INTEGER
      },
      totalPrice: {
        type: DataTypes.BIGINT
      },
      currentStock:{
        type: DataTypes.INTEGER
      },
      description: {
        type: DataTypes.STRING
      },
      additionalInformation: {
        type: DataTypes.STRING
      },
      sku: {
        type: DataTypes.STRING
      },
      tags: {
        type: DataTypes.STRING
      },
      fabric: {
        type: DataTypes.STRING
      },
      size: {
        type: DataTypes.JSON
      },
      colour: {
        type: DataTypes.JSON
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    },
    {
      tableName: 'Product',
      freezeTableName: true
    }
  );

  Product.associate = function (models) {
    Product.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      onDelete: 'SET NULL',
      allowNull: true
    });
    Product.belongsTo(models.SubCategory, {
      foreignKey: 'subCategoryId',
      onDelete: 'SET NULL',
      allowNull: true
    });
    Product.belongsTo(models.SubSubCategory, {
      foreignKey: 'subSubcategoryId',
      onDelete: 'SET NULL',
      allowNull: true
    });

    Product.hasMany(models.Ratings, {
      foreignKey: 'productId'
    });

    Product.hasMany(models.WishList, {
      foreignKey: 'productId'
    });

    Product.hasMany(models.Orders, {
      foreignKey: 'productId'
    });

    Product.hasMany(models.ProductFabric, {
      foreignKey: 'productId'
    });
  };
  return Product;
};
