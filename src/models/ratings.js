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
              review:{
                  type:DataTypes.STRING
              },
              ratings:{
                  type:DataTypes.INTEGER
              },
            status: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },
        },
        {
            tableName: 'Ratings',
            freezeTableName: true,
        }
    );
    return Ratings;
};
