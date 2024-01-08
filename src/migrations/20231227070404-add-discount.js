module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Orders', 'finalAmount', {
        type: Sequelize.REAL
      }),
      queryInterface.addColumn('Orders', 'couponPercent', {
        type: Sequelize.REAL
      })
    ]);
  },
  down(queryInterface) {
    return Promise.all([
      queryInterface.removeColumn('Orders', 'finalAmount'),
      queryInterface.removeColumn('Orders', 'couponPercent')
    ]);
  }
};
