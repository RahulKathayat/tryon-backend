module.exports = (sequelize, DataTypes) => {
    const Address = sequelize.define(
      'Address',
      {
        address:{
            type: DataTypes.STRING
        },
        defaultAddress:{
            type: DataTypes.BOOLEAN,
            defaultValue:true
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue:true
        },
      },
      {
        tableName: 'Address',
        freezeTableName: true,
      }
        );
      Address.associate = function(models) {
      Address.hasMany(models.Users, {
        foreignKey: 'addressId' 
      });
    };

     return Address;
  };
  