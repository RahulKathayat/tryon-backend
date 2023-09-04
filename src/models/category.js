module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define(
      'Category',
      {
        description:{
            type: DataTypes.STRING
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
  