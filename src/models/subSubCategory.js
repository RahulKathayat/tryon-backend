module.exports = (sequelize, DataTypes) => {
    const SubSubCategory = sequelize.define(
      'SubSubCategory',
      {
        subSubCategoryName:{
            type: DataTypes.STRING
        },
        subCategoryId:{
            type: DataTypes.INTEGER
        },
    
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue:true
        },
      },
      {
        tableName: 'SubSubCategory',
        freezeTableName: true,
      }
    );
     return SubSubCategory;
  };
  