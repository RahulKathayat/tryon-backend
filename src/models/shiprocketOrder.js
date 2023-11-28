module.exports = (sequelize, DataTypes) => {
    const shiprocketOrder = sequelize.define(
      'shiprocketOrder',
      {
        userId: {
          type: DataTypes.INTEGER
        },
        orderDetailId: {
          type: DataTypes.INTEGER
        },
        shiprocketResponse: {
          type: DataTypes.JSON
        },
        awbCode:{
            type:DataTypes.STRING
        },
        orderType:{
            type:DataTypes.STRING
        },
        status: {
          type: DataTypes.BOOLEAN,
          defaultValue: true
        }
      },
      {
        tableName: 'shiprocketOrder',
        freezeTableName: true
      }
    );
  
    shiprocketOrder.associate = function (models) {
      shiprocketOrder.belongsTo(models.OrderDetails, {
        foreignKey: 'orderDetailId'
      });
  
    //   SubCategory.hasMany(models.SubSubCategory, {
    //     foreignKey: 'subCategoryId'
    //   });
  
    //   SubCategory.hasMany(models.Product, {
    //     foreignKey: 'subCategoryId'
    //   });
    };
  
    return shiprocketOrder;
  };
  