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
      address:{
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
   return User;
};
