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
      isActive:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      isFeatured:{
        type: DataTypes.BOOLEAN,
      },
      isFrequent:{
        type: DataTypes.INTEGER,
      }
    },
    {
      tableName: 'Category',
      freezeTableName: true
    }
  );

  Category.associate = function (models) {
    Category.hasMany(models.SubCategory, {
      foreignKey: 'categoryId'
    });

    Category.hasMany(models.Product, {
      foreignKey: 'categoryId'
    });
  };

  return Category;
};
