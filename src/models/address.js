module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define(
    'Address',
    {
      userId: {
        type: DataTypes.INTEGER
      },
      address: {
        type: DataTypes.JSON
      },
      defaultAddress: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
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
      tableName: 'Address',
      freezeTableName: true
    }
  );
  Address.associate = function (models) {
    Address.belongsTo(models.Users, {
      foreignKey: 'userId',
      targetkey: 'id'
    });
  };

  return Address;
};
