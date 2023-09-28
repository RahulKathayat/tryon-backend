module.exports = (sequelize, DataTypes) => {
    const SubscribedUser = sequelize.define(
      'SubscribedUser',
      {
        email: {
            type: DataTypes.STRING
          },
        status: {
          type: DataTypes.BOOLEAN,
          defaultValue:true
        },
      },
      {
        tableName: 'SubscribedUser',
        freezeTableName: true,
      }
    );

     return SubscribedUser;
  };
  