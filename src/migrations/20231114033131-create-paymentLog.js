module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('paymentLog', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      orderId: {
        type: Sequelize.INTEGER
      },
      paymentResponse: {
        type: Sequelize.JSON
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
  down: (queryInterface) => queryInterface.dropTable('paymentLog')
};
