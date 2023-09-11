module.exports = (sequelize, DataTypes) => {
  const SubSubCategory = sequelize.define(
    'SubSubCategory',
    {
      categoryId: {
        type: DataTypes.INTEGER
      },
      subSubCategoryName: {
        type: DataTypes.STRING
      },
      subCategoryId: {
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
      tableName: 'SubSubCategory',
      freezeTableName: true
    }
  );

  SubSubCategory.associate = function (models) {
    SubSubCategory.belongsTo(models.SubCategory, {
      foreignKey: 'subCategoryId',
      onDelete: 'SET NULL',
      allowNull: true
    });

    SubSubCategory.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      onDelete: 'SET NULL',
      allowNull: true
    });

    SubSubCategory.hasMany(models.Product, {
      foreignKey: 'subSubCategoryId'
    });
  };
  return SubSubCategory;
};
