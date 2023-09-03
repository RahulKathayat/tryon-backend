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
            },
        },
        {
            tableName: 'Refund',
            freezeTableName: true,
        }
    );
    return Refund;
};
