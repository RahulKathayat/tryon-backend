module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Orders', 'orderDetails', {
        type: Sequelize.JSON,
        allowNull: true
      }),
      queryInterface.addColumn('Orders', 'totalAmount', {
        type: Sequelize.INTEGER,
        allowNull: true
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Orders', 'orderDetails'),
      queryInterface.removeColumn('Orders', 'totalAmount')
    ]);
  }
};
