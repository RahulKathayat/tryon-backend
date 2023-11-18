module.exports = (sequelize, DataTypes) => {
    const paymentLog = sequelize.define(
      'paymentLog',
      {
        userId: {
            type: DataTypes.INTEGER,
          },
          orderId: {
            type: DataTypes.INTEGER
          },
          paymentResponse: {
            type: DataTypes.JSON
          },
          isActive:{
            type: DataTypes.BOOLEAN,
            defaultValue: true
          },
          status: {
          type: DataTypes.BOOLEAN,
          defaultValue: true
        }
      },
      {
        tableName: 'paymentLog',
        freezeTableName: true
      }
    );
  
    paymentLog.associate = function (models) {
        paymentLog.belongsTo(models.Users, {
        foreignKey: 'userId',
        onDelete: 'SET NULL',
        allowNull: true
      });
      paymentLog.belongsTo(models.Orders, {
        foreignKey: 'orderId',
        onDelete: 'SET NULL',
        allowNull: true
      });
       
    };
    return paymentLog;
  };
  