module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define(
      'Category',
      {
        categoryName:{
            type: DataTypes.STRING
        },
        popularCategory:{
          type: DataTypes.BOOLEAN
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue:true
        },
      },
      {
        tableName: 'Category',
        freezeTableName: true,
      }
    );
     return Category;
  };
  