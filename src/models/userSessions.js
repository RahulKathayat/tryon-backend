module.exports = (sequelize, DataTypes) => {
    const UserSession = sequelize.define('UserSession', {
        portalId: {
            type: DataTypes.STRING
          },
          userId: {
            type: DataTypes.STRING
          },
          duration: {
            type: DataTypes.TEXT
          },
          status: {
            type: DataTypes.BOOLEAN
          },
          createdAt: {
            allowNull: false,
            type: DataTypes.DATE
          },
          updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
          }
        },
        {
          tableName: 'UserSession',
          
          freezeTableName: true
        }
      );
    
      return UserSession;
    };