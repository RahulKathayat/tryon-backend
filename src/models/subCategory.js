module.exports = (sequelize, DataTypes) => {
  const SubCategory = sequelize.define(
    'SubCategory',
    {
      subCategoryName: {
        type: DataTypes.STRING
      },
      categoryId: {
        type: DataTypes.INTEGER
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
      tableName: 'SubCategory',
      freezeTableName: true
    }
  );

  SubCategory.associate = function (models) {
    SubCategory.belongsTo(models.Category, {
      foreignKey: 'categoryId'
      // onDelete: 'SET NULL',
      // allowNull: true
    });

    SubCategory.hasMany(models.SubSubCategory, {
      foreignKey: 'subCategoryId'
    });

    SubCategory.hasMany(models.Product, {
      foreignKey: 'subCategoryId'
    });
  };

  return SubCategory;
};
