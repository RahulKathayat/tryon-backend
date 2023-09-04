module.exports = (sequelize, DataTypes) => {
    const SubCategory = sequelize.define(
      'SubCategory',
      {
        description:{
            type: DataTypes.STRING
        },
        categoryId:{
            type: DataTypes.INTEGER
        },
    
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue:true
        },
      },
      {
        tableName: 'SubCategory',
        freezeTableName: true,
      }
    );
     return SubCategory;
  };
  