module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'Users',
    {
      firstName: {
        type: DataTypes.STRING
      },
      lastName: {
        type: DataTypes.STRING
      },
      phoneNumber:{
        type: DataTypes.INTEGER
      },
      email: {
        type: DataTypes.STRING
      },
      emailVerify:{
        type: DataTypes.STRING

      },
      password: {
        type: DataTypes.STRING
      },
      addressId:{
        type: DataTypes.STRING
      },
      dob:{
        type: DataTypes.DATE
      },
      role: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue:true
      },
    },
    {
      tableName: 'Users',
      freezeTableName: true,
      defaultScope: {
        attributes: { exclude: ['password'] }
      },
      scopes: {
        withSecretColumns: {
          attributes: { include: ['password'] }
        }
      }
    }

  );

  User.associate = function (models) {
    User.belongsTo(models.Address, {
      foreignKey: 'addressId',
      onDelete: 'SET NULL',
      allowNull: true
    });

    User.hasOne(models.Cart, {
      foreignKey: 'userId' 
    });

    User.hasMany(models.Orders, {
      foreignKey: 'userId' 
    });

    User.hasMany(models.Ratings, {
      foreignKey: 'userId' 
    });

    User.hasMany(models.Refund, {
      foreignKey: 'userId' 
    });

    User.hasOne(models.WishList, {
      foreignKey: 'userId' 
    });
  };
  
     return User;
};
