module.exports = {
    up: (queryInterface, Sequelize) =>
      queryInterface.createTable('Refund', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        userId: {
          type: Sequelize.INTEGER
        },
        orderId: {
            type: Sequelize.INTEGER
        },
        orderDetailId: {
            type: Sequelize.INTEGER
        },
        status: {
          type: Sequelize.BOOLEAN
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }),
    down: (queryInterface) => queryInterface.dropTable('Refund')
  };
  