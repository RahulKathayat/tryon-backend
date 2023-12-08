module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Product', 'finalAmount', {
        type: Sequelize.DOUBLE,
        allowNull: true
      })
    ]);
  },
  down(queryInterface) {
    return Promise.all([queryInterface.removeColumn('Product', 'finalAmount')]);
  }
};
