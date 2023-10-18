module.exports = (sequelize, DataTypes) => {
  const Ratings = sequelize.define(
    'Ratings',
    {
      userId: {
        type: DataTypes.INTEGER
      },
      orderId: {
        type: DataTypes.INTEGER
      },
      productId: {
        type: DataTypes.INTEGER
      },
      review: {
        type: DataTypes.STRING
      },
      ratings: {
        type: DataTypes.INTEGER
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    },
    {
      tableName: 'Ratings',
      freezeTableName: true
    }
  );

  Ratings.associate = function (models) {
    Ratings.belongsTo(models.Users, {
      foreignKey: 'userId'
      //   onDelete: 'SET NULL',
      //   allowNull: true
    });

    Ratings.belongsTo(models.Product, {
      foreignKey: 'productId'
      // onDelete: 'SET NULL',
      // allowNull: true
    });
  };
  return Ratings;
};
