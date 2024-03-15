module.exports = (sequelize, DataTypes) => {
    
  const Admin = sequelize.define('Admin', {
        name: {
          type: DataTypes.STRING
        },
        email: {
          type: DataTypes.STRING
        },
        password: {
          type: DataTypes.STRING
        },
      },
      {
        tableName: 'Admin',
        freezeTableName: true
      }
    );
  
    return Admin;
};