module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      categoryName: {
        type: DataTypes.STRING
      },
      popularCategory: {
        type: DataTypes.BOOLEAN
      },
      image: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    },
    {
      tableName: 'Category',
      freezeTableName: true
    }
  );

  Category.associate = function (models) {
    Category.hasOne(models.SubCategory, {
      foreignKey: 'categoryId'
    });
    // Category.hasMany(models.SubSubCategory, {
    //   foreignKey: 'categoryId'
    // });

    Category.hasMany(models.Product, {
      foreignKey: 'categoryId'
    });
  };

  return Category;
};
