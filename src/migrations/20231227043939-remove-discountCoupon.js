module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Cart', 'discountAmount', {
        type: Sequelize.REAL
      }),
      queryInterface.addColumn('Cart', 'totalAmount', {
        type: Sequelize.REAL
      })
    ]);
  },
  down(queryInterface) {
    return Promise.all([
      queryInterface.removeColumn('Cart', 'discountAmount'),
      queryInterface.removeColumn('Cart', 'totalAmount')
    ]);
  }
};
