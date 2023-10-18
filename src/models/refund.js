module.exports = (sequelize, DataTypes) => {
  const Refund = sequelize.define(
    'Refund',
    {
      userId: {
        type: DataTypes.INTEGER
      },
      orderId: {
        type: DataTypes.INTEGER
      },
      orderDetailId: {
        type: DataTypes.INTEGER
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    },
    {
      tableName: 'Refund',
      freezeTableName: true
    }
  );
  Refund.associate = function (models) {
    Refund.belongsTo(models.Orders, {
      foreignKey: 'orderId'
      //   onDelete: 'SET NULL',
      //   allowNull: true
    });

    Refund.belongsTo(models.Users, {
      foreignKey: 'userId'
      //   onDelete: 'SET NULL',
      //   allowNull: true
    });
  };
  return Refund;
};
